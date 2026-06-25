import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, PhoneCall, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

interface NavbarProps {
  onCartOpen?: () => void;
}

export default function Navbar({ onCartOpen }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useCart();

  const isShopPage = location.pathname === "/prodotti" || location.pathname.startsWith("/prodotto/");

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 border-b ${isShopPage ? "bg-primary border-primary" : "bg-white border-gray-200"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          <Link
            to="/"
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {isShopPage ? (
              <img 
                src="/images/fpsmartecommerce.png" 
                alt="FPSMART" 
                className="h-6 w-auto"
              />
            ) : (
              <img 
                src="/images/FP%20Smart_testo.png" 
                alt="FPSMART" 
                className="h-6 w-auto"
              />
            )}
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/prodotti"
              className={`font-medium text-sm ${isShopPage ? "text-white/80 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
            >
              Prodotti
            </Link>
            <button
              onClick={() => handleNavClick("chi-siamo-sezione")}
              className={`font-medium text-sm cursor-pointer ${isShopPage ? "text-white/80 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
            >
              Chi siamo
            </button>
            <button
              onClick={() => handleNavClick("consegne-sezione")}
              className={`font-medium text-sm cursor-pointer ${isShopPage ? "text-white/80 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
            >
              Logistica
            </button>
            <button
              onClick={() => handleNavClick("recensioni-sezione")}
              className={`font-medium text-sm cursor-pointer ${isShopPage ? "text-white/80 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
            >
              Recensioni
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {location.pathname === "/" && (
              <button
                onClick={onCartOpen}
                className="relative p-2 text-gray-600 hover:text-gray-900"
              >
                <ShoppingCart className="w-5 h-5" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </button>
            )}
            <button
              onClick={() => handleNavClick("contatti-sezione")}
              className={`flex items-center gap-2 font-medium px-4 py-2 text-sm cursor-pointer ${isShopPage ? "bg-white text-primary hover:bg-white/90" : "bg-primary hover:bg-primary-hover text-white"}`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Contattaci</span>
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            {location.pathname === "/" && (
              <button
                onClick={onCartOpen}
                className="relative p-2 text-gray-500 hover:text-gray-900"
              >
                <ShoppingCart className="w-5 h-5" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 ${isShopPage ? "text-white hover:text-white/80" : "text-gray-500 hover:text-gray-900"}`}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {isOpen && (
        <div className={`md:hidden border-b ${isShopPage ? "bg-primary border-primary" : "bg-white border-gray-200"}`}>
          <div className="px-4 py-3 space-y-1">
            <Link 
              to="/prodotti" 
              onClick={() => setIsOpen(false)}
              className={`block w-full text-left px-3 py-2 text-sm font-medium ${isShopPage ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-50"}`}
            >
              Prodotti
            </Link>
            <button onClick={() => handleNavClick("chi-siamo-sezione")} className={`block w-full text-left px-3 py-2 text-sm font-medium ${isShopPage ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-50"}`}>
              Chi siamo
            </button>
            <button onClick={() => handleNavClick("consegne-sezione")} className={`block w-full text-left px-3 py-2 text-sm font-medium ${isShopPage ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-50"}`}>
              Logistica
            </button>
            <button onClick={() => handleNavClick("recensioni-sezione")} className={`block w-full text-left px-3 py-2 text-sm font-medium ${isShopPage ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-50"}`}>
              Recensioni
            </button>
            <div className={`pt-2 ${isShopPage ? "border-t border-white/20" : "border-t border-gray-100"}`}>
              <button
                onClick={() => handleNavClick("contatti-sezione")}
                className={`w-full flex items-center justify-center gap-2 font-medium py-2 text-sm ${isShopPage ? "bg-white text-primary hover:bg-white/90" : "bg-primary hover:bg-primary-hover text-white"}`}
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Contattaci</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
