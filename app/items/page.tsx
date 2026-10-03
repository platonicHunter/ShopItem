"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, Package, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Category, Item } from "@/types";

export default function ItemCrudPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [unit, setUnit] = useState("ခု");
  const [categoryId, setCategoryId] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const { data: catData, error: catErr } = await supabase
      .from("categories")
      .select("*");
    const { data: itemData, error: itemErr } = await supabase
      .from("items")
      .select("*")
      .order("created_at", { ascending: false });

    if (catErr || itemErr) {
      toast.error("Data ခေါ်ယူရာတွင် အမှားအယွင်းရှိနေပါသည်");
    }

    if (catData) setCategories(catData);
    if (itemData) setItems(itemData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validations with Sonner Toast
    if (!name.trim()) {
      toast.warning("ကျေးဇူးပြု၍ ပစ္စည်းအမည် ထည့်သွင်းပါ");
      return;
    }
    if (!basePrice || parseFloat(basePrice) <= 0) {
      toast.warning("ကျေးဇူးပြု၍ မှန်ကန်သော မူရင်းဈေးနှုန်း ထည့်သွင်းပါ");
      return;
    }
    if (!categoryId) {
      toast.warning("ကျေးဇူးပြု၍ Category အမျိုးအစား ရွေးချယ်ပေးပါ");
      return;
    }

    const payload = {
      name,
      base_price: parseFloat(basePrice),
      unit,
      category_id: categoryId,
    };

    if (editingId) {
      const { error } = await supabase
        .from("items")
        .update(payload)
        .eq("id", editingId);

      if (error) {
        toast.error("ပစ္စည်းအချက်အလက် ပြင်ဆင်၍ မရပါ: " + error.message);
      } else {
        toast.success("ပစ္စည်းအချက်အလက်ကို အောင်မြင်စွာ ပြင်ဆင်ပြီးပါပြီ");
        resetForm();
        fetchData();
      }
    } else {
      const { error } = await supabase.from("items").insert([payload]);

      if (error) {
        toast.error("ပစ္စည်းအသစ် ထည့်သွင်း၍ မရပါ: " + error.message);
      } else {
        toast.success("ပစ္စည်းအသစ်ကို အောင်မြင်စွာ ထည့်သွင်းပြီးပါပြီ");
        resetForm();
        fetchData();
      }
    }
  };

  const resetForm = () => {
    setName("");
    setBasePrice("");
    setUnit("ခု");
    setCategoryId("");
    setEditingId(null);
  };

  const handleEdit = (item: Item) => {
    setEditingId(item.id);
    setName(item.name);
    setBasePrice(item.base_price.toString());
    setUnit(item.unit || "ခု");
    setCategoryId(item.category_id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("ဒီပစ္စည်းကို ဖျက်ရန် သေချာပါသလား?")) return;

    const { error } = await supabase.from("items").delete().eq("id", id);
    if (error) {
      toast.error("ပစ္စည်း ဖျက်၍ မရပါ: " + error.message);
    } else {
      toast.success("ပစ္စည်းကို ဖျက်ပြီးပါပြီ");
      fetchData();
    }
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
            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />

          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              step="0.01"
              placeholder="မူရင်း ဈေးနှုန်း..."
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />

            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="ခု">ခု</option>
              <option value="ထုပ်">ထုပ်</option>
              <option value="ဘူး">ဘူး</option>
              <option value="ကဒ်">ကဒ်</option>
              <option value="တွဲ">တွဲ</option>
              <option value="ပါကင်">ပါကင်</option>
            </select>

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className={`px-3 py-2 rounded-xl border bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                !categoryId
                  ? "border-amber-400 dark:border-amber-500"
                  : "border-slate-200 dark:border-slate-800"
              }`}
            >
              <option value="">-- Category ရွေးရန် --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-indigo-600 dark:bg-indigo-500 text-white font-medium rounded-xl text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1"
            >
              <Plus className="w-4 h-4" />
              {editingId ? "ပြင်ဆင်ချက် သိမ်းမည်" : "ပစ္စည်းအသစ် ထည့်မည်"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium rounded-xl text-sm hover:bg-slate-200 transition-colors"
              >
                မလုပ်တော့ပါ
              </button>
            )}
          </div>
        </form>

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
          </div>
        ) : (
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
                      မူရင်းဈေး: ${item.base_price.toFixed(2)} / 1 {item.unit}
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

            {items.length === 0 && (
              <div className="text-center py-8 text-slate-400 text-sm">
                ပစ္စည်း မရှိသေးပါ။ အထက်ပါ form တွင် ထည့်သွင်းပါ။
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
