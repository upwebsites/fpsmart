import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { products, Product } from "../data/products";
import FAQ from "../components/FAQ";
import { 
  ArrowRight, 
  ChevronRight, 
  Users, 
  ShieldCheck, 
  Truck, 
  Wrench, 
  Star, 
  Mail
} from "lucide-react";

function getRandomProducts(count: number): Product[] {
  const shuffled = [...products].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    setFeaturedProducts(getRandomProducts(2));
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white text-gray-900">
      
      {/* HERO SECTION */}
      <section id="hero-sezione" className="relative pt-28 md:pt-36 pb-20 overflow-hidden bg-gray-900">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left - Text */}
            <div>
              <div className="inline-block border border-white/30 px-3 py-1 mb-5">
                <span className="text-white/70 text-xs font-semibold uppercase tracking-wide">
                  Distributore ufficiale Italia
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl font-bold leading-[1.1] text-white mb-5">
                Il futuro della<br />visione.
              </h1>
              
              <p className="text-gray-400 text-base sm:text-lg max-w-md mb-10 leading-relaxed">
                Tecnologia avanzata, pannelli premium e soluzioni smart per wholesale e retail.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/prodotti"
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-7 py-3.5 text-sm cursor-pointer"
                >
                  <span>Esplora la gamma</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleScrollTo("contatti-sezione")}
                  className="flex items-center justify-center gap-2 border border-white/30 text-white font-medium px-7 py-3.5 text-sm cursor-pointer hover:bg-white/10"
                >
                  <span>Richiedi listino</span>
                </button>
              </div>
            </div>

            {/* Right - Product boxes */}
            <div className="relative hidden lg:grid grid-cols-2 grid-rows-2 gap-3 h-[420px]">
              
              {/* Big box - top left */}
              <Link
                to={`/prodotto/${products[0].id}`}
                className="row-span-2 bg-white p-6 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-primary text-xs font-semibold uppercase tracking-wider">Crystal UHD</span>
                  <h3 className="text-gray-900 text-3xl font-bold mt-1 leading-tight">98"</h3>
                  <p className="text-gray-500 text-sm mt-2">Il gigante della gamma Samsung</p>
                </div>
                <div>
                  <img 
                    src={products[0].immagini[0]} 
                    alt={products[0].nome}
                    className="w-full h-32 object-contain group-hover:scale-105 transition-transform"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-gray-900 font-bold text-lg">€{products[0].prezzo}</span>
                    <span className="text-gray-500 text-xs">IVA inclusa</span>
                  </div>
                </div>
              </Link>

              {/* Small box - top right */}
              <Link
                to={`/prodotto/${products[1].id}`}
                className="bg-white p-4 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-primary text-xs font-semibold uppercase tracking-wider">QLED</span>
                  <h3 className="text-gray-900 text-xl font-bold mt-1">65"</h3>
                  <p className="text-gray-500 text-xs mt-1">Quantum Dot</p>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-gray-900 font-bold">€{products[1].prezzo}</span>
                  <img 
                    src={products[1].immagini[0]} 
                    alt={products[1].nome}
                    className="w-16 h-16 object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
              </Link>

              {/* Small box - bottom right */}
              <Link
                to={`/prodotto/${products[3].id}`}
                className="bg-white p-4 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-primary text-xs font-semibold uppercase tracking-wider">LED 4K</span>
                  <h3 className="text-gray-900 text-xl font-bold mt-1">55"</h3>
                  <p className="text-gray-500 text-xs mt-1">Design piatto</p>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-gray-900 font-bold">€{products[3].prezzo}</span>
                  <img 
                    src={products[3].immagini[0]} 
                    alt={products[3].nome}
                    className="w-16 h-16 object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* CHI SIAMO */}
      <section id="chi-siamo-sezione" className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Chi siamo
              </h2>
              <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
                <p>
                  Nata come punto di riferimento nella fornitura wholesale di elettrodomestici per grandi catene e professionisti del settore, <strong>FPSMART</strong> si è evoluta posizionandosi come leader nei televisori ad alte prestazioni e nelle tecnologie intelligenti per la smart home.
                </p>
                <p>
                  Selezioniamo rigorosamente i migliori pannelli LCD, QLED e OLED, integrandoli con software proprietari di controllo per garantire ai partner commerciali una qualità d'immagine senza compromessi.
                </p>
                <p>
                  La nostra missione è unire la potenza della catena logistica wholesale a una cura maniacale per i dettagli, assistendo il cliente in ogni fase: dalla progettazione tecnica alla consegna express a domicilio.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-200 p-5 text-center">
                <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">+150K</p>
                <p className="text-xs text-gray-500 mt-1">Clienti soddisfatti</p>
              </div>
              <div className="border border-gray-200 p-5 text-center">
                <ShieldCheck className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">10+</p>
                <p className="text-xs text-gray-500 mt-1">Anni di esperienza</p>
              </div>
              <div className="border border-gray-200 p-5 text-center">
                <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">24/48h</p>
                <p className="text-xs text-gray-500 mt-1">Consegna express</p>
              </div>
              <div className="border border-gray-200 p-5 text-center">
                <Wrench className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">24 mesi</p>
                <p className="text-xs text-gray-500 mt-1">Garanzia ufficiale</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONSEGNE */}
      <section id="consegne-sezione" className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Logistica e servizi
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Rete logistica dedicata per la sicurezza dei vostri ordini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white border border-gray-200 p-6">
              <Truck className="w-5 h-5 text-primary mb-3" />
              <h3 className="text-sm font-bold text-gray-900 mb-2">Consegna express tracciata</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Spedizioni tramite corrieri specializzati in elettronica fragile. Tracking GPS attivo e aggiornamenti in tempo reale.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-6">
              <ShieldCheck className="w-5 h-5 text-primary mb-3" />
              <h3 className="text-sm font-bold text-gray-900 mb-2">Imballaggio speciale anti-urto</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Cartone corrugato rinforzato con angolari protettivi e film termo-retraibile impermeabile. Viaggio a prova di imprevisto.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-6">
              <Wrench className="w-5 h-5 text-primary mb-3" />
              <h3 className="text-sm font-bold text-gray-900 mb-2">Installazione a domicilio</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Montaggio a parete o tavolo gestito da tecnici certificati. Collaudo, sintonia canali e ritiro RAEE inclusi.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* RECENSIONI */}
      <section id="recensioni-sezione" className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Recensioni clienti
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              L'esperienza dei nostri partner commerciali con FPSMART.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white border border-gray-200 p-6">
              <div className="flex text-primary mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm font-semibold text-gray-900 mb-2">"Qualità eccezionale dei pannelli"</p>
              <p className="text-gray-500 text-xs leading-relaxed mb-4">
                Ho acquistato 25 televisori per il mio hotel a Milano. La fedeltà dei colori è superbi. Assistenza wholesale rapida ed impeccabile.
              </p>
              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-900">Alessandro Moretti</p>
                <p className="text-xs text-gray-500">Direttore, Grand Hotel Vision</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-6">
              <div className="flex text-primary mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm font-semibold text-gray-900 mb-2">"Imballaggio robusto e logistica sicura"</p>
              <p className="text-gray-500 text-xs leading-relaxed mb-4">
                Gestisco un e-commerce di elettronica. Da quando collaboro con FPSMART non abbiamo avuto contestazioni. Imballaggio impeccabile.
              </p>
              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-900">Valerio Bianchi</p>
                <p className="text-xs text-gray-500">Logistics Manager, TechZone.it</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-6">
              <div className="flex text-primary mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm font-semibold text-gray-900 mb-2">"Domotica integrata perfetta"</p>
              <p className="text-gray-500 text-xs leading-relaxed mb-4">
                Come architetto d'interni consiglio sempre i modelli da 75 pollici. Integrazione domotica eccellente e profili sottili.
              </p>
              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-900">Elena Castelli</p>
                <p className="text-xs text-gray-500">Interior Designer Studio Castelli</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* PRODOTTI (2 random) */}
      <section id="prodotti-sezione" className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              I nostri prodotti
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Gamma completa di Samsung per ogni esigenza. Scopri le schede tecniche.
            </p>
          </div>

          <div className="space-y-8">
            {featuredProducts.map((tv, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={tv.id}
                  className={`bg-white border border-gray-200 overflow-hidden flex flex-col ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  
                  <div className="w-full lg:w-2/5 relative bg-gray-100">
                    <img 
                      src={tv.immagini[0]} 
                      alt={tv.nome}
                      className="w-full h-full object-cover aspect-[16/10]"
                    />
                    <div className="absolute bottom-3 left-3 bg-gray-900 text-white text-sm font-bold px-3 py-1.5">
                      €{tv.prezzo} <span className="text-xs font-normal text-gray-400">iva inclusa</span>
                    </div>
                  </div>

                  <div className="w-full lg:w-3/5 p-6 flex flex-col justify-between">
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-gray-900">
                        {tv.nome}
                      </h3>

                      <p className="text-gray-600 text-sm">
                        {tv.descrizione_breve}
                      </p>

                      <table className="w-full text-xs mt-3">
                        <tbody>
                          <tr className="border-b border-gray-100">
                            <td className="py-1.5 text-gray-500">Risoluzione</td>
                            <td className="py-1.5 text-gray-900 text-right font-medium">{tv.specifiche_base.Risoluzione}</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-1.5 text-gray-500">Pannello</td>
                            <td className="py-1.5 text-gray-900 text-right font-medium">{tv.specifiche_base.Pannello}</td>
                          </tr>
                          <tr>
                            <td className="py-1.5 text-gray-500">Sistema operativo</td>
                            <td className="py-1.5 text-gray-900 text-right font-medium">{tv.specifiche_base["Sistema Operativo"]}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="pt-4 mt-4 border-t border-gray-100">
                      <Link
                        to={`/prodotto/${tv.id}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary"
                      >
                        <span>Scheda tecnica completa</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/prodotti"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 text-sm"
            >
              <span>Vedi tutti i prodotti</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* CONTATTI */}
      <section id="contatti-sezione" className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-primary text-white p-6 sm:p-8 text-center max-w-2xl mx-auto">
            <Mail className="w-8 h-8 mx-auto mb-3" />
            <h3 className="text-lg font-bold mb-2">Contattaci per informazioni e preventivi</h3>
            <p className="text-primary-100 text-sm mb-4">
              Scrivici per ricevere il listino riservato, supporto tecnico o qualsiasi altra informazione.
            </p>
            <a
              href="mailto:info@fpsmart.it"
              className="inline-block bg-white text-primary font-semibold px-6 py-3 text-sm"
            >
              info@fpsmart.it
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
