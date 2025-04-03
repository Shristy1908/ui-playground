export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}