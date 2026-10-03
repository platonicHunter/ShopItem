"use client";

import { useState } from "react";
import { Search, Percent, Filter, Tag } from "lucide-react";
import { calculateInterest } from "@/lib/util";
import { Category, Item } from "@/types";

const INITIAL_CATEGORIES: Category[] = [
  { id: "1", name: "Groceries" },
  { id: "2", name: "Electronics" },
];

const INITIAL_ITEMS: Item[] = [
  { id: "101", name: "Apple", basePrice: 1.5, categoryId: "1" },
  { id: "102", name: "USB Cable", basePrice: 10.0, categoryId: "2" },
];

export default function Home() {
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [items] = useState<Item[]>(INITIAL_ITEMS);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [interestRate, setInterestRate] = useState<number>(5);

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "ALL" || item.categoryId === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              ဈေးနှုန်းကြည့်ရန်
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              ပစ္စည်းများနှင့် အတိုးတွက်ချက်ထားသော ဈေးနှုန်းများ
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-2 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 w-fit">
            <Percent className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              အတိုး %:
            </span>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-16 font-bold text-indigo-600 dark:text-indigo-400 focus:outline-none text-right bg-slate-50 dark:bg-slate-800 rounded px-1"
            />
          </div>
        </header>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="ပစ္စည်းအမည်ဖြင့် ရှာရန်..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="relative min-w-[160px]">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none transition-all font-medium"
            >
              <option value="ALL">အမျိုးအစားအားလုံး</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const finalPrice = calculateInterest(item.basePrice, interestRate);
            const categoryName = categories.find(
              (c) => c.id === item.categoryId,
            )?.name;

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-3"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-lg">
                    {item.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full">
                    <Tag className="w-3 h-3" />
                    {categoryName || "Uncategorized"}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end">
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      မူရင်းဈေး
                    </p>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 line-through">
                      ${item.basePrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                      {interestRate}% တိုးပြီးဈေး
                    </p>
                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                      ${finalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-400 dark:text-slate-500 text-sm">
              ရှာဖွေမှုနှင့် ကိုက်ညီသော ပစ္စည်းမရှိပါ။
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
