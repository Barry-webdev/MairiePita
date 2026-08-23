'use client';

import { useState, useEffect, useRef } from 'react';
import { galleryService, type GalleryMedia } from '@/lib/api/gallery.service';

export default function AdminGalerieDashboard() {
  const [medias, setMedias] = useState<GalleryMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [categoryFilter, setCategoryFilter] = useState('Toutes');
  const [selectedMedia, setSelectedMedia] = useState<GalleryMedia | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [mediaToDelete, setMediaToDelete] = useState<GalleryMedia | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [uploadForm, setUploadForm] = useState({
    titre: '',
    description: '',
    categorie: 'Autres' as GalleryMedia['categorie'],
    date: new Date().toISOString().split('T')[0],
  });

  const [editForm, setEditForm] = useState({
    titre: '',
    description: '',
    categorie: 'Autres' as GalleryMedia['categorie'],
    date: '',
    published: true,
  });

  const categories: GalleryMedia['categorie'][] = [
    'Événements',
    'Infrastructure',
    'Cérémonies',
    'Vie quotidienne',
    'Actualités',
    'Autres',
  ];

  useEffect(() => {
    loadMedias();
  }, []);

  async function loadMedias() {
    try {
      setLoading(true);
      const data = await galleryService.getAllAdmin();
      setMedias(data);
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  }

   async function handleUpload() {
    console.log('=== handleUpload called ===');
    
    const file = fileInputRef.current?.files?.[0];
    console.log('File:', file);
    
    if (!file) {
      alert('⚠️ Veuillez sélectionner un fichier');
      return;
    }

    if (!uploadForm.titre.trim()) {
      alert('⚠️ Le titre est obligatoire');
      return;
    }

    // Vérifier le type
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    console.log('Type check:', { isImage, isVideo, type: file.type });

    if (!isImage && !isVideo) {
      alert('❌ Seuls les images et vidéos sont acceptées');
      return;
    }

    // Vérifier la taille (20MB max pour vidéos, 10MB pour images)
    const maxSize = isVideo ? 20 * 1024 * 1024 : 10 * 1024 * 1024;
    const maxLabel = isVideo ? '20MB' : '10MB';

    console.log('Size check:', { fileSize: file.size, maxSize, maxLabel });

    if (file.size > maxSize) {
      alert(`❌ Le fichier est trop volumineux (max ${maxLabel})`);
      return;
    }

    console.log('=== Starting upload ===');

    try {
      setUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append('image', file);
      formData.append('titre', uploadForm.titre);
      formData.append('description', uploadForm.description);
      formData.append('categorie', uploadForm.categorie);
      formData.append('date', uploadForm.date);

      console.log('Upload start...', {
        titre: uploadForm.titre,
        size: file.size,
        type: file.type,
      });

      // Upload avec simulation de progression
      const uploadPromise = galleryService.upload(formData);
      
      // Simuler la progression pour les vidéos
      if (isVideo) {
        const interval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 95) {
              clearInterval(interval);
              return 95;
            }
            return prev + 5;
          });
        }, 3000); // Augmente de 5% toutes les 3 secondes

        await uploadPromise;
        clearInterval(interval);
        setUploadProgress(100);
      } else {
        await uploadPromise;
        setUploadProgress(100);
      }

      // Reset form
      setUploadForm({
        titre: '',
        description: '',
        categorie: 'Autres',
        date: new Date().toISOString().split('T')[0],
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      alert('✅ Média uploadé avec succès !');
      setShowUploadForm(false); // Fermer le formulaire après upload
      await loadMedias();
    } catch (error: any) {
      console.error('Upload error:', error);
      alert('❌ ' + (error.message || 'Erreur lors de l\'upload'));
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }


  async function handleEdit() {
    if (!selectedMedia) return;

    try {
      await galleryService.update(selectedMedia._id, editForm);
      alert('✅ Média modifié avec succès !');
      setShowEditModal(false);
      setSelectedMedia(null);
      loadMedias();
    } catch (error: any) {
      alert('❌ ' + (error.message || 'Erreur lors de la modification'));
    }
  }

  async function handleTogglePublish(media: GalleryMedia) {
    try {
      await galleryService.togglePublished(media._id);
      loadMedias();
    } catch (error: any) {
      alert('❌ ' + (error.message || 'Erreur'));
    }
  }

  async function handleDelete() {
    if (!mediaToDelete) return;

    try {
      await galleryService.delete(mediaToDelete._id);
      alert('✅ Média supprimé avec succès !');
      setShowDeleteModal(false);
      setMediaToDelete(null);
      loadMedias();
    } catch (error: any) {
      alert('❌ ' + (error.message || 'Erreur lors de la suppression'));
    }
  }

  function openEditModal(media: GalleryMedia) {
    setSelectedMedia(media);
    setEditForm({
      titre: media.titre,
      description: media.description || '',
      categorie: media.categorie,
      date: media.date.split('T')[0],
      published: media.published,
    });
    setShowEditModal(true);
  }

  function openDeleteModal(media: GalleryMedia) {
    setMediaToDelete(media);
    setShowDeleteModal(true);
  }

  const filteredMedias = medias.filter((m) => {
    if (filter !== 'all' && m.mediaType !== filter) return false;
    if (categoryFilter !== 'Toutes' && m.categorie !== categoryFilter) return false;
    return true;
  });

  const stats = {
    total: medias.length,
    images: medias.filter((m) => m.mediaType === 'image').length,
    videos: medias.filter((m) => m.mediaType === 'video').length,
    published: medias.filter((m) => m.published).length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
          <p className="text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Galerie Photo & Vidéo</h1>
          <p className="text-sm text-gray-500 mt-1">Gérez vos médias</p>
        </div>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="flex items-center gap-2 px-5 py-3 text-sm font-bold rounded-lg bg-green-600 text-white hover:bg-green-700 transition shadow-sm"
        >
          {showUploadForm ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Fermer
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Ajouter Photo ou Vidéo
            </>
          )}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Photos</p>
          <p className="text-2xl font-bold text-blue-600">{stats.images}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Vidéos</p>
          <p className="text-2xl font-bold text-purple-600">{stats.videos}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Publiés</p>
          <p className="text-2xl font-bold text-green-600">{stats.published}</p>
        </div>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Uploader un média</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Titre</label>
            <input
              type="text"
              value={uploadForm.titre}
              onChange={(e) => setUploadForm({ ...uploadForm, titre: e.target.value })}
              placeholder="Titre du média"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Catégorie</label>
            <select
              value={uploadForm.categorie}
              onChange={(e) => setUploadForm({ ...uploadForm, categorie: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={uploadForm.date}
              onChange={(e) => setUploadForm({ ...uploadForm, date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

                    <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Fichier (Image ou Vidéo)</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              disabled={uploading}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea
            value={uploadForm.description}
            onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
            placeholder="Description du média (optionnel)"
            rows={2}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
          />
        </div>

        {/* Message d'information pour les vidéos */}
        <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800 mb-2">
            <strong>💡 Recommandations pour les vidéos :</strong>
          </p>
          <ul className="text-xs text-amber-700 space-y-1 ml-4 list-disc">
            <li>Taille maximale : <strong>20MB</strong> (10MB recommandé)</li>
            <li>Résolution recommandée : <strong>720p maximum</strong></li>
            <li>Durée : <strong>moins de 2 minutes</strong> pour un upload rapide</li>
            <li>Pour compresser vos vidéos : <a href="https://www.freeconvert.com/video-compressor" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-amber-900">Outil gratuit</a></li>
          </ul>
        </div>
        
        <button
          onClick={handleUpload}
          disabled={uploading || !uploadForm.titre.trim()}
          className="w-full py-3 text-sm font-bold rounded-lg bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? 'Upload en cours...' : '📤 Uploader le média'}
        </button>

        {uploading && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-600 font-semibold">Upload en cours...</span>
              <span className="text-green-600 font-bold">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-green-600 transition-all duration-300 ease-out"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            {uploadProgress < 95 && (
              <p className="text-xs text-gray-500 text-center">
                ⏱️ Les vidéos peuvent prendre plusieurs minutes...
              </p>
            )}
          </div>
        )}
      </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">Type</label>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setFilter('image')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === 'image' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Photos
              </button>
              <button
                onClick={() => setFilter('video')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === 'video' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Vidéos
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">Catégorie</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="Toutes">Toutes</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredMedias.map((media) => (
          <div key={media._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
            {/* Preview */}
            <div className="relative aspect-video bg-gray-100">
              {media.mediaType === 'image' ? (
                <img
                  src={media.mediaUrl}
                  alt={media.titre}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative w-full h-full">
                  <video
                    src={media.mediaUrl}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  {media.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {Math.floor(media.duration / 60)}:{String(Math.floor(media.duration % 60)).padStart(2, '0')}
                    </div>
                  )}
                </div>
              )}
              
              {/* Badge Type */}
              <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-bold text-white ${
                media.mediaType === 'image' ? 'bg-blue-600' : 'bg-purple-600'
              }`}>
                {media.mediaType === 'image' ? 'Photo' : 'Vidéo'}
              </div>

              {/* Badge Status */}
              <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold text-white ${
                media.published ? 'bg-green-600' : 'bg-gray-500'
              }`}>
                {media.published ? 'Publié' : 'Brouillon'}
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-1">{media.titre}</h3>
              <p className="text-xs text-gray-500 mb-2">{media.categorie}</p>
              {media.description && (
                <p className="text-xs text-gray-600 line-clamp-2 mb-3">{media.description}</p>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleTogglePublish(media)}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    media.published
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {media.published ? 'Dépublier' : 'Publier'}
                </button>
                <button
                  onClick={() => openEditModal(media)}
                  className="px-3 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Modifier
                </button>
                <button
                  onClick={() => openDeleteModal(media)}
                  className="px-3 py-2 rounded-lg text-xs font-semibold bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMedias.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>Aucun média trouvé</p>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Modifier le média</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Titre</label>
                <input
                  type="text"
                  value={editForm.titre}
                  onChange={(e) => setEditForm({ ...editForm, titre: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Catégorie</label>
                <select
                  value={editForm.categorie}
                  onChange={(e) => setEditForm({ ...editForm, categorie: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={editForm.published}
                  onChange={(e) => setEditForm({ ...editForm, published: e.target.checked })}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-600"
                />
                <label htmlFor="published" className="text-sm font-semibold text-gray-700">Publié</label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedMedia(null);
                }}
                className="flex-1 py-2.5 text-sm font-semibold rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleEdit}
                className="flex-1 py-2.5 text-sm font-semibold rounded-lg bg-green-600 hover:bg-green-700 transition text-white"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && mediaToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-center text-gray-800 mb-2">
              Supprimer ce média ?
            </h3>
            <p className="text-sm text-center text-gray-600 mb-6">
              Cette action est irréversible. Le fichier sera supprimé de Cloudinary.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setMediaToDelete(null);
                }}
                className="flex-1 py-2.5 text-sm font-semibold rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2.5 text-sm font-semibold rounded-lg bg-red-600 hover:bg-red-700 transition text-white"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
