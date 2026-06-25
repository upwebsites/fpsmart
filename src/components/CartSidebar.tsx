import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { generateOrderPDF } from "../utils/pdfGenerator";
import { X, ShoppingCart, CreditCard, FileText } from "lucide-react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, removeFromCart, getTotal } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("Carta di credito");
  const navigate = useNavigate();

  const handleDownloadPDF = async () => {
    if (items.length === 0) return;
    await generateOrderPDF(items, paymentMethod, getTotal());
  };

  const handleNavigate = (productId: string) => {
    onClose();
    navigate(`/prodotto/${productId}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white h-full shadow-xl overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-gray-900">Carrello</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Il carrello è vuoto</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="border border-gray-200 p-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleNavigate(item.product.id)}
                        className="flex-shrink-0"
                      >
                        <img
                          src={item.product.immagini[0]}
                          alt={item.product.nome}
                          className="w-20 h-20 object-contain bg-gray-50 cursor-pointer hover:opacity-80"
                        />
                      </button>
                      <div className="flex-1">
                        <button
                          onClick={() => handleNavigate(item.product.id)}
                          className="text-left"
                        >
                          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-primary cursor-pointer">
                            {item.product.nome}
                          </h3>
                        </button>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.product.specifiche_base.Pannello}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-bold text-gray-900">
                            €{item.product.prezzo}
                          </span>
                          <span className="text-xs text-gray-500">
                            Qtà: {item.quantita}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Totale:</span>
                  <span className="text-xl font-bold text-gray-900">€{getTotal()}</span>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CreditCard className="w-4 h-4 inline mr-1" />
                    Metodo di pagamento
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="Carta di credito">Carta di credito</option>
                    <option value="Bonifico bancario">Bonifico bancario</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Contrassegno">Contrassegno</option>
                  </select>
                </div>

                <button
                  onClick={handleDownloadPDF}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 text-sm flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Scarica PDF Ordine
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
