
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { GALLERY_IMAGES } from '../constants.tsx';
import { Heart, Camera, ChevronDown, X, Download, CheckCircle2 } from 'lucide-react';

interface GalleryItem {
  id: string;
  url: string;
  creator: string;
  likes: number;
  isLiked: boolean;
  isUserUploaded?: boolean;
}

const ITEMS_PER_PAGE = 10;

// Componente de Imagem com Lazy Loading e Fade-in
const LazyImage: React.FC<{ src: string; alt: string; className?: string; onClick?: () => void }> = ({ src, alt, className, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} onClick={onClick} className={`relative overflow-hidden bg-[#F1E9E0] ${className}`}>
      {/* Shimmer Effect / Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite] transition-opacity duration-500" />
      )}
      
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        />
      )}
    </div>
  );
};

const GalleryView: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>(() => 
    GALLERY_IMAGES.map((url, i) => ({
      id: `static-${i}`,
      url,
      creator: i === 0 ? 'Equipa B&C' : `User_${Math.floor(Math.random() * 1000)}`,
      likes: Math.floor(Math.random() * 120) + 12,
      isLiked: false
    }))
  );
  
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [showDownloadToast, setShowDownloadToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newItem: GalleryItem = {
          id: Date.now().toString(),
          url: reader.result as string,
          creator: 'Maria',
          likes: 0,
          isLiked: false,
          isUserUploaded: true
        };
        setItems([newItem, ...items]);
        setVisibleCount(prev => prev + 1);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleLike = (id: string) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          likes: item.isLiked ? item.likes - 1 : item.likes + 1,
          isLiked: !item.isLiked
        };
      }
      return item;
    }));
  };

  const handleDownload = async (imageUrl: string, creator: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bubbles_and_craft_${creator.toLowerCase().replace(/\s/g, '_')}_${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setShowDownloadToast(true);
      setTimeout(() => setShowDownloadToast(false), 3000);
    } catch (error) {
      console.error("Erro ao baixar a imagem:", error);
      // Fallback simples caso o fetch falhe (ex: CORS)
      const link = document.createElement('a');
      link.href = imageUrl;
      link.target = "_blank";
      link.download = "arte_bubbles_craft.jpg";
      link.click();
      
      setShowDownloadToast(true);
      setTimeout(() => setShowDownloadToast(false), 3000);
    }
  };

  const featured = items[0];
  const gridItems = useMemo(() => items.slice(1, visibleCount), [items, visibleCount]);
  const hasMore = visibleCount < items.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, items.length));
  };

  return (
    <div className="relative min-h-screen pb-32">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
      
      <div className="p-6 space-y-6 animate-in fade-in duration-500">
        <header className="text-center space-y-1">
          <h2 className="serif text-3xl text-[#8D7B68]">Inspira-te</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#A4907C] font-bold">Galeria Bubbles & Craft</p>
        </header>

        {/* Featured Image with Lazy Loading */}
        <div className="relative rounded-[32px] overflow-hidden aspect-[4/5] bg-neutral-100 shadow-xl border border-[#F1E9E0] cursor-pointer" onClick={() => setSelectedImage(featured)}>
          <LazyImage 
            src={featured.url} 
            alt="Obra da Semana" 
            className="w-full h-full" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/90 backdrop-blur-md rounded-2xl flex justify-between items-center shadow-lg border border-white/50 z-10">
            <div>
              <p className="text-[8px] uppercase text-[#8D7B68] font-bold tracking-widest mb-0.5">Obra da Semana</p>
              <p className="serif text-lg text-[#4A3F35] leading-none">{featured.creator}</p>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); toggleLike(featured.id); }}
              className="flex items-center gap-2 bg-[#FDFBF7] px-3 py-2 rounded-xl shadow-sm active:scale-90 transition-all border border-[#F1E9E0]"
            >
              <Heart size={16} className={featured.isLiked ? 'text-red-500 fill-current' : 'text-neutral-300'} />
              <span className="text-xs font-bold text-[#8D7B68]">{featured.likes}</span>
            </button>
          </div>
        </div>

        <div className="pt-4 flex justify-between items-end border-b border-[#F1E9E0] pb-2">
           <h3 className="serif text-xl text-[#8D7B68]">Comunidade</h3>
           <span className="text-[10px] text-[#A4907C] font-medium italic">Role para descobrir</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {gridItems.map((item) => (
            <div 
              key={item.id} 
              className="relative rounded-[24px] overflow-hidden shadow-sm aspect-[3/4] bg-white border border-[#F1E9E0] animate-in zoom-in-95 duration-300 group cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              <LazyImage 
                src={item.url} 
                alt={`By ${item.creator}`} 
                className="w-full h-full" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-2 left-2 right-2 p-2 bg-white/85 backdrop-blur-sm rounded-xl flex justify-between items-center shadow-sm border border-white/40 z-10 transition-transform group-hover:scale-[1.02]">
                <div className="overflow-hidden mr-1">
                  <p className="serif text-[11px] text-[#4A3F35] truncate leading-tight font-medium">
                    {item.creator}
                  </p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }}
                  className="flex items-center gap-1 bg-white/50 px-1.5 py-1 rounded-lg active:scale-90 transition-all"
                >
                  <Heart size={10} className={item.isLiked ? 'text-red-500 fill-current' : 'text-[#C8B6A6]'} />
                  <span className="text-[9px] font-bold text-[#8D7B68]">{item.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center pt-4 pb-8">
            <button 
              onClick={loadMore}
              className="flex items-center gap-2 px-8 py-3 bg-white border border-[#F1E9E0] text-[#8D7B68] rounded-full text-xs font-bold uppercase tracking-widest shadow-sm active:scale-95 transition-all hover:bg-[#FDFBF7]"
            >
              Mais Artes <ChevronDown size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen Overlay */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 animate-in fade-in duration-300">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-8 right-8 p-3 bg-[#F1E9E0] text-[#8D7B68] rounded-full shadow-lg active:scale-90 transition-transform hover:bg-[#EADACD]"
          >
            <X size={24} />
          </button>

          <div className="w-full max-w-sm aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white">
            <img src={selectedImage.url} className="w-full h-full object-cover" alt="Fullscreen preview" />
          </div>

          <div className="mt-8 text-center space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-black tracking-[0.3em] text-[#A4907C]">Autor da Obra</p>
              <h3 className="serif text-3xl text-[#8D7B68]">{selectedImage.creator}</h3>
            </div>
            
            <button 
              onClick={() => handleDownload(selectedImage.url, selectedImage.creator)}
              className="flex items-center gap-3 bg-[#8D7B68] text-white px-10 py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-transform hover:bg-[#746455]"
            >
              <Download size={20} /> Baixar Arte
            </button>
          </div>
        </div>
      )}

      {/* Success Download Toast */}
      {showDownloadToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[110] bg-green-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-10 fade-in duration-300">
          <CheckCircle2 size={18} />
          <span className="text-xs font-bold uppercase tracking-widest">Baixado com sucesso!</span>
        </div>
      )}

      <div className="fixed bottom-24 left-0 right-0 max-w-md mx-auto pointer-events-none z-50">
        <div className="flex justify-end p-6">
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-14 h-14 bg-[#8D7B68] text-white rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-all border-4 border-white pointer-events-auto"
          >
            <Camera size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryView;
