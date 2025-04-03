export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  reviews: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}
