import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Trash2, HelpCircle } from 'lucide-react';

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'default';
}

export default function AlertDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  type = 'default'
}: AlertDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur & overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px] dark:bg-black/75"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden z-10"
          >
            {/* Header / Accent Bar */}
            <div className={`h-1.5 w-full ${
              type === 'danger' 
                ? 'bg-rose-500' 
                : type === 'warning' 
                  ? 'bg-amber-500' 
                  : 'bg-blue-600'
            }`} />

            <div className="p-6 space-y-4">
              <div className="flex gap-4 items-start">
                <div className={`p-3 rounded-xl shrink-0 ${
                  type === 'danger'
                    ? 'bg-rose-50 dark:bg-rose-950/20 text-rose-600'
                    : type === 'warning'
                      ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-600'
                      : 'bg-blue-50 dark:bg-blue-950/20 text-blue-600'
                }`}>
                  {type === 'danger' ? (
                    <Trash2 className="w-5 h-5" />
                  ) : type === 'warning' ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : (
                    <HelpCircle className="w-5 h-5" />
                  )}
                </div>

                <div className="space-y-1.5">
                  <h3 id="alert-title" className="text-sm font-black text-slate-900 dark:text-zinc-100 font-sans tracking-tight">
                    {title}
                  </h3>
                  <p id="alert-desc" className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed font-medium">
                    {description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-50 dark:border-zinc-850">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-zinc-950 dark:hover:bg-zinc-850 text-slate-600 dark:text-zinc-300 border border-slate-200/80 dark:border-zinc-800 text-[11px] font-bold rounded-xl transition-colors cursor-pointer"
                >
                  {cancelText}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`px-4 py-2 text-white text-[11px] font-bold rounded-xl shadow-md transition-colors cursor-pointer ${
                    type === 'danger'
                      ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-500/10'
                      : type === 'warning'
                        ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-500/10'
                        : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/10'
                  }`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
