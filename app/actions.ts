"use server";

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { Category, Item } from "@/types";

// Lazy connection function
function getSql() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL environment variable is missing in .env.local!",
    );
  }
  return neon(connectionString);
}

// ================= CATEGORIES ACTIONS =================

export async function getCategories(): Promise<Category[]> {
  try {
    const sql = getSql();
    const data = await sql`
      SELECT id, name, created_at 
      FROM categories 
      ORDER BY created_at ASC
    `;
    return data as Category[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function createCategory(name: string) {
  try {
    const sql = getSql();
    await sql`
      INSERT INTO categories (name) 
      VALUES (${name})
    `;
    revalidatePath("/categories");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCategory(id: string, name: string) {
  try {
    const sql = getSql();
    await sql`
      UPDATE categories 
      SET name = ${name} 
      WHERE id = ${id}
    `;
    revalidatePath("/categories");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteCategory(id: string) {
  try {
    const sql = getSql();
    await sql`
      DELETE FROM categories 
      WHERE id = ${id}
    `;
    revalidatePath("/categories");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ================= ITEMS ACTIONS =================

export async function getItems(): Promise<Item[]> {
  try {
    const sql = getSql();
    const data = await sql`
      SELECT id, name, base_price::float, unit, category_id, created_at 
      FROM items 
      ORDER BY created_at DESC
    `;
    return data as Item[];
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}

export async function createItem(
  name: string,
  basePrice: number,
  unit: string,
  categoryId: string,
) {
  try {
    const sql = getSql();
    await sql`
      INSERT INTO items (name, base_price, unit, category_id) 
      VALUES (${name}, ${basePrice}, ${unit}, ${categoryId})
    `;
    revalidatePath("/items");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateItem(
  id: string,
  name: string,
  basePrice: number,
  unit: string,
  categoryId: string,
) {
  try {
    const sql = getSql();
    await sql`
      UPDATE items 
      SET name = ${name}, base_price = ${basePrice}, unit = ${unit}, category_id = ${categoryId} 
      WHERE id = ${id}
    `;
    revalidatePath("/items");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteItem(id: string) {
  try {
    const sql = getSql();
    await sql`
      DELETE FROM items 
      WHERE id = ${id}
    `;
    revalidatePath("/items");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
