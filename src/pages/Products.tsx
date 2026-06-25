import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import type { PointerEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { products, Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { generateOrderPDF } from "../utils/pdfGenerator";
import { ArrowLeft, ChevronRight, ShoppingCart, X, CreditCard, FileText, Search, SlidersHorizontal } from "lucide-react";

const energyClasses = ["Tutte", "A+", "B", "F", "G"];
const panelTypes = ["Tutti", "Crystal UHD", "QLED Quantum Dot", "LED"];
const MIN_PRICE = 0;
const MAX_PRICE = 6000;

type SortOption = "default" | "price-asc" | "price-desc" | "energy";

interface ProductsProps {
  onCartOpen?: () => void;
}

export default function Products({ onCartOpen }: ProductsProps) {
  const [paymentMethod, setPaymentMethod] = useState("Carta di credito");
  const { items, addToCart, removeFromCart, getTotal } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [selectedEnergy, setSelectedEnergy] = useState("Tutte");
  const [selectedPanel, setSelectedPanel] = useState("Tutti");
  const [priceMin, setPriceMin] = useState(MIN_PRICE);
  const [priceMax, setPriceMax] = useState(MAX_PRICE);
  const [showFilters, setShowFilters] = useState(false);
  const [activeThumb, setActiveThumb] = useState<"min" | "max" | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getPercentFromValue = (value: number) => {
    return ((value - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
  };

  const getValueFromPosition = (clientX: number) => {
    if (!sliderRef.current) return 0;
    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const rawValue = MIN_PRICE + percent * (MAX_PRICE - MIN_PRICE);
    return Math.round(rawValue / 50) * 50;
  };

  const handlePointerDown = useCallback((thumb: "min" | "max") => (e: PointerEvent) => {
    e.preventDefault();
    setActiveThumb(thumb);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!activeThumb) return;
    const value = getValueFromPosition(e.clientX);
    if (activeThumb === "min") {
      setPriceMin(Math.min(value, priceMax - 50));
    } else {
      setPriceMax(Math.max(value, priceMin + 50));
    }
  }, [activeThumb, priceMin, priceMax]);

  const handlePointerUp = useCallback(() => {
    setActiveThumb(null);
  }, []);

  const handleMinInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || MIN_PRICE;
    setPriceMin(Math.max(MIN_PRICE, Math.min(val, priceMax - 50)));
  };

  const handleMaxInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || MAX_PRICE;
    setPriceMax(Math.min(MAX_PRICE, Math.max(val, priceMin + 50)));
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleDownloadPDF = async () => {
    if (items.length === 0) return;
    await generateOrderPDF(items, paymentMethod, getTotal());
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesSearch = p.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.descrizione_breve.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesEnergy = selectedEnergy === "Tutte" || p.specifiche_avanzate["Classe Energetica"] === selectedEnergy;
      const matchesPanel = selectedPanel === "Tutti" || p.specifiche_base.Pannello.includes(selectedPanel);
      const matchesPrice = p.prezzo >= priceMin && p.prezzo <= priceMax;
      return matchesSearch && matchesEnergy && matchesPanel && matchesPrice;
    });

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.prezzo - b.prezzo);
        break;
      case "price-desc":
        result.sort((a, b) => b.prezzo - a.prezzo);
        break;
      case "energy":
        result.sort((a, b) => a.specifiche_avanzate["Classe Energetica"].localeCompare(b.specifiche_avanzate["Classe Energetica"]));
        break;
    }

    return result;
  }, [searchQuery, sortBy, selectedEnergy, selectedPanel, priceMin, priceMax]);

  const minPercent = getPercentFromValue(priceMin);
  const maxPercent = getPercentFromValue(priceMax);

  return (
    <div className="bg-white text-gray-900 pt-16 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <nav className="flex items-center gap-2 text-xs text-gray-500 py-4 mb-6">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900 font-medium">Prodotti</span>
        </nav>

        <Link 
          to="/" 
          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Torna alla home</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          
          <div>
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Prodotti
              </h1>
              <p className="text-gray-500 text-sm mt-2">
                {filteredProducts.length} prodotti trovati
              </p>
            </div>

            {/* Search + Filters toggle */}
            <div className="mb-6 space-y-3">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cerca prodotto..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-gray-300 pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2.5 border text-sm font-medium ${showFilters ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filtri
                </button>
              </div>

              {showFilters && (
                <div className="border border-gray-200 p-4 space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Ordina per</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:border-primary"
                    >
                      <option value="default">Predefinito</option>
                      <option value="price-asc">Prezzo crescente</option>
                      <option value="price-desc">Prezzo decrescente</option>
                      <option value="energy">Classe energetica</option>
                    </select>
                  </div>

                  {/* Price range slider */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Fascia di prezzo</label>
                    
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">€</span>
                        <input
                          type="number"
                          value={priceMin}
                          onChange={handleMinInputChange}
                          min={MIN_PRICE}
                          max={priceMax - 50}
                          className="w-20 border border-gray-300 p-1.5 text-xs text-center focus:outline-none focus:border-primary"
                        />
                      </div>
                      <span className="text-xs text-gray-400">—</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">€</span>
                        <input
                          type="number"
                          value={priceMax}
                          onChange={handleMaxInputChange}
                          min={priceMin + 50}
                          max={MAX_PRICE}
                          className="w-20 border border-gray-300 p-1.5 text-xs text-center focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <div
                      ref={sliderRef}
                      className="relative h-6 cursor-pointer select-none"
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      onPointerLeave={handlePointerUp}
                    >
                      {/* Track */}
                      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 bg-gray-200" />
                      
                      {/* Active range */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-gray-900"
                        style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
                      />

                      {/* Min thumb */}
                      <div
                        onPointerDown={handlePointerDown("min")}
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white border-2 border-gray-900 cursor-grab active:cursor-grabbing z-10"
                        style={{ left: `${minPercent}%` }}
                      />

                      {/* Max thumb */}
                      <div
                        onPointerDown={handlePointerDown("max")}
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white border-2 border-gray-900 cursor-grab active:cursor-grabbing z-10"
                        style={{ left: `${maxPercent}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Classe energetica</label>
                    <div className="flex flex-wrap gap-2">
                      {energyClasses.map((cls) => (
                        <button
                          key={cls}
                          onClick={() => setSelectedEnergy(cls)}
                          className={`px-3 py-1.5 text-xs font-medium border ${selectedEnergy === cls ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"}`}
                        >
                          {cls}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Tipo pannello</label>
                    <div className="flex flex-wrap gap-2">
                      {panelTypes.map((panel) => (
                        <button
                          key={panel}
                          onClick={() => setSelectedPanel(panel)}
                          className={`px-3 py-1.5 text-xs font-medium border ${selectedPanel === panel ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"}`}
                        >
                          {panel}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Product list */}
            <div className="space-y-6">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Nessun prodotto trovato con i filtri selezionati.</p>
                </div>
              ) : (
                filteredProducts.map((tv) => (
                  <div 
                    key={tv.id}
                    className="bg-white border border-gray-200 overflow-hidden flex flex-col sm:flex-row"
                  >
                    
                    <div className="w-full sm:w-56 relative bg-gray-50 flex-shrink-0">
                      <Link to={`/prodotto/${tv.id}`}>
                        <img 
                          src={tv.immagini[0]} 
                          alt={tv.nome}
                          className="w-full h-full object-contain p-2"
                        />
                      </Link>
                    </div>

                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <span className="text-xs text-primary font-semibold uppercase">
                              {tv.specifiche_base.Pannello}
                            </span>
                            <Link to={`/prodotto/${tv.id}`}>
                              <h3 className="text-base font-bold text-gray-900 hover:text-primary">
                                {tv.nome}
                              </h3>
                            </Link>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="text-lg font-bold text-gray-900">€{tv.prezzo}</span>
                            <span className="text-xs text-gray-500 block">IVA inclusa</span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {tv.descrizione_breve}
                        </p>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs mb-3">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Risoluzione</span>
                            <span className="font-medium text-gray-900">{tv.specifiche_base.Risoluzione}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Pannello</span>
                            <span className="font-medium text-gray-900">{tv.specifiche_base.Pannello}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Energia</span>
                            <span className="font-medium text-gray-900">{tv.specifiche_avanzate["Classe Energetica"]}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Audio</span>
                            <span className="font-medium text-gray-900">{tv.specifiche_avanzate["Uscita Audio"]}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                        <Link
                          to={`/prodotto/${tv.id}`}
                          className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-4 py-2 text-xs"
                        >
                          Vedi scheda completa
                        </Link>
                        <button
                          onClick={() => handleAddToCart(tv)}
                          className="flex items-center gap-1 text-xs font-medium text-gray-900 hover:text-primary"
                        >
                          <ShoppingCart className="w-3 h-3" />
                          Aggiungi al carrello
                        </button>
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>
          </div>

          {/* Inline Cart Sidebar */}
          <div className="hidden lg:block">
            <div className="border border-gray-200 sticky top-24">
              <div className="bg-gray-50 border-b border-gray-200 p-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  <h2 className="text-base font-bold text-gray-900">Carrello</h2>
                </div>
              </div>

              <div className="p-4">
                {items.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Il carrello è vuoto</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.product.id} className="border border-gray-200 p-3">
                          <div className="flex gap-2">
                            <Link to={`/prodotto/${item.product.id}`}>
                              <img
                                src={item.product.immagini[0]}
                                alt={item.product.nome}
                                className="w-16 h-16 object-contain bg-gray-50 cursor-pointer hover:opacity-80"
                              />
                            </Link>
                            <div className="flex-1 min-w-0">
                              <Link to={`/prodotto/${item.product.id}`}>
                                <h3 className="text-xs font-semibold text-gray-900 line-clamp-2 hover:text-primary cursor-pointer">
                                  {item.product.nome}
                                </h3>
                              </Link>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {item.product.specifiche_base.Pannello}
                              </p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs font-bold text-gray-900">
                                  €{item.product.prezzo}
                                </span>
                                <span className="text-xs text-gray-500">
                                  Qtà: {item.quantita}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-gray-400 hover:text-red-500 flex-shrink-0"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-gray-600">Totale:</span>
                        <span className="text-lg font-bold text-gray-900">€{getTotal()}</span>
                      </div>

                      <div className="mb-3">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          <CreditCard className="w-3 h-3 inline mr-1" />
                          Metodo di pagamento
                        </label>
                        <select
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-full border border-gray-300 p-2 text-xs focus:outline-none focus:border-primary"
                        >
                          <option value="Carta di credito">Carta di credito</option>
                          <option value="Bonifico bancario">Bonifico bancario</option>
                          <option value="PayPal">PayPal</option>
                          <option value="Contrassegno">Contrassegno</option>
                        </select>
                      </div>

                      <button
                        onClick={handleDownloadPDF}
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2.5 text-xs flex items-center justify-center gap-2"
                      >
                        <FileText className="w-3 h-3" />
                        Scarica PDF Ordine
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile cart button */}
      {onCartOpen && (
        <button
          onClick={onCartOpen}
          className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center shadow-lg"
        >
          <ShoppingCart className="w-6 h-6" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center font-bold">
              {items.length}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
