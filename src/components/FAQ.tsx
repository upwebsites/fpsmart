import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "Qual è la copertura della garanzia?",
      answer: "Tutti i televisori FPSMART godono di una garanzia ufficiale italiana di 24 mesi. Per i partner wholesale, offriamo un servizio di garanzia on-site esclusivo con intervento entro 48 ore."
    },
    {
      id: 2,
      question: "Come accedo ai prezzi all'ingrosso?",
      answer: "Compilare il modulo di contatto indicando la Partita IVA e una stima del volume d'acquisto annuo. Il team commerciale assegnerà un Account Manager dedicato entro 2 ore."
    },
    {
      id: 3,
      question: "Offrite supporto per l'integrazione domotica?",
      answer: "Sì, supportiamo KNX, Control4, Crestron, Alexa e Google Home. Supporto telefonico e via ticket gratuito per installatori partner."
    },
    {
      id: 4,
      question: "La garanzia copre i danni da trasporto?",
      answer: "Sì, tutte le spedizioni sono assicurate al 100%. In caso di anomalie visibili, firmare con 'Riserva di Controllo' e segnalare al proprio Account Manager."
    },
    {
      id: 5,
      question: "Quali sono i minimi d'ordine per la spedizione gratuita?",
      answer: "Spedizione gratuita per ordini superiori a 3 unità. Per ordini singoli si applica una tariffa agevolata con imballaggio speciale rinforzato."
    },
    {
      id: 6,
      question: "Supportano gli aggiornamenti software OTA?",
      answer: "Sì, tutti i smart TV ricevono aggiornamenti OTA automatici gratuiti a vita per sicurezza, applicazioni e compatibilità IoT."
    }
  ];

  return (
    <section id="faq-sezione" className="py-20 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Domande frequenti
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Garanzie, condizioni wholesale e specifiche tecniche.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 order-1">
            <div className="space-y-2">
              {faqItems.map((item, index) => {
                const isOpen = activeIndex === index;
                return (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200"
                  >
                    <button
                      onClick={() => setActiveIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-4 text-left focus:outline-none hover:bg-gray-50"
                    >
                      <span className="text-sm font-medium text-gray-900 pr-4">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 flex-shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-1 order-2">
            <div className="bg-primary text-white p-5 text-center h-full flex flex-col justify-center lg:sticky lg:top-28">
              <h4 className="font-semibold text-sm mb-1">Hai domande tecniche specifiche?</h4>
              <p className="text-primary-100 text-xs mb-3">
                I nostri tecnici sono pronti ad assisterti.
              </p>
              <a
                href="mailto:info@fpsmart.it"
                className="inline-block bg-white text-primary font-semibold text-xs py-2 px-5"
              >
                info@fpsmart.it
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
