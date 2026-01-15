
import { Piece, MenuItem, ReservationStatus, Reservation } from './types';

export const PIECES: Piece[] = [
  { id: '1', name: 'Buda Zen', category: 'Estatueta', price: 1250, image: 'https://images.unsplash.com/photo-1590422444867-041c5014886f?auto=format&fit=crop&q=80&w=600', description: 'Uma peça minimalista para trazer paz.' },
  { id: '2', name: 'Caneca Cozy', category: 'Caneca', price: 750, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fbed39?auto=format&fit=crop&q=80&w=600', description: 'Perfeita para o seu chocolate quente.' },
  { id: '3', name: 'Prato Astral', category: 'Prato', price: 950, image: 'https://images.unsplash.com/photo-1520408222757-6f9f95d87d5d?auto=format&fit=crop&q=80&w=600', description: 'Design circular moderno.' },
  { id: '4', name: 'Vaso Flora', category: 'Vaso', price: 1800, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=600', description: 'Elegância para suas plantas.' },
  { id: '5', name: 'Gato Curioso', category: 'Estatueta', price: 850, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600', description: 'Para os amantes de felinos.' },
];

export const MENU_ITEMS: MenuItem[] = [
  { id: 'e1', name: 'Bruschettas do Pomar', category: 'Entradas', description: 'Pão artesanal tostado com tomates cereja marinados, manjericão fresco e um fio de mel balsâmico.' },
  { id: 'e2', name: 'Tábua de Queijos Curados', category: 'Entradas', description: 'Seleção de queijos locais acompanhados por compota de figo caseira e nozes tostadas.' },
  { id: 'p1', name: 'Risotto de Cogumelos Silvestres', category: 'Principal', description: 'Arroz arbóreo cremoso com mix de cogumelos, finalizado com azeite de trufa branca e lascas de parmesão.' },
  { id: 'p2', name: 'Massa de Verão Bubbles', category: 'Principal', description: 'Linguine artesanal com molho leve de limão siciliano, camarões grelhados e raspas de botarga.', isNew: true },
  { id: 'z1', name: 'Margherita Clássica', category: 'Pizzas', description: 'Massa de fermentação lenta (48h), molho de tomate pelati, mozzarella de búfala e manjericão fresco.' },
  { id: 'z2', name: 'Pesto & Burrata', category: 'Pizzas', description: 'Base branca com molho pesto artesanal, finalizada com uma burrata inteira ao centro e pinhões.', isNew: true },
  { id: 'b1', name: 'Cappuccino de Avelã', category: 'Cafés', description: 'Espresso intenso com leite vaporizado e um toque sedutor de xarope de avelã tostada.' },
  { id: 'b2', name: 'V60 Craft Brew', category: 'Cafés', description: 'Café de especialidade moído na hora e extraído no método V60 para notas florais e limpas.' },
  { id: 'b3', name: 'Chá Gelado de Hibisco', category: 'Bubbles', description: 'Infusão fria de hibisco com pérolas de lichia que explodem na boca.', isNew: true },
  { id: 'b4', name: 'Limonada de Lavanda', category: 'Artesanais', description: 'Sumo de limão siciliano fresco com um toque floral de lavanda e mel orgânico.' },
  { id: 'b5', name: 'Craft Pilsner Local', category: 'Cervejas', description: 'Cerveja artesanal leve e refrescante, produzida em pequenos lotes na nossa região.' },
];

export const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1520408222757-6f9f95d87d5d?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1565191999001-551c187427bb?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1493106641515-6b563ad35f0f?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1514228742587-6b1558fbed39?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1590422444867-041c5014886f?auto=format&fit=crop&q=80&w=600',
];

export const MOCK_RESERVATIONS: Reservation[] = [
  { 
    id: 'ORD-8821', 
    pieceIds: ['ORD-8821-01', 'ORD-8821-02'], 
    pieceNames: ['Buda Zen', 'Caneca Cozy'],
    customerName: 'Maria Silva',
    customerPhone: '+258 84 000 0000',
    date: '20.11.2023', 
    time: '14:30', 
    status: ReservationStatus.READY, 
    guests: 2 
  },
  { 
    id: 'ORD-9045', 
    pieceIds: ['ORD-9045-01'], 
    pieceNames: ['Prato Astral'],
    customerName: 'Maria Silva',
    customerPhone: '+258 84 000 0000',
    date: '25.11.2023', 
    time: '10:00', 
    status: ReservationStatus.DRYING, 
    guests: 1 
  },
];

export const MOCK_HISTORY = [
  { id: 'h1', pieceId: '3', date: '10.10.2023', price: 950 },
  { id: 'h2', pieceId: '4', date: '15.09.2023', price: 1800 },
  { id: 'h3', pieceId: '5', date: '01.08.2023', price: 850 },
];
