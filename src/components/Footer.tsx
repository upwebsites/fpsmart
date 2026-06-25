import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId: string) => {
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
    <footer className="bg-gray-900 text-gray-400 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-800">
          
          <div className="md:col-span-1">
            <Link
              to="/"
              className="inline-block mb-3"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img 
                src="/images/FP%20Smart_testo.png" 
                alt="FPSMART" 
                className="h-6 w-auto brightness-0 invert opacity-80"
              />
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed">
              Partner leader nella distribuzione wholesale e retail di televisori e soluzioni smart.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Navigazione</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/prodotti" className="hover:text-white">
                  Prodotti
                </Link>
              </li>
              <li>
                <button onClick={() => handleNavClick("chi-siamo-sezione")} className="hover:text-white cursor-pointer">
                  Chi siamo
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("consegne-sezione")} className="hover:text-white cursor-pointer">
                  Logistica
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("recensioni-sezione")} className="hover:text-white cursor-pointer">
                  Recensioni
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Contatti</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Viale della Costituzione, Centro Direzionale, Isola G1, 80143, Napoli (NA)</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>392 291 2494</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@fpsmart.it</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Informazioni</h3>
            <ul className="space-y-2 text-sm">
              <li>P.IVA: 11001801213</li>
              <li>PEC: fpsmartsrl@pec.it</li>
              <li>Cap. sociale: 10.000,00</li>
            </ul>
            <div className="border-t border-gray-800 my-3"></div>
            <ul className="space-y-2 text-sm opacity-50">
              <li>Garanzia 24 mesi</li>
              <li>Distributore certificato Samsung</li>
            </ul>
          </div>

        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-3 md:space-y-0">
          <p>&copy; 2026 FPSMART s.r.l. Tutti i diritti riservati.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Cookie</a>
            <a href="#" className="hover:text-white">Termini</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
