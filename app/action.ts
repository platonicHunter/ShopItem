"use server";

import { sql } from "@vercel/postgres";

export async function getCategories() {
  try {
    const { rows } = await sql`SELECT * FROM categories ORDER BY name ASC;`;
    return rows;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getItems() {
  try {
    const { rows } = await sql`SELECT * FROM items ORDER BY created_at DESC;`;
    return rows;
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}
