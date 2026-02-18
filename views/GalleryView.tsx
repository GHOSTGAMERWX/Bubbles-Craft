
import React, { useState, useRef, useEffect } from 'react';
import { GALLERY_IMAGES } from '../constants.tsx';
import { Heart, Camera, X, Download, Check, Loader2, RotateCw, ZoomIn, Move, Sparkles, ArrowUpRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  url: string;
  creator: string;
  likes: number;
  isLiked: boolean;
  isUserUploaded?: boolean;
}

const ITEMS_PER_PAGE = 10;

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
  const [showToast, setShowToast] = useState(false);
  
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishProgress, setPublishProgress] = useState(0);
  const [publishMessage, setPublishMessage] = useState("");
  
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const publishingMessages = [
    "Processando imagem...",
    "Otimizando para a galeria...",
    "Assinando obra digitalmente...",
    "Secando tintas...",
    "Quase lá..."
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingImage(reader.result as string);
        setZoom(1);
        setRotation(0);
        setOffset({ x: 0, y: 0 });
      };
      reader.readAsDataURL(file);
    }
  };

  const startPublishing = async () => {
    if (!editingImage) return;
    setIsPublishing(true);
    setPublishProgress(0);

    const finalImage = await processCroppedImage();
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        finalizePublish(finalImage);
      }
      setPublishProgress(Math.min(progress, 100));
      setPublishMessage(publishingMessages[Math.floor((progress / 100) * (publishingMessages.length - 1))]);
    }, 400);
  };

  const processCroppedImage = (): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = editingImage!;
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return resolve(editingImage!);
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(editingImage!);

        const size = 1080;
        canvas.width = size;
        canvas.height = size;

        ctx.clearRect(0, 0, size, size);
        ctx.save();
        ctx.translate(size / 2, size / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.scale(zoom, zoom);
        
        const aspect = img.width / img.height;
        let drawW, drawH;
        if (aspect > 1) {
          drawH = size;
          drawW = size * aspect;
        } else {
          drawW = size;
          drawH = size / aspect;
        }

        ctx.drawImage(
          img, 
          -drawW / 2 + (offset.x * (drawW/300)), 
          -drawH / 2 + (offset.y * (drawH/300)), 
          drawW, 
          drawH
        );
        
        ctx.restore();
        resolve(canvas.toDataURL('image/jpeg', 0.95));
      };
    });
  };

  const finalizePublish = (finalUrl: string) => {
    setTimeout(() => {
      const newItem: GalleryItem = {
        id: Date.now().toString(),
        url: finalUrl,
        creator: 'Você',
        likes: 0,
        isLiked: false,
        isUserUploaded: true
      };
      
      setItems(prev => {
        const newItems = [...prev];
        newItems.splice(1, 0, newItem);
        return newItems;
      });

      setIsPublishing(false);
      setEditingImage(null);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }, 500);
  };

  const onMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX - offset.x, y: clientY - offset.y });
  };

  const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setOffset({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y
    });
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

  const scrollToNewItem = () => {
    window.scrollTo({ top: 400, behavior: 'smooth' });
    setShowToast(false);
  };

  const featured = items[0];
  const gridItems = items.slice(1, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <div className="relative min-h-screen pb-32">
      <canvas ref={canvasRef} className="hidden" />
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer { 100% { transform: translateX(100%); } }
      `}} />
      
      <div className="p-6 space-y-6 animate-in fade-in duration-500">
        <header className="text-center space-y-1">
          <h2 className="serif text-3xl text-[#8D7B68]">Inspirações</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#A4907C] font-bold">Bubbles & Craft Gallery</p>
        </header>

        <section className="space-y-4">
          <div className="relative rounded-[32px] overflow-hidden aspect-square bg-white shadow-xl border border-[#F1E9E0] cursor-pointer" onClick={() => setSelectedImage(featured)}>
            <LazyImage src={featured.url} alt="Destaque" className="w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-md rounded-2xl flex justify-between items-center shadow-lg border border-white/50 z-10">
              <div>
                <p className="text-[8px] uppercase text-[#8D7B68] font-black tracking-widest mb-0.5">Destaque da Semana</p>
                <p className="serif text-lg text-[#4A3F35]">{featured.creator}</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); toggleLike(featured.id); }} className="flex items-center gap-2 bg-[#FDFBF7] px-3 py-2 rounded-xl border border-[#F1E9E0]">
                <Heart size={16} className={featured.isLiked ? 'text-red-500 fill-current' : 'text-neutral-300'} />
                <span className="text-xs font-bold text-[#8D7B68]">{featured.likes}</span>
              </button>
            </div>
          </div>
        </section>

        <div className="pt-4 flex justify-between items-end border-b border-[#F1E9E0] pb-2">
           <h3 className="serif text-xl text-[#8D7B68]">Comunidade</h3>
           <span className="text-[9px] text-[#A4907C] uppercase font-bold tracking-widest">{items.length - 1} Obras</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {gridItems.map((item) => (
            <div key={item.id} className="relative rounded-[24px] overflow-hidden aspect-square shadow-sm bg-white border border-[#F1E9E0] animate-in zoom-in-95 duration-300 cursor-pointer" onClick={() => setSelectedImage(item)}>
              <LazyImage src={item.url} alt={`Obra por ${item.creator}`} className="w-full h-full" />
              {item.isUserUploaded && (
                <div className="absolute top-2 left-2 bg-[#8D7B68] text-white p-1 rounded-full shadow-lg">
                  <Sparkles size={10} />
                </div>
              )}
              <div className="absolute bottom-2 left-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-xl flex justify-between items-center shadow-sm border border-white/40">
                <p className="serif text-[10px] text-[#4A3F35] truncate font-medium">{item.creator}</p>
                <button onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }} className="flex items-center gap-1">
                  <Heart size={10} className={item.isLiked ? 'text-red-500 fill-current' : 'text-[#C8B6A6]'} />
                  <span className="text-[9px] font-bold text-[#8D7B68]">{item.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center pt-4">
            <button onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)} className="px-8 py-3 bg-white border border-[#F1E9E0] text-[#8D7B68] rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
              Ver mais obras
            </button>
          </div>
        )}
      </div>

      {editingImage && !isPublishing && (
        <div className="fixed inset-0 z-[120] bg-[#FDFBF7] flex flex-col animate-in slide-in-from-bottom duration-500">
          <header className="p-6 flex justify-between items-center border-b border-[#F1E9E0] bg-white">
            <button onClick={() => setEditingImage(null)} className="p-2 text-[#A4907C]"><X size={24} /></button>
            <h3 className="serif text-xl text-[#8D7B68]">Ajustar Enquadramento</h3>
            <button onClick={startPublishing} className="bg-[#8D7B68] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">Publicar</button>
          </header>
          
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-10">
            <div 
              className="relative w-full max-w-[320px] aspect-square rounded-[32px] overflow-hidden shadow-2xl bg-white border-4 border-white cursor-move touch-none"
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onTouchStart={onMouseDown}
              onTouchMove={onMouseMove}
              onTouchEnd={() => setIsDragging(false)}
            >
              <img 
                src={editingImage} 
                className="pointer-events-none select-none max-w-none"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotation}deg) scale(${zoom})`,
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                }}
              />
              <div className="absolute inset-0 border border-[#8D7B68]/10 pointer-events-none grid grid-cols-3 grid-rows-3">
                 {[...Array(9)].map((_, i) => <div key={i} className="border border-[#8D7B68]/10" />)}
              </div>
              <div className="absolute bottom-4 right-4 bg-white/40 backdrop-blur-md p-2 rounded-full text-[#8D7B68]"><Move size={14} /></div>
            </div>
            
            <div className="w-full max-w-[300px] space-y-8">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-[#A4907C]">
                  <div className="flex items-center gap-2"><ZoomIn size={14} /> Nível de Zoom</div>
                  <span className="text-[#8D7B68]">{Math.round(zoom * 100)}%</span>
                </div>
                <input 
                  type="range" min="1" max="3" step="0.05" value={zoom} 
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[#F1E9E0] rounded-full appearance-none accent-[#8D7B68]"
                />
              </div>

              <div className="flex justify-center gap-8">
                <button onClick={() => setRotation(prev => (prev + 90) % 360)} className="flex flex-col items-center gap-2 group">
                  <div className="w-14 h-14 rounded-full border border-[#F1E9E0] flex items-center justify-center bg-white shadow-sm group-active:scale-90 transition-transform">
                    <RotateCw size={22} className="text-[#8D7B68]" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#A4907C]">Rodar 90°</span>
                </button>
              </div>
            </div>
          </div>
          
          <footer className="p-8 bg-white border-t border-[#F1E9E0] text-center">
            <p className="text-[10px] text-[#A4907C] font-medium italic">Arraste para mover • Slider para aproximar</p>
          </footer>
        </div>
      )}

      {isPublishing && (
        <div className="fixed inset-0 z-[150] bg-[#FDFBF7] flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
          <div className="w-24 h-24 mb-8 flex items-center justify-center relative">
            <Loader2 className="text-[#8D7B68] animate-spin absolute" size={48} strokeWidth={1} />
            <div className="w-16 h-16 rounded-full bg-[#8D7B68]/5 animate-pulse" />
          </div>

          <div className="space-y-6 text-center w-full max-w-xs">
            <div className="space-y-1">
              <h2 className="serif text-2xl text-[#8D7B68]">{publishMessage}</h2>
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#A4907C] font-black">Bubbles & Craft</p>
            </div>
            
            <div className="space-y-2">
              <div className="h-1.5 w-full bg-[#F1E9E0] rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-[#8D7B68] transition-all duration-300 ease-out" 
                  style={{ width: `${publishProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px] font-black text-[#A4907C] uppercase tracking-[0.2em]">
                <span>Status</span>
                <span>{Math.floor(publishProgress)}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pop-up de Visualização Refinado e Responsivo */}
      {selectedImage && !editingImage && (
        <div className="fixed inset-0 z-[100] bg-white/98 backdrop-blur-xl flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
          <button 
            onClick={() => setSelectedImage(null)} 
            className="absolute top-8 right-8 p-3 text-[#A4907C] hover:text-[#8D7B68] transition-colors z-[110] active:scale-90"
          >
            <X size={32} />
          </button>
          
          <div className="w-full flex-1 flex flex-col items-center justify-center max-w-[500px] mx-auto">
            <div className="relative group w-full flex flex-col items-center animate-in zoom-in-95 duration-500">
              <div className="bg-white p-2 rounded-[32px] shadow-2xl border border-[#F1E9E0] w-full aspect-square flex items-center justify-center overflow-hidden">
                <img 
                  src={selectedImage.url} 
                  className="w-full h-full object-contain rounded-[24px]" 
                  alt={`Obra de ${selectedImage.creator}`} 
                />
              </div>
              
              <div className="mt-8 text-center space-y-2">
                <p className="text-[10px] uppercase font-black tracking-[0.4em] text-[#A4907C]">Autor da Obra</p>
                <h3 className="serif text-3xl text-[#8D7B68]">{selectedImage.creator}</h3>
                
                <div className="flex items-center justify-center gap-2 mt-2">
                   <div className="flex items-center gap-1.5 bg-[#FDFBF7] px-3 py-1 rounded-full border border-[#F1E9E0]">
                      <Heart size={14} className={selectedImage.isLiked ? 'text-red-500 fill-current' : 'text-[#C8B6A6]'} />
                      <span className="text-[11px] font-bold text-[#8D7B68]">{selectedImage.likes}</span>
                   </div>
                </div>
              </div>
            </div>

            <div className="mt-12 w-full">
               <button className="w-full flex items-center justify-center gap-3 bg-[#8D7B68] text-white py-5 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-transform hover:bg-[#746455]">
                 <Download size={20} /> Guardar Arte Digital
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast de Confirmação Refinado */}
      {showToast && (
        <div className="fixed bottom-24 left-0 right-0 px-6 z-[110] flex justify-center pointer-events-none">
          <div className="bg-white/80 backdrop-blur-xl border border-[#8D7B68]/20 px-4 py-3 rounded-2xl shadow-[0_20px_50px_rgba(141,123,104,0.15)] flex items-center gap-4 animate-in slide-in-from-bottom-12 fade-in duration-700 pointer-events-auto max-w-[340px] w-full">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0 shadow-inner relative">
              <Check size={20} />
              <div className="absolute inset-0 rounded-xl bg-green-500/20 animate-ping" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-[#8D7B68] uppercase tracking-wider truncate leading-tight">Obra Publicada!</p>
              <p className="text-[9px] text-[#A4907C] font-medium truncate">Já podes ver a tua criação na galeria.</p>
            </div>

            <button 
              onClick={scrollToNewItem}
              className="flex items-center gap-1.5 bg-[#8D7B68] text-white px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest active:scale-95 transition-transform shadow-md"
            >
              Ver <ArrowUpRight size={10} />
            </button>
          </div>
        </div>
      )}

      <div className="fixed bottom-24 left-0 right-0 max-w-md mx-auto pointer-events-none z-50">
        <div className="flex justify-end p-6">
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
          <button onClick={() => fileInputRef.current?.click()} className="w-16 h-16 bg-[#8D7B68] text-white rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-all border-4 border-white pointer-events-auto">
            <Camera size={26} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryView;
