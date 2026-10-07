import React, { useState } from 'react';
import { ProductItem, TicketItem } from '../../types';

interface CatalogScreenProps {
  products: ProductItem[];
  ticket: TicketItem[];
  onAddToCart: (product: ProductItem) => void;
  onOpenCartModal: () => void;
  onFilterByCategory?: (category: string) => void;
  onShowToast: (message: string) => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({
  products,
  ticket,
  onAddToCart,
  onOpenCartModal,
  onShowToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    'prod-1': true
  });
  const [addedItemEffect, setAddedItemEffect] = useState<string | null>(null);

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'skincare', label: 'Skincare' },
    { id: 'maquillaje', label: 'Maquillaje' },
    { id: 'labios', label: 'Labios' },
    { id: 'ojos', label: 'Ojos' },
    { id: 'capilar', label: 'Cuidado Capilar' },
    { id: 'oferta', label: 'En Oferta', isOffer: true }
  ];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedCategory === 'todos') return true;
    if (selectedCategory === 'oferta') return Boolean(p.discountBadge || p.urgentStock);
    return p.category === selectedCategory;
  });

  const cartCount = ticket.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = ticket.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const formatCOP = (val: number) => {
    return '$' + val.toLocaleString('es-CO') + ' COP';
  };

  const handleToggleFavorite = (id: string, name: string) => {
    setFavorites((prev) => {
      const next = !prev[id];
      onShowToast(next ? `Guardado en favoritos: ${name}` : `Removido de favoritos: ${name}`);
      return { ...prev, [id]: next };
    });
  };

  const handleAddWithFeedback = (product: ProductItem) => {
    onAddToCart(product);
    setAddedItemEffect(product.id);
    onShowToast(`¡Añadido! ${product.name}`);
    setTimeout(() => {
      setAddedItemEffect(null);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto pb-24">
      {/* Search & Search Utilities */}
      <section className="px-4 pt-3 pb-1">
        <div className="relative flex items-center w-full">
          <span className="material-symbols-outlined absolute left-3.5 text-[#574144] text-[22px] pointer-events-none">
            search
          </span>
          <input
            className="w-full h-12 pl-11 pr-11 bg-[#f0f3ff] text-[#111c2d] placeholder-[#574144]/70 text-[14px] rounded-2xl outline-none shadow-xs border border-[#dee8ff] transition-all focus:bg-white focus:ring-2 focus:ring-[#a72e4b]"
            id="catalogSearch"
            placeholder="Buscar labiales, bases, serums, marcas..."
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={() => onShowToast('Filtros avanzados: Por precio, tono y textura')}
            aria-label="Abrir filtros avanzados"
            className="absolute right-2.5 w-8 h-8 rounded-xl flex items-center justify-center bg-[#dee8ff] text-[#a72e4b] hover:bg-[#ffd9dd] transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </div>
      </section>

      {/* Filter Category Chips */}
      <nav aria-label="Categorías de productos" className="w-full overflow-x-auto py-2.5 pl-4 no-scrollbar">
        <div className="flex items-center gap-1.5 pr-4">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-[12px] font-bold transition-all whitespace-nowrap shadow-xs ${
                  isSelected
                    ? 'bg-[#a72e4b] text-white shadow-sm'
                    : 'bg-white text-[#574144] hover:bg-[#ffd9dd]/40 border border-[#dee8ff]'
                } ${cat.isOffer ? 'flex items-center gap-1 text-[#a72e4b]' : ''}`}
                type="button"
              >
                {cat.isOffer && (
                  <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                )}
                {cat.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Promotional Hero Banner */}
      <section className="px-4 my-1">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#c74763] via-[#a72e4b] to-[#fe932c] text-white p-4 sm:p-5 shadow-[0_8px_24px_-6px_rgba(167,46,75,0.32)]">
          {/* Decorative Backdrop Glow Elements */}
          <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/15 blur-2xl pointer-events-none"></div>
          <div className="absolute right-4 bottom-2 w-24 h-24 rounded-full bg-[#ffdcc3]/20 blur-xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-start max-w-[80%]">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md mb-2">
              <span
                className="material-symbols-outlined text-[14px] text-[#ffdcc3]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              <span className="text-[10px] tracking-wider uppercase text-white font-bold">
                Exclusivo 2026
              </span>
            </div>
            <h2 className="text-[20px] sm:text-[22px] font-bold leading-tight text-white mb-1">
              Colección Radiance
            </h2>
            <p className="text-[12px] text-white/90 mb-3.5 leading-snug">
              20% OFF en Skincare importado de alta pureza y activos botánicos.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('skincare');
                onShowToast('Explorando Colección Radiance: Skincare Botánico');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#a72e4b] text-[12px] font-bold shadow-md active:scale-95 transition-transform"
              type="button"
            >
              <span>Explorar Colección</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div className="absolute right-2 bottom-2 w-28 h-28 pointer-events-none flex items-center justify-center">
            <span
              className="material-symbols-outlined text-[80px] text-white/20"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              spa
            </span>
          </div>
        </div>
      </section>

      {/* Section Title & Stock City Badge */}
      <section className="px-4 pt-3 pb-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-[17px] font-bold text-[#111c2d]">Productos Destacados</h3>
          <span className="px-2 py-0.5 rounded-full bg-[#ffd9dd] text-[#8a1737] text-[10px] font-bold">
            {filteredProducts.length}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[#574144] text-[11px] font-semibold">
          <span className="material-symbols-outlined text-[15px] text-[#006947]">store</span>
          <span>Neiva Centro</span>
        </div>
      </section>

      {/* 2-Column Catalog Grid */}
      <section className="px-3 sm:px-4 pt-1 pb-4">
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {filteredProducts.map((product) => {
            const isFav = !!favorites[product.id];
            const isAdded = addedItemEffect === product.id;

            return (
              <article
                key={product.id}
                className="bg-white rounded-2xl p-2.5 flex flex-col justify-between shadow-[0_4px_18px_-2px_rgba(167,46,75,0.06),0_2px_6px_-1px_rgba(17,28,45,0.04)] border border-[#dee8ff]/60 relative transition-all hover:shadow-md"
              >
                {/* Favorite Heart Button */}
                <button
                  onClick={() => handleToggleFavorite(product.id, product.name)}
                  aria-label="Guardar en favoritos"
                  className={`absolute top-4 right-4 z-10 w-7 h-7 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center active:scale-90 transition-all shadow-sm ${
                    isFav ? 'text-[#a72e4b]' : 'text-[#574144] hover:text-[#a72e4b]'
                  }`}
                  type="button"
                >
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={isFav ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    favorite
                  </span>
                </button>

                <div>
                  {/* Image Viewport */}
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#f0f3ff] mb-2.5 border border-[#dee8ff]/40">
                    <img
                      className="w-full h-full object-cover"
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                    />

                    {/* Discount badge or swatch */}
                    {product.discountBadge && (
                      <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-[#a72e4b] text-white text-[10px] font-bold">
                        {product.discountBadge}
                      </span>
                    )}

                    {product.swatchColor && (
                      <span
                        className="absolute top-2 left-2 w-3.5 h-3.5 rounded-full ring-2 ring-white shadow-sm"
                        style={{ backgroundColor: product.swatchColor }}
                        title={`Tono ${product.variant}`}
                      ></span>
                    )}

                    {product.urgentStock && (
                      <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-[#904d00] text-white text-[10px] font-bold flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">whatshot</span>
                        Agotándose
                      </span>
                    )}
                  </div>

                  {/* Stock Pill */}
                  <div className="mb-1">
                    {product.urgentStock ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdcc3] text-[#6e3900] text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#904d00] animate-pulse"></span>
                        Últimas {product.stockSede} uds
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#006947]/10 text-[#006947] text-[10px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#006947]"></span>
                        Sede Neiva: {product.stockSede} uds
                      </span>
                    )}
                  </div>

                  {/* Brand & Name */}
                  <span className="block text-[10px] font-bold text-[#574144] uppercase tracking-wider">
                    {product.brand}
                  </span>
                  <h4 className="text-[13px] font-bold text-[#111c2d] line-clamp-2 leading-tight min-h-[34px] mt-0.5">
                    {product.name}
                  </h4>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-1">
                    <span
                      className="material-symbols-outlined text-[14px] text-[#fe932c]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="text-[11px] text-[#111c2d] font-bold">{product.rating}</span>
                    <span className="text-[10px] text-[#574144]">({product.reviewsCount})</span>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="mt-2.5 pt-2 flex flex-col gap-1.5">
                  <div className="flex flex-col">
                    {product.originalPrice ? (
                      <span className="text-[11px] text-[#574144]/70 line-through leading-none">
                        ${product.originalPrice.toLocaleString('es-CO')}
                      </span>
                    ) : (
                      <span className="text-[11px] opacity-0 leading-none">-</span>
                    )}
                    <span className="text-[16px] text-[#a72e4b] font-bold leading-tight">
                      ${product.price.toLocaleString('es-CO')}{' '}
                      <span className="text-[10px] font-normal text-[#574144]">COP</span>
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddWithFeedback(product)}
                    className={`w-full h-9 rounded-full text-[12px] font-bold flex items-center justify-center gap-1 active:scale-95 transition-all shadow-sm ${
                      isAdded
                        ? 'bg-[#006947] text-white'
                        : 'bg-[#a72e4b] text-white hover:bg-[#c74763]'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isAdded ? 'check' : 'add_shopping_cart'}
                    </span>
                    <span>{isAdded ? '¡Listo!' : 'Añadir'}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Floating Quick Cart Mini-Bar */}
      {cartCount > 0 && (
        <aside className="fixed bottom-20 inset-x-0 z-40 px-3 sm:px-4 max-w-xl mx-auto pointer-events-none">
          <div className="pointer-events-auto w-full bg-[#263143]/95 backdrop-blur-xl text-white rounded-2xl p-2.5 px-3.5 shadow-[0_12px_32px_-4px_rgba(17,28,45,0.35)] flex items-center justify-between border border-white/10 transition-all">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative flex-shrink-0 w-9 h-9 rounded-xl bg-[#a72e4b] flex items-center justify-center text-white shadow-sm">
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#fe932c] text-[#2f1500] text-[9px] flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[12px] font-bold text-white truncate">
                  {cartCount} {cartCount === 1 ? 'producto' : 'productos'} en tu canasta
                </span>
                <span className="text-[11px] text-[#cfdaf2]">
                  Total: <span className="font-bold text-white">{formatCOP(cartTotal)}</span>
                </span>
              </div>
            </div>

            <button
              onClick={onOpenCartModal}
              className="flex-shrink-0 h-9 px-3.5 rounded-full bg-[#a72e4b] text-white text-[12px] font-bold flex items-center gap-1 shadow-md hover:bg-[#c74763] active:scale-95 transition-all"
              type="button"
            >
              <span>Ver Pedido</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};
