
export type TabType = 'home' | 'reserve' | 'gallery' | 'menu' | 'profile';

export interface Piece {
  id: string;
  name: string;
  category: 'Estatueta' | 'Caneca' | 'Prato' | 'Vaso';
  price: number;
  image: string;
  description: string;
}

// Updated MenuItem category to include both food and beverage categories defined in constants.tsx
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
  id: string;
  pieceId: string;
  date: string;
  time: string;
  status: ReservationStatus;
  guests: number;
}