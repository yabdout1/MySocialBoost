import React, { useState, useRef } from 'react';
import { 
  Folder, 
  Upload, 
  FileText, 
  Download, 
  Trash2, 
  Plus, 
  Link as LinkIcon, 
  Sparkles,
  Check,
  Search,
  Database
} from 'lucide-react';
import { RewardFile, RewardType } from '../types';
import { useLanguage } from '../context/LanguageContext';
import AlertDialog from './AlertDialog';

interface RewardLibraryProps {
  files: RewardFile[];
  onAddFile: (file: RewardFile) => void;
  onDeleteFile: (id: string) => void;
  addNotification: (title: string, message: string, type: 'success' | 'info' | 'warning') => void;
}

export default function RewardLibrary({ 
  files, 
  onAddFile, 
  onDeleteFile,
  addNotification 
 }: RewardLibraryProps) {
  const { language } = useLanguage();
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<RewardFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [newFileType, setNewFileType] = useState<RewardType>('pdf');
  const [newFileSize, setNewFileSize] = useState('4.2 MB');
  const [newFileUrl, setNewFileUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleSimulatedUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName || !newFileUrl) {
      alert('Veuillez remplir le nom et l’URL du fichier.');
      return;
    }

    setIsUploading(true);

    setTimeout(() => {
      const addedFile: RewardFile = {
        id: `rew-${Date.now()}`,
        name: newFileName.endsWith('.pdf') || newFileName.endsWith('.zip') ? newFileName : `${newFileName}.pdf`,
        type: newFileType,
        size: newFileSize,
        downloadCount: 0,
        url: newFileUrl,
        createdAt: new Date().toISOString().split('T')[0]
      };

      onAddFile(addedFile);
      setIsUploading(false);
      setNewFileName('');
      setNewFileUrl('');
      addNotification('Fichier Ajouté !', `"${addedFile.name}" est désormais hébergé et sécurisé dans votre bibliothèque SocialBoost.`, 'success');
    }, 1200);
  };

  const handleFileDropOrSelect = (file: File) => {
    setIsUploading(true);
    setTimeout(() => {
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
      const ext = file.name.split('.').pop()?.toLowerCase();
      let detectedType: RewardType = 'pdf';
      if (ext === 'zip' || ext === 'rar' || ext === 'tar') detectedType = 'software';
      else if (ext === 'mp4' || ext === 'mov' || ext === 'avi') detectedType = 'video';
      else if (ext === 'json' || ext === 'txt') detectedType = 'prompt';

      const addedFile: RewardFile = {
        id: `rew-${Date.now()}`,
        name: file.name,
        type: detectedType,
        size: `${sizeInMB} MB`,
        downloadCount: 0,
        url: URL.createObjectURL(file), // Generate an actual local secure URL
        createdAt: new Date().toISOString().split('T')[0]
      };

      onAddFile(addedFile);
      setIsUploading(false);
      addNotification('Fichier Chargé ✅', `Le document "${addedFile.name}" (${addedFile.size}) a été traité avec succès !`, 'success');
    }, 1000);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileDropOrSelect(e.dataTransfer.files[0]);
    }
  };

  const onInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileDropOrSelect(e.target.files[0]);
    }
  };

  const filteredFiles = files.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (file: RewardFile) => {
    setFileToDelete(file);
    setIsDeleteAlertOpen(true);
  };

  const handleConfirmDelete = () => {
    if (fileToDelete) {
      onDeleteFile(fileToDelete.id);
      setIsDeleteAlertOpen(false);
      setFileToDelete(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in text-gray-900 dark:text-zinc-150">
      
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold flex items-center gap-2">
            <Folder className="w-5.5 h-5.5 text-blue-600" />
            Bibliothèque de Récompenses ({files.length} fichiers)
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Téléversez de l'expertise solide (Ebooks, Codes, Gabarits) hébergée dans votre espace cloud crypté.
          </p>
        </div>
        <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-505 bg-indigo-50 px-3 py-1 rounded dark:bg-indigo-950/40">
          Quota utilisé : 45.2 MB / 10 GB
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left pane: File add creator form */}
        <div className="lg:col-span-4 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm p-6 space-y-6">
          <div>
            <span className="text-[10px] font-bold font-mono tracking-widest text-blue-500 uppercase">HÉBERGEMENT DE RESSOURES</span>
            <h3 className="text-sm font-bold mt-0.5">Enregistrer un nouveau cadeau</h3>
          </div>

          <form onSubmit={handleSimulatedUpload} className="space-y-4 text-xs">
            
            <div className="space-y-1">
              <label className="font-bold text-gray-700 dark:text-zinc-300">Nom du fichier cible *</label>
              <input
                type="text"
                required
                placeholder="Ex: ebook_instagram_v2.pdf"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border bg-slate-50 border-slate-200 dark:bg-zinc-950 dark:border-zinc-850 text-slate-800 dark:text-zinc-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-zinc-300">Format de cadeau</label>
                <select
                  value={newFileType}
                  onChange={(e) => setNewFileType(e.target.value as RewardType)}
                  className="w-full px-2.5 py-2 rounded-lg border bg-slate-50 border-slate-200 dark:bg-zinc-950 dark:text-zinc-300"
                >
                  <option value="pdf">Ebook PDF</option>
                  <option value="template">Canva Template</option>
                  <option value="software">Code ZIP</option>
                  <option value="prompt">Kit de Prompts</option>
                  <option value="video">Tutoriel MP4</option>
                  <option value="discount">Bon de réduction</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-zinc-300">Taille estimée</label>
                <input
                  type="text"
                  placeholder="Ex: 5.8 MB ou 142 KB"
                  value={newFileSize}
                  onChange={(e) => setNewFileSize(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-lg border bg-slate-50 border-slate-200 dark:bg-zinc-950"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 dark:text-zinc-300">URL Secrète de Téléchargement *</label>
              <input
                type="url"
                required
                placeholder="Ex: https://notion.so/my_private_ebook"
                value={newFileUrl}
                onChange={(e) => setNewFileUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border bg-slate-50 border-slate-200 dark:bg-zinc-950 dark:border-zinc-850 font-mono"
              />
              <p className="text-[9px] text-gray-400">Le destinataire n'aura accès à ce lien qu'après validation de sa preuve sociale.</p>
            </div>

            <button
              id="library-btn-add"
              type="submit"
              disabled={isUploading}
              className="w-full py-2.5 bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-lg font-bold hover:bg-slate-800 dark:hover:bg-zinc-200 flex items-center justify-center gap-1 cursor-pointer transition-all"
            >
              {isUploading ? (
                <>Téléversement en cours...</>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Enregistrer le cadeau
                </>
              )}
            </button>

          </form>

          {/* Drag & Drop zone */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            onDragOver={onDragOver}
            onDrop={onDrop}
            className="border-2 border-dashed border-slate-150 hover:border-blue-500 rounded-xl p-5 text-center cursor-pointer space-y-2 bg-slate-50/50 hover:bg-blue-50/10 transition-all dark:bg-zinc-950/20 dark:border-zinc-850 dark:hover:border-blue-900/40"
            title="Glissez-déposez ou cliquez pour téléverser votre fichier"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={onInputFileChange} 
            />
            <Upload className="w-6 h-6 text-gray-400 mx-auto" strokeWidth={1.5} />
            <p className="text-[10px] font-bold text-gray-750 dark:text-zinc-300">Zone de Dépose de Fichiers</p>
            <p className="text-[9px] text-gray-400">Glissez-déposez un PDF / ZIP ici ou cliquez pour parcourir.</p>
            <p className="text-[9px] text-blue-600 underline font-semibold">Téléverser mon fichier ↗</p>
          </div>
        </div>

        {/* Right pane: list files uploaded */}
        <div className="lg:col-span-8 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm p-6 space-y-4">
          
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-zinc-950 p-2.5 rounded-xl border border-slate-100 dark:border-zinc-850">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher parmi vos fichiers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs bg-transparent border-0 outline-none text-slate-800 dark:text-zinc-100 focus:ring-0"
            />
          </div>

          <div className="space-y-3">
            {filteredFiles.length === 0 ? (
              <div className="py-20 text-center text-slate-400 text-xs">
                Aucun document n'a été téléversé avec cette nomenclature.
              </div>
            ) : (
              filteredFiles.map((file) => (
                <div key={file.id} className="p-4 border rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-slate-100 dark:border-zinc-850 hover:border-slate-200 dark:hover:border-zinc-800 bg-slate-50/20 dark:bg-zinc-950/20 text-xs text-slate-800 dark:text-zinc-200">
                  <div className="flex gap-3">
                    <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-zinc-950 shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-zinc-100 line-clamp-1">{file.name}</h4>
                      <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-400 mt-1 font-mono">
                        <span>Format: {file.type.toUpperCase()}</span>
                        <span>• Size: {file.size}</span>
                        <span>• Date: {file.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-zinc-850">
                    <div className="text-left sm:text-right">
                      <p className="font-bold font-mono">{file.downloadCount}</p>
                      <p className="text-[9px] text-gray-400">Téléchargements</p>
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => alert(`Lien crypté de distribution publique : \n${file.url}\n\nCe lien secret est transmis aux abonnés en toute sécurité par notre IA d'analyse.`)}
                        className="p-1.5 bg-slate-50 text-slate-600 rounded border border-slate-150 inline-flex items-center hover:bg-slate-100 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"
                        title="Voir l'URL source"
                      >
                        <LinkIcon className="w-3.5 h-3.5" />
                      </button>
                      
                      <button
                        onClick={() => handleDeleteClick(file)}
                        className="p-1.5 hover:bg-rose-50 text-rose-500 rounded border border-transparent hover:border-rose-100 dark:hover:bg-rose-950/20 cursor-pointer"
                        title="Archiver"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      <AlertDialog
        isOpen={isDeleteAlertOpen}
        onClose={() => {
          setIsDeleteAlertOpen(false);
          setFileToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title={
          language === 'fr' 
            ? 'Supprimer le fichier ?' 
            : language === 'es' 
              ? '¿Eliminar archivo de recompensa?' 
              : 'Delete reward file?'
        }
        description={
          language === 'fr'
            ? `Êtes-vous sûr de vouloir supprimer définitivement "${fileToDelete?.name || ''}" de votre bibliothèque de récompenses ?`
            : language === 'es'
              ? `¿Está seguro de que desea eliminar permanentemente "${fileToDelete?.name || ''}" de su biblioteca de recompensas?`
              : `Are you sure you want to permanently delete "${fileToDelete?.name || ''}" from your reward library?`
        }
        confirmText={
          language === 'fr'
            ? 'Supprimer'
            : language === 'es'
              ? 'Eliminar'
              : 'Delete'
        }
        cancelText={
          language === 'fr'
            ? 'Annuler'
            : language === 'es'
              ? 'Cancelar'
              : 'Cancel'
        }
        type="danger"
      />

    </div>
  );
}
