'use client';

import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCompare } from '@/lib/compare-context';
import { useCart } from '@/lib/cart-context';
import { useLanguage } from '@/lib/language-context';

export const CompareModal: React.FC = () => {
  const { items, removeFromCompare, clearCompare, isCompareModalOpen, setIsCompareModalOpen } =
    useCompare();
  const { addToCart } = useCart();
  const { language } = useLanguage();

  if (!isCompareModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-body">
      <div
        className="fixed inset-0 bg-patina-950/85 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCompareModalOpen(false)}
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-parchment-200 rounded-2xl max-w-4xl w-full border border-brass-600/40 shadow-2xl p-6 sm:p-8 overflow-hidden text-walnut-900">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-brass-600/30">
            <div>
              <h3 className="font-serif text-xl font-bold text-walnut-950">
                Comparative Examination of Works
              </h3>
              <p className="text-xs text-brass-700">
                Examining {items.length} of 3 vessels • Metallurgical purity, finish & anvil hours
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {items.length > 0 && (
                <button
                  onClick={clearCompare}
                  className="text-xs text-red-700 hover:underline flex items-center gap-1 font-serif"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear folio
                </button>
              )}
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="p-1 rounded-full text-walnut-800 hover:text-copper-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <p className="font-serif text-base text-walnut-950">No vessels selected for comparison.</p>
              <p className="text-xs text-walnut-700 max-w-sm mx-auto">
                Click the balance scale icon on any vessel card to examine up to three works side-by-side.
              </p>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="px-6 py-2 btn-atelier text-xs rounded-lg"
              >
                Browse the Collection
              </button>
            </div>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-body">
                <thead>
                  <tr className="border-b border-brass-600/30">
                    <th className="py-3 px-3 w-36 font-serif text-brass-800 bg-parchment-300">Feature</th>
                    {items.map((prod) => (
                      <th key={prod.id} className="py-3 px-4 min-w-[200px] align-top">
                        <div className="space-y-2 relative">
                          <button
                            onClick={() => removeFromCompare(prod.id)}
                            className="absolute -top-1 -right-1 text-red-700 hover:text-red-900"
                            title="Remove"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <img
                            src={prod.images[0]}
                            alt={prod.title}
                            className="w-24 h-24 object-cover rounded-xl border border-brass-600/30 mx-auto sepia-[0.1]"
                          />
                          <p className="font-serif font-bold text-xs line-clamp-2 text-center text-walnut-950">
                            {language === 'hi' ? prod.titleHi : prod.title}
                          </p>
                          <p className="text-center font-serif font-bold text-copper-700 text-sm">
                            ₹{prod.basePrice.toLocaleString('en-IN')}
                          </p>
                          <button
                            onClick={() => {
                              addToCart(prod, 1);
                              setIsCompareModalOpen(false);
                            }}
                            className="w-full py-1.5 px-3 rounded-lg btn-atelier text-[11px] flex items-center justify-center gap-1"
                          >
                            <ShoppingBag className="w-3 h-3 text-brass-300" />
                            Reserve
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-brass-600/20">
                  <tr>
                    <td className="py-2.5 px-3 font-serif font-bold text-brass-900 bg-parchment-300">Purity Grade</td>
                    {items.map((prod) => (
                      <td key={prod.id} className="py-2.5 px-4 font-semibold text-patina-800">
                        {prod.purityRating}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-serif font-bold text-brass-900 bg-parchment-300">Hammer Finish</td>
                    {items.map((prod) => (
                      <td key={prod.id} className="py-2.5 px-4 capitalize">
                        {prod.finish}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-serif font-bold text-brass-900 bg-parchment-300">Volume / Capacity</td>
                    {items.map((prod) => (
                      <td key={prod.id} className="py-2.5 px-4">
                        {prod.capacity || 'N/A'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-serif font-bold text-brass-900 bg-parchment-300">Weight</td>
                    {items.map((prod) => (
                      <td key={prod.id} className="py-2.5 px-4">
                        {prod.weightGrams} grams
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-serif font-bold text-brass-900 bg-parchment-300">Master Coppersmith</td>
                    {items.map((prod) => (
                      <td key={prod.id} className="py-2.5 px-4">
                        {prod.artisan.name} ({prod.village || 'Almora'})
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-serif font-bold text-brass-900 bg-parchment-300">Anvil Labor</td>
                    {items.map((prod) => (
                      <td key={prod.id} className="py-2.5 px-4">
                        {prod.hoursOfLabor ? `${prod.hoursOfLabor} Hours by Hand` : `${prod.makingTimeDays} Days`}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-serif font-bold text-brass-900 bg-parchment-300">
                      Culinary Suitability
                    </td>
                    {items.map((prod) => (
                      <td key={prod.id} className="py-2.5 px-4 text-copper-700">
                        {prod.categoryId === 'cookware' ? 'Food-Safe Tin Lined (Kalai)' : 'Pure Copper (Water & Dry)'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
