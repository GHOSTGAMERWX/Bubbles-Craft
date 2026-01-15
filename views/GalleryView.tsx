
import React, { useState, useRef, useMemo } from 'react';
import { GALLERY_IMAGES } from '../constants.tsx';
import { Heart, Camera, ChevronDown } from 'lucide-react';

interface GalleryItem {
  id: string;
  url: string;
  creator: string;
  likes: number;
  isLiked: boolean;
  isUserUploaded?: boolean;
}

const ITEMS_PER_PAGE = 10;

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

  const featured = items[0];
  const gridItems = useMemo(() => items.slice(1, visibleCount), [items, visibleCount]);
  const hasMore = visibleCount < items.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, items.length));
  };

  return (
    <div className="relative min-h-screen pb-32">
      <div className="p-6 space-y-6 animate-in fade-in duration-500">
        <header className="text-center space-y-1">
          <h2 className="serif text-3xl text-[#8D7B68]">Inspira-te</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#A4907C] font-bold">Galeria Bubbles & Craft</p>
        </header>

        <div className="relative rounded-[32px] overflow-hidden aspect-[4/5] bg-neutral-100 shadow-xl">
          <img src={featured.url} className="w-full h-full object-cover" alt="Featured art" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/90 backdrop-blur-md rounded-2xl flex justify-between items-center shadow-lg border border-white/50">
            <div>
              <p className="text-[8px] uppercase text-[#8D7B68] font-bold tracking-widest mb-0.5">Obra da Semana</p>
              <p className="serif text-lg text-[#4A3F35] leading-none">{featured.creator}</p>
            </div>
            <button 
              onClick={() => toggleLike(featured.id)}
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
            <div key={item.id} className="relative rounded-[24px] overflow-hidden shadow-sm aspect-[3/4] bg-white border border-[#F1E9E0] animate-in zoom-in-95 duration-300">
              <img src={item.url} className="w-full h-full object-cover" alt={`By ${item.creator}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 p-2 bg-white/85 backdrop-blur-sm rounded-xl flex justify-between items-center shadow-sm border border-white/40">
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
