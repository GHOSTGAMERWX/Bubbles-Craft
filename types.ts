
export type TabType = 'home' | 'reserve' | 'gallery' | 'menu' | 'profile';

export interface Piece {
  id: string;
  name: string;
  category: 'Estatueta' | 'Caneca' | 'Prato' | 'Vaso';
  price: number;
  image: string;
  description: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'Entradas' | 'Principal' | 'Pizzas' | 'Cafés' | 'Bubbles' | 'Artesanais' | 'Cervejas';
  description: string;
  isNew?: boolean;
}

export enum ReservationStatus {
  PENDING = 'Pendente',
  DRYING = 'Em Secagem',
  READY = 'Pronto para Levantamento'
}

export interface Reservation {
  id: string; // Order ID Único
  pieceIds: string[]; // IDs Individuais das Peças (ex: ORD-123-01)
  pieceNames: string[]; // Nomes das peças para exibição
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  status: ReservationStatus;
  guests: number;
}
