import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, ShoppingCart, Check } from 'lucide-react';

export const CompareModal: React.FC = () => {
  const { 
    isCompareModalOpen, 
    setIsCompareModalOpen, 
    comparedProducts, 
    toggleCompare, 
    addToCart 
  } = useApp();

  if (!isCompareModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden max-h-[90vh] flex flex-col my-auto">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50">
          <div>
            <h2 className="text-base font-extrabold text-gray-900 dark:text-white">Product Comparison Matrix</h2>
            <p className="text-xs text-gray-500">Comparing {comparedProducts.length} stationery items side by side</p>
          </div>
          <button
            onClick={() => setIsCompareModalOpen(false)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Matrix Content */}
        <div className="p-6 overflow-x-auto flex-1">
          {comparedProducts.length === 0 ? (
            <p className="text-center text-xs text-gray-400 py-12">No products added for comparison yet.</p>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr>
                  <th className="p-3 bg-gray-50 dark:bg-gray-800 text-gray-500 font-bold uppercase w-36">Feature</th>
                  {comparedProducts.map(prod => (
                    <th key={prod.id} className="p-3 border-l border-gray-200 dark:border-gray-700 min-w-48 align-top">
                      <div className="space-y-2 text-center">
                        <img src={prod.images[0]} alt={prod.name} className="w-20 h-20 object-cover rounded-xl mx-auto" />
                        <h4 className="font-bold text-gray-900 dark:text-white line-clamp-2">{prod.name}</h4>
                        <p className="text-orange-600 font-extrabold text-sm">₹{prod.discountPrice || prod.price}</p>
                        <button
                          onClick={() => addToCart(prod, 1)}
                          className="w-full py-1.5 px-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-bold text-[11px] flex items-center justify-center space-x-1"
                        >
                          <ShoppingCart className="w-3 h-3 text-orange-400" />
                          <span>Add to Cart</span>
                        </button>
                        <button
                          onClick={() => toggleCompare(prod)}
                          className="text-red-500 hover:underline text-[10px] flex items-center justify-center mx-auto"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Remove
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <tr>
                  <td className="p-3 font-bold text-gray-500 bg-gray-50 dark:bg-gray-800">Brand</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="p-3 border-l border-gray-200 dark:border-gray-700 font-semibold">{p.brand}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-gray-500 bg-gray-50 dark:bg-gray-800">Category</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="p-3 border-l border-gray-200 dark:border-gray-700 capitalize">{p.category}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-gray-500 bg-gray-50 dark:bg-gray-800">Rating</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="p-3 border-l border-gray-200 dark:border-gray-700 font-bold text-amber-500">★ {p.rating} ({p.reviewCount})</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-gray-500 bg-gray-50 dark:bg-gray-800">SKU / Code</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="p-3 border-l border-gray-200 dark:border-gray-700 font-mono text-[11px]">{p.sku}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-gray-500 bg-gray-50 dark:bg-gray-800">Stock Status</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="p-3 border-l border-gray-200 dark:border-gray-700">
                      <span className={`px-2 py-0.5 rounded-full font-bold ${p.stock > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                        {p.stock > 0 ? `In Stock (${p.stock})` : 'Out of Stock'}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
