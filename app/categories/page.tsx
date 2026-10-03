"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, Tag, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Category } from "@/types";

export default function CategoryCrudPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [inputName, setInputName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Categories
  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      toast.error("Categories ခေါ်ယူရာတွင် အမှားအယွင်းရှိနေပါသည်");
    } else if (data) {
      setCategories(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 2. Submit Category
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputName.trim()) {
      toast.warning("ကျေးဇူးပြု၍ Category အမည် ထည့်သွင်းပါ");
      return;
    }

    if (editingId) {
      // Update
      const { error } = await supabase
        .from("categories")
        .update({ name: inputName })
        .eq("id", editingId);

      if (error) {
        toast.error("Category ပြင်ဆင်၍ မရပါ: " + error.message);
      } else {
        toast.success("Category ကို အောင်မြင်စွာ ပြင်ဆင်ပြီးပါပြီ");
        setEditingId(null);
        setInputName("");
        fetchCategories();
      }
    } else {
      // Create
      const { error } = await supabase
        .from("categories")
        .insert([{ name: inputName }]);

      if (error) {
        toast.error("Category ထည့်သွင်း၍ မရပါ: " + error.message);
      } else {
        toast.success("Category သစ်ကို အောင်မြင်စွာ ထည့်သွင်းပြီးပါပြီ");
        setInputName("");
        fetchCategories();
      }
    }
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setInputName(category.name);
  };

  // 3. Delete Category
  const handleDelete = async (id: string) => {
    if (!confirm("ဒီ Category ကို ဖျက်ရန် သေချာပါသလား?")) return;

    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) {
      toast.error("Category ဖျက်၍ မရပါ: " + error.message);
    } else {
      toast.success("Category ကို ဖျက်ပြီးပါပြီ");
      fetchCategories();
    }
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
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          <button
            type="submit"
            className="flex items-center gap-1 px-4 py-2.5 bg-indigo-600 dark:bg-indigo-500 text-white font-medium rounded-xl text-sm hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            {editingId ? "ပြင်ဆင်မည်" : "သိမ်းမည်"}
          </button>
        </form>

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden shadow-sm">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  <span className="font-medium text-slate-700 dark:text-slate-200">
                    {cat.name}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {categories.length === 0 && (
              <div className="text-center py-8 text-slate-400 text-sm">
                Category မရှိသေးပါ။ အထက်ပါ form တွင် ထည့်သွင်းပါ။
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
