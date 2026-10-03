export interface Category {
  id: string;
  name: string;
}

export interface Item {
  id: string;
  name: string;
  basePrice: number;
  categoryId: string;
}
