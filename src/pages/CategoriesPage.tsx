import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, ChevronRight } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { categories, setSelectedCategory, setFilterState, setActiveTab } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          Explore Product Categories
        </h1>
        <p className="text-xs text-gray-500">
          Browse through our comprehensive range of high quality school, college, and office supplies
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map(cat => (
          <div
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setFilterState(prev => ({ ...prev, category: cat.id }));
              setActiveTab('shop');
            }}
            className="group relative bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between p-4"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-900 mb-4">
              <img
                src={cat.image}
                alt={cat.name.en}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                {cat.name.en}
              </h3>
              <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                <span>{cat.itemCount} items available</span>
                <ChevronRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
