export interface Order {
  _id: string;
  orderItems: {
    name: string;
    price: number;
    quantity: number;
    image: string;
    product: string;
  }[];
  user: string;
  orderAt: string;
  itemPrice: number;
  shippingPrice: number;
  totalPrice: number;
  orderStatus: string;
}
