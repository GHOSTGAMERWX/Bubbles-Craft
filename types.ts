
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
  id: string; 
  pieceIds: string[]; 
  pieceNames: string[]; 
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  status: ReservationStatus;
  guests: number;
  paintedImages?: Record<string, string>; // Mapeia o Tag ID para a imagem base64/url
}
