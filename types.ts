
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
  category: 'Bebidas Quentes' | 'Bebidas Frias' | 'Cafés Especiais' | 'Snacks & Doces';
  price: number;
  description: string;
  image: string;
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
