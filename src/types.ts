export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  hasSmallVersion?: boolean;
  smallPrice?: number;
  description?: string;
  popular?: boolean;
}

export interface OrderItem extends MenuItem {
  quantity: number;
  isSmallVersion?: boolean;
}

export interface ToastMessage {
  message: string;
  type: 'success' | 'info';
}