"use client";

import { useState } from "react";
import { Plus, Trash2, Edit2, Tag } from "lucide-react";
import { Category } from "@/types";

export default function CategoryCrudPage() {
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Groceries" },
    { id: "2", name: "Electronics" },
  ]);
  const [inputName, setInputName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) return;

    if (editingId) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingId ? { ...cat, name: inputName } : cat,
        ),
      );
      setEditingId(null);
    } else {
      setCategories((prev) => [
        ...prev,
        { id: Date.now().toString(), name: inputName },
      ]);
    }
    setInputName("");
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setInputName(category.name);
  };

  const handleDelete = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          Category စီမံရန်
        </h1>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Category အမည်အသစ်..."
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
          <button
            type="submit"
            className="flex items-center gap-1 px-4 py-2.5 bg-indigo-600 dark:bg-indigo-500 text-white font-medium rounded-xl text-sm hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            {editingId ? "ပြင်ဆင်မည်" : "သိမ်းမည်"}
          </button>
        </form>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden shadow-sm">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  {cat.name}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(cat)}
                  className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
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
