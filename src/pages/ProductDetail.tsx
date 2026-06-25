import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products, Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { generateOrderPDF } from "../utils/pdfGenerator";
import { ArrowLeft, ChevronRight, Mail, ShoppingCart, X, CreditCard, FileText } from "lucide-react";

interface ProductDetailProps {
  onCartOpen?: () => void;
}

export default function ProductDetail({ onCartOpen }: ProductDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Carta di credito");
  const { items, addToCart, removeFromCart, getTotal } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = products.find((p) => p.id === id);
    if (found) {
      setProduct(found);
      setActiveIndex(0);
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const relatedProducts = products.filter((p) => p.id !== id).slice(0, 3);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  const handleDownloadPDF = async () => {
    if (items.length === 0) return;
    await generateOrderPDF(items, paymentMethod, getTotal());
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-sm text-gray-500">Caricamento...</p>
      </div>
    );
  }

  const specs = [
    ["Risoluzione", product.specifiche_base.Risoluzione],
    ["Pannello", product.specifiche_base.Pannello],
    ["Sistema Operativo", product.specifiche_base["Sistema Operativo"]],
    ["Processore", product.specifiche_avanzate.Processore],
    ["Refresh Rate", product.specifiche_avanzate["Refresh Rate"]],
    ["HDMI 2.1", product.specifiche_avanzate["HDMI 2.1"]],
    ["HDR", product.specifiche_avanzate["Tipo HDR"]],
    ["Luminosità picco", product.specifiche_avanzate["Luminosità Picco"]],
    ["Audio", product.specifiche_avanzate["Uscita Audio"]],
    ["Smart TV OS", product.specifiche_avanzate["Smart OS"]],
    ["Classe energetica", product.specifiche_avanzate["Classe Energetica"]],
  ];

  return (
    <div className="bg-white text-gray-900 pt-16 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <nav className="flex items-center gap-2 text-xs text-gray-500 py-4 mb-6">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span>Televisori</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900 font-medium truncate">{product.nome}</span>
        </nav>

        <Link 
          to="/" 
          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Torna alla home</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          
          {/* Main content */}
          <div>
            {/* Gallery + Info */}
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] gap-8 mb-12">
              
              {/* Image gallery */}
              <div className="flex flex-col-reverse sm:flex-row gap-3">
                {/* Thumbnails */}
                <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:max-h-[400px]">
                  {product.immagini.map((imgUrl, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`flex-shrink-0 w-16 h-16 sm:w-16 sm:h-16 border overflow-hidden ${
                        activeIndex === i 
                          ? "border-primary" 
                          : "border-gray-200 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img 
                        src={imgUrl} 
                        alt={`${product.nome} ${i + 1}`} 
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  ))}
                </div>

                {/* Main image */}
                <div className="flex-1 border border-gray-200 bg-gray-50 flex items-center justify-center">
                  <img 
                    src={product.immagini[activeIndex]} 
                    alt={product.nome}
                    className="w-full h-auto max-h-[400px] object-contain"
                  />
                </div>
              </div>

              {/* Product info */}
              <div className="flex flex-col">
                <span className="text-xs text-primary font-semibold uppercase tracking-wide mb-2">
                  {product.specifiche_base.Pannello}
                </span>
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                  {product.nome}
                </h1>

                <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-gray-200">
                  <span className="text-2xl font-bold text-gray-900">€{product.prezzo}</span>
                  <span className="text-sm text-gray-500">IVA inclusa</span>
                  <span className="ml-auto text-xs text-primary font-medium bg-primary-light px-2 py-1">
                    Pronta consegna 24/48h
                  </span>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {product.descrizione_breve}
                </p>

                {/* Key specs */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-5 text-sm">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Processore</span>
                    <span className="font-medium text-gray-900">{product.specifiche_avanzate.Processore}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Refresh Rate</span>
                    <span className="font-medium text-gray-900">{product.specifiche_avanzate["Refresh Rate"]}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">HDR</span>
                    <span className="font-medium text-gray-900">{product.specifiche_avanzate["Tipo HDR"]}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Audio</span>
                    <span className="font-medium text-gray-900">{product.specifiche_avanzate["Uscita Audio"]}</span>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 text-sm flex items-center justify-center gap-2 mt-3"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Aggiungi al carrello
                </button>

                <a
                  href={`mailto:info@fpsmart.it?subject=Preventivo ${product.nome}`}
                  className="block text-primary hover:text-primary text-sm text-center mt-3 cursor-pointer"
                >
                  Richiedi quotazione fornitura
                </a>

                <p className="text-xs text-gray-400 text-center mt-3">
                  Garanzia 24 mesi inclusa
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-12">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Descrizione</h2>
              <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                {product.descrizione_approfondita.split("\n\n").map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            {/* Full specs table */}
            <div className="mb-12">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Scheda tecnica completa</h2>
              <div className="border border-gray-200">
                <table className="w-full text-sm">
                  <tbody>
                    {specs.map(([label, value], i) => (
                      <tr key={i} className={i < specs.length - 1 ? "border-b border-gray-100" : ""}>
                        <td className="py-2.5 px-5 text-gray-500 w-1/2">{label}</td>
                        <td className={`py-2.5 px-5 text-right font-medium w-1/2 ${
                          label === "Classe energetica" ? "text-primary" : "text-gray-900"
                        }`}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CTA */}
            <div id="preventivo-veloce-sezione" className="bg-primary text-white p-6 sm:p-8 text-center max-w-7xl mx-auto mb-12">
              <Mail className="w-8 h-8 mx-auto mb-3" />
              <h3 className="text-lg font-bold mb-2">Richiedi preventivo per questo prodotto</h3>
              <p className="text-primary-100 text-sm mb-4">
                Scrivici per ricevere quotazioni riservate e disponibilità per il <strong>{product.nome}</strong>.
              </p>
              <a
                href={`mailto:info@fpsmart.it?subject=Preventivo ${product.nome}`}
                className="inline-block bg-white text-primary font-semibold px-6 py-3 text-sm"
              >
                info@fpsmart.it
              </a>
            </div>

            {/* Related Products */}
            <div className="mb-12">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Altri televisori che potrebbero interessarti</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((p) => (
                  <Link
                    key={p.id}
                    to={`/prodotto/${p.id}`}
                    className="border border-gray-200 p-4 hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={p.immagini[0]}
                      alt={p.nome}
                      className="w-full h-40 object-contain bg-gray-50 mb-3"
                    />
                    <span className="text-xs text-primary font-semibold uppercase">
                      {p.specifiche_base.Pannello}
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 mt-1 mb-2 line-clamp-2">
                      {p.nome}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                      {p.descrizione_breve}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">€{p.prezzo}</span>
                      <span className="text-xs text-primary">Vedi dettagli</span>
                    </div>
                  </Link>
                ))}
              </div>
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
