"use client";

import { useState } from "react";
import { Plus, Trash2, Edit2, Package } from "lucide-react";
import { Category, Item } from "@/types";

export default function ItemCrudPage() {
  const [categories] = useState<Category[]>([
    { id: "1", name: "Groceries" },
    { id: "2", name: "Electronics" },
  ]);

  const [items, setItems] = useState<Item[]>([
    { id: "101", name: "Apple", basePrice: 1.5, categoryId: "1" },
  ]);

  const [name, setName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !basePrice || !categoryId) return;

    if (editingId) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? { ...item, name, basePrice: parseFloat(basePrice), categoryId }
            : item,
        ),
      );
      setEditingId(null);
    } else {
      setItems((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          name,
          basePrice: parseFloat(basePrice),
          categoryId,
        },
      ]);
    }

    setName("");
    setBasePrice("");
    setCategoryId("");
  };

  const handleEdit = (item: Item) => {
    setEditingId(item.id);
    setName(item.name);
    setBasePrice(item.basePrice.toString());
    setCategoryId(item.categoryId);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          ပစ္စည်းများ စီမံရန်
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
        >
          <input
            type="text"
            placeholder="ပစ္စည်း အမည်..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              step="0.01"
              placeholder="မူရင်း ဈေးနှုန်း..."
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="">Category ရွေးရန်</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 dark:bg-indigo-500 text-white font-medium rounded-xl text-sm hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors flex items-center justify-center gap-1"
          >
            <Plus className="w-4 h-4" />
            {editingId ? "ပြင်ဆင်ချက် သိမ်းမည်" : "ပစ္စည်းအသစ် ထည့်မည်"}
          </button>
        </form>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden shadow-sm">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-100">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    မူရင်းဈေး: ${item.basePrice.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
