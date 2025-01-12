export interface Gpu {
  _id: string;
  model: string;
  description: string;
  startingPrice: number;
  currentBid?: {
    amount: number;
    userId: string;
  };
  seller: string;
  createdAt: string;
}