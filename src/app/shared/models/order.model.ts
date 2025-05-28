import { CartItem } from './cart-item.model';
import { User } from './user.model';

export interface Order {
  id?: number;
  user: User;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentMethod: string;
  status?: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt?: Date;
}