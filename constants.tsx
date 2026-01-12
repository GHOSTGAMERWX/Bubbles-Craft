
import { Piece, MenuItem, ReservationStatus } from './types';

export const PIECES: Piece[] = [
  { id: '1', name: 'Buda Zen', category: 'Estatueta', price: 1250, image: 'https://images.unsplash.com/photo-1695584797009-ac1052d9a3da?auto=format&fit=crop&q=80&w=600', description: 'Uma peça minimalista para trazer paz.' },
  { id: '2', name: 'Caneca Cozy', category: 'Caneca', price: 750, image: 'https://images.unsplash.com/photo-1571824160507-8344b27a6f5c?auto=format&fit=crop&q=80&w=600', description: 'Perfeita para o seu chocolate quente.' },
  { id: '3', name: 'Prato Astral', category: 'Prato', price: 950, image: 'https://images.unsplash.com/photo-1520408222757-6f9f95d87d5d?auto=format&fit=crop&q=80&w=600', description: 'Design circular moderno.' },
  { id: '4', name: 'Vaso Flora', category: 'Vaso', price: 1800, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=600', description: 'Elegância para suas plantas.' },
  { id: '5', name: 'Gato Curioso', category: 'Estatueta', price: 850, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600', description: 'Para os amantes de felinos.' },
  { id: '6', name: 'O anjo Inocente', category: 'Estatueta', price: 550, image: 'https://images.unsplash.com/photo-1733313367953-90da0f9fe21c??auto=format&fit=crop&q=80&w=600', description: 'Apreciação para além das nuvens.' },
];

export const MENU_ITEMS: MenuItem[] = [
  { id: 'm1', name: 'Hazelnut Latte', category: 'Cafés Especiais', price: 250, description: 'Sabor aveludado com toque de avelã.', image: 'https://images.unsplash.com/photo-1598831745385-0c404c7034a9??auto=format&fit=crop&q=80&w=400', isNew: true },
  { id: 'm2', name: 'Mocha Dream', category: 'Cafés Especiais', price: 280, description: 'Chocolate belga com café artesanal.', image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&q=80&w=400', isNew: true },
  { id: 'm3', name: 'Capuccino Clássico', category: 'Bebidas Quentes', price: 180, description: 'Aveludado e equilibrado.', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=400' },
  { id: 'm4', name: 'Chá de Hibisco Gelado', category: 'Bebidas Frias', price: 150, description: 'Refrescante e floral.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400' },
  { id: 'm5', name: 'Cookie de Caramelo', category: 'Snacks & Doces', price: 120, description: 'Com flor de sal e gotas de chocolate.', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=400' },
];

export const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1565191999001-551c187427bb?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1520408222757-6f9f95d87d5d?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1650198238466-5611f4f8e255?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1493106641515-6b563ad35f0f?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600',
];

export const MOCK_RESERVATIONS = [
  { id: 'res1', pieceId: '1', date: '20.11.2023', time: '14:30', status: ReservationStatus.READY, guests: 2 },
  { id: 'res2', pieceId: '2', date: '25.11.2023', time: '10:00', status: ReservationStatus.DRYING, guests: 1 },
];

export const MOCK_HISTORY = [
  { id: 'h1', pieceId: '3', date: '10.10.2023', price: 950 },
  { id: 'h2', pieceId: '4', date: '15.09.2023', price: 1800 },
  { id: 'h3', pieceId: '5', date: '01.08.2023', price: 850 },
];
