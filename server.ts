import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse requests
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", gateway: "FedaPay & PayPal" });
  });

  // 1. Create Checkout Session with FedaPay
  app.post("/api/fedapay/checkout", async (req, res) => {
    try {
      const { amount, planName, email, firstname, lastname, phone } = req.body;

      if (!amount || !planName || !email) {
        return res.status(400).json({ 
          success: false, 
          error: "Paramètres requis manquants : amount, planName ou email." 
        });
      }

      const apiKey = process.env.FEDAPAY_SECRET_KEY;
      const env = process.env.FEDAPAY_ENVIRONMENT || "sandbox";
      const baseUrl = env === "live" ? "https://api.fedapay.com" : "https://sandbox-api.fedapay.com";

      if (!apiKey) {
        console.warn("[FedaPay] FEDAPAY_SECRET_KEY is missing. Falling back to mock transaction URL.");
        // If developer API key is missing, return a simulated checkout URL that the UI can use to test
        const mockCheckoutUrl = `${req.headers.origin || "http://localhost:3000"}/#payment-simulation?plan=${encodeURIComponent(planName)}&amount=${amount}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone || "")}`;
        return res.json({
          success: true,
          checkoutUrl: mockCheckoutUrl,
          id: `mock-tx-${Date.now()}`,
          isSimulated: true,
          message: "Mode simulation actif : FEDAPAY_SECRET_KEY manquante."
        });
      }

      // Prepare payload following the official FedaPay API structure
      const transactionPayload = {
        amount: Math.round(amount), // FedaPay expects integer amount
        currency: {
          iso: "XOF" // African CFA Franc
        },
        description: `SocialBoost - Abonnement ${planName}`,
        callback_url: req.headers.referer || `${req.headers.origin || "http://localhost:3000"}/`,
        customer: {
          firstname: firstname || "Créateur",
          lastname: lastname || "SocialBoost",
          email: email,
          phone_number: phone ? {
            number: phone.replace(/[^0-9]/g, ""),
            country: "BJ" // Default Benin standard fallback
          } : undefined
        }
      };

      console.log("[FedaPay API] Initiating transaction with payload:", transactionPayload);

      // Create transaction in FedaPay
      const createTxResponse = await fetch(`${baseUrl}/v1/transactions`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(transactionPayload)
      });

      if (!createTxResponse.ok) {
        const errText = await createTxResponse.text();
        console.error("[FedaPay State] Resource creation error description:", errText);
        throw new Error(`FedaPay transaction creation returned HTTP ${createTxResponse.status}: ${errText}`);
      }

      const txResult = await createTxResponse.json();
      console.log("[FedaPay State] Transaction response output:", txResult);

      const transaction = txResult.transaction || txResult["v1/transaction"] || txResult;
      const txId = transaction.id;

      if (!txId) {
        throw new Error("No transaction ID returned from FedaPay transaction endpoint.");
      }

      // Generate checkout token for user redirections
      console.log(`[FedaPay Token] Requesting web token redirect on transaction ${txId}...`);
      const createTokenResponse = await fetch(`${baseUrl}/v1/transactions/${txId}/token`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({})
      });

      if (!createTokenResponse.ok) {
        const errText = await createTokenResponse.text();
        console.error("[FedaPay Token] Generation fail:", errText);
        throw new Error(`FedaPay token creation returned HTTP ${createTokenResponse.status}: ${errText}`);
      }

      const tokenResult = await createTokenResponse.json();
      const tokenObj = tokenResult.token || tokenResult["v1/token"] || tokenResult;
      const checkoutUrl = tokenObj.url;

      if (!checkoutUrl) {
        throw new Error("No checkout redirect URL found in FedaPay response token.");
      }

      return res.json({
        success: true,
        checkoutUrl,
        id: txId,
        isSimulated: false,
        message: "FedaPay Redirection URL generated successfully."
      });

    } catch (error: any) {
      console.error("[FedaPay Checkout Handler Error]:", error);
      return res.status(500).json({
        success: false,
        error: error.message || "Impossible de traiter le paiement avec FedaPay pour le moment."
      });
    }
  });

  // 2. Query specific transaction status from FedaPay server
  app.get("/api/fedapay/status/:id", async (req, res) => {
    try {
      const txId = req.params.id;
      
      // If it's a simulated transaction ID
      if (txId.startsWith("mock-tx-")) {
        return res.json({
          success: true,
          status: "approved",
          isSimulated: true
        });
      }

      const apiKey = process.env.FEDAPAY_SECRET_KEY;
      const env = process.env.FEDAPAY_ENVIRONMENT || "sandbox";
      const baseUrl = env === "live" ? "https://api.fedapay.com" : "https://sandbox-api.fedapay.com";

      if (!apiKey) {
        return res.json({
          success: true,
          status: "approved",
          isSimulated: true,
          message: "FedaPay simulation status."
        });
      }

      const response = await fetch(`${baseUrl}/v1/transactions/${txId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`FedaPay status request returned HTTP ${response.status}`);
      }

      const result = await response.json();
      const transaction = result.transaction || result["v1/transaction"] || result;

      return res.json({
        success: true,
        status: transaction.status, // approved, declined, pending, canceled
        amount: transaction.amount,
        raw: transaction
      });

    } catch (error: any) {
      console.error("[FedaPay Status Fetch Error]:", error);
      return res.status(500).json({
        success: false,
        error: error.message || "Failed to query transaction status"
      });
    }
  });

  // Vite development vs production handling
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("[Server] Vite middleware mounted in development mode.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve index.html as a single-page app fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("[Server] Static build server mounted in production mode.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Express Server] SocialBoost running on http://localhost:${PORT}`);
  });
}

startServer();
