// types/index.ts
export interface Category {
  id: string;
  name: string;
  created_at?: string;
}

export interface Item {
  id: string;
  name: string;
  base_price: number;
  unit: string;
  category_id: string;
  created_at?: string;
}
