export interface BaseSpecs {
  Risoluzione: string;
  Pannello: string;
  "Sistema Operativo": string;
}

export interface AdvancedSpecs {
  "Refresh Rate": string;
  "HDMI 2.1": string;
  "Tipo HDR": string;
  "Uscita Audio": string;
  "Smart OS": string;
  "Processore": string;
  "Classe Energetica": string;
  "Luminosità Picco": string;
}

export interface Product {
  id: string;
  nome: string;
  prezzo: number;
  descrizione_breve: string;
  descrizione_approfondita: string;
  specifiche_base: BaseSpecs;
  specifiche_avanzate: AdvancedSpecs;
  immagini: string[];
}

const encodePath = (p: string) => encodeURI(p);

export const products: Product[] = [
  {
    id: "samsung-ue98du9072uxxh",
    nome: "Samsung UE98DU9072UXXH",
    prezzo: 5999,
    descrizione_breve: "Immersione totale con 98 pollici di display Crystal UHD. Il gigante della gamma per un'esperienza cinema a casa.",
    descrizione_approfondita: "Il Samsung UE98DU9072UXXH è un televisore monumentale da 98 pollici che ridefinisce il concetto di intrattenimento domestico. Il pannello Crystal UHD offra una risoluzione 4K Ultra HD con colori vividi e dettagli nitidi anche sullo schermo più grande della gamma Samsung consumer.\n\nIl processore Crystal 4K analizza e ottimizza ogni scena in tempo reale, migliorando la risoluzione, il contrasto e i colori. Il design AirSlim con profilo ultrasottile si integra elegantly in salotti e sale cinema domestiche, mentre il sistema Tizen Smart TV garantisce accesso istantaneo a tutti i principali servizi di streaming.",
    specifiche_base: {
      Risoluzione: "Ultra HD 4K (3840 x 2160)",
      Pannello: "Crystal UHD",
      "Sistema Operativo": "Tizen OS"
    },
    specifiche_avanzate: {
      "Refresh Rate": "60 Hz (Motion Xcelerator)",
      "HDMI 2.1": "4x Porte HDMI (eARC support)",
      "Tipo HDR": "HDR10+, HLG",
      "Uscita Audio": "60W (2.2.2 canali)",
      "Smart OS": "Samsung Tizen Smart TV",
      "Processore": "Crystal 4K",
      "Classe Energetica": "G",
      "Luminosità Picco": "500 nits"
    },
    immagini: [
      `/images/${encodePath("Samsung UE98DU9072UXXH - 1041")}/1.webp`,
      `/images/${encodePath("Samsung UE98DU9072UXXH - 1041")}/2.webp`,
      `/images/${encodePath("Samsung UE98DU9072UXXH - 1041")}/3.webp`,
      `/images/${encodePath("Samsung UE98DU9072UXXH - 1041")}/4.webp`,
      `/images/${encodePath("Samsung UE98DU9072UXXH - 1041")}/5.webp`,
      `/images/${encodePath("Samsung UE98DU9072UXXH - 1041")}/7.webp`
    ]
  },
  {
    id: "samsung-qe65q8faauxxh",
    nome: "Samsung QE65Q8FAAUXXH",
    prezzo: 1899,
    descrizione_breve: "Pannello QLED 65\" con Quantum Dot per colori straordinari e luminosità elevata in ogni ambiente.",
    descrizione_approfondita: "Il Samsung QE65Q8FAAUXXH è un televisore QLED da 65 pollici che combina la tecnologia Quantum Dot con un'ottima luminosità per un'esperienza visiva coinvolgente. I miliardi di sfumature cromatiche garantite dai nanocristalli Quantum Dot rendono ogni immagine vivida e fedele alla realtà.\n\nIl design senza cornice (Near Infinity Screen) amplifica l'immersione visiva, mentre il processore Quantum Lite optimizza automaticamente contrasto, luminosità e colori. Supporta HDR10+ per una resa video di alta qualità in tutti i contenuti compatibili.",
    specifiche_base: {
      Risoluzione: "Ultra HD 4K (3840 x 2160)",
      Pannello: "QLED Quantum Dot",
      "Sistema Operativo": "Tizen OS"
    },
    specifiche_avanzate: {
      "Refresh Rate": "120 Hz",
      "HDMI 2.1": "4x Porte HDMI (eARC, VRR, ALLM)",
      "Tipo HDR": "HDR10+, HLG, Quantum HDR+",
      "Uscita Audio": "40W (2.1 canali)",
      "Smart OS": "Samsung Tizen Smart TV",
      "Processore": "Quantum Lite 4K",
      "Classe Energetica": "F",
      "Luminosità Picco": "1000 nits"
    },
    immagini: [
      `/images/${encodePath("Samsung QE65Q8FAAUXXH - 416")}/1.jpeg`,
      `/images/${encodePath("Samsung QE65Q8FAAUXXH - 416")}/2.jpeg`,
      `/images/${encodePath("Samsung QE65Q8FAAUXXH - 416")}/3.jpeg`,
      `/images/${encodePath("Samsung QE65Q8FAAUXXH - 416")}/4.jpeg`,
      `/images/${encodePath("Samsung QE65Q8FAAUXXH - 416")}/5.jpeg`,
      `/images/${encodePath("Samsung QE65Q8FAAUXXH - 416")}/6.jpeg`
    ]
  },
  {
    id: "samsung-ue75u8072fuxxh",
    nome: "Samsung UE75U8072FUXXH",
    prezzo: 1599,
    descrizione_breve: "Display Crystal UHD da 75\" con pannello PurColor e processore Crystal 4K per un'esperienza immersiva.",
    descrizione_approfondita: "Il Samsung UE75U8072FUXXH è un televisore Crystal UHD da 75 pollici che offre un'eccellente qualità d'immagine grazie alla tecnologia PurColor, in grado di riprodurre milioni di tonalità per una resa cromatica naturale e avvolgente.\n\nIl processore Crystal 4K lavora in tempo reale per ridurre il rumore digitale e migliorare i dettagli, trasformando anche i contenuti in risoluzione inferiore in un'esperienza prossima alla 4K. Il design slim e leggero si adatta facilmente a qualsiasi ambiente, mentre il sistema Tizen Smart TV fornisce un'interfaccia intuitiva e veloce per tutti i servizi di streaming.",
    specifiche_base: {
      Risoluzione: "Ultra HD 4K (3840 x 2160)",
      Pannello: "Crystal UHD PurColor",
      "Sistema Operativo": "Tizen OS"
    },
    specifiche_avanzate: {
      "Refresh Rate": "60 Hz (Motion Xcelerator)",
      "HDMI 2.1": "3x Porte HDMI (eARC support)",
      "Tipo HDR": "HDR10, HLG",
      "Uscita Audio": "30W (2.0 canali)",
      "Smart OS": "Samsung Tizen Smart TV",
      "Processore": "Crystal 4K",
      "Classe Energetica": "G",
      "Luminosità Picco": "400 nits"
    },
    immagini: [
      `/images/${encodePath("Samsung UE75U8072FUXXH - 420")}/1.jpeg`,
      `/images/${encodePath("Samsung UE75U8072FUXXH - 420")}/2.jpeg`,
      `/images/${encodePath("Samsung UE75U8072FUXXH - 420")}/3.jpeg`,
      `/images/${encodePath("Samsung UE75U8072FUXXH - 420")}/4.jpeg`,
      `/images/${encodePath("Samsung UE75U8072FUXXH - 420")}/5.jpeg`,
      `/images/${encodePath("Samsung UE75U8072FUXXH - 420")}/6.jpeg`
    ]
  },
  {
    id: "samsung-ue55u8092fuxxh",
    nome: "Samsung UE55U8092FUXXH",
    prezzo: 799,
    descrizione_breve: "LED 55\" 4K Ultra HD con Tizen, Motion Xcelerator, supporto HDR10 e design piatto elegante.",
    descrizione_approfondita: "Il Samsung UE55U8092FU è un televisore LED da 55 pollici con risoluzione 4K Ultra HD di 3840 x 2160 pixel, progettato per offrire immagini di alta qualità con dettagli nitidi e colori vividi. La tecnologia LED garantisce un'illuminazione uniforme e un contrasto elevato, mentre la modalità Filmmaker e il supporto HDR10 assicurano una riproduzione fedele dei contenuti con un'ampia gamma dinamica e colori realistici.\n\nQuesto modello integra funzionalità Smart TV basate sul sistema operativo Tizen, che permette l'accesso a numerose app di streaming, navigazione web tramite browser e servizi online. La connettività è completa con 3 porte HDMI dotate di canale di ritorno audio avanzato (eARC) e Audio Return Channel (ARC), una porta USB 2.0, ingresso antenna per DVB-T2, DVB-C e DVB-S2, oltre a connessioni Wi-Fi e Ethernet LAN per una rete stabile e veloce.\n\nL'audio è gestito da un sistema a 2.0 canali con potenza di uscita di 20 W, supportando il suono adattivo per un'esperienza audio ottimale in base all'ambiente. Il televisore supporta inoltre tecnologie di interpolazione del movimento come Motion Xcelerator, Auto Low Latency Mode (ALLM), HGiG e Variable Refresh Rate (VRR) per immagini fluide e senza sfocature durante scene dinamiche o giochi.\n\nIl Samsung UE55U8092FU combina tecnologia avanzata e design moderno per un'esperienza visiva e sonora completa, ideale per l'intrattenimento domestico di alta qualità. Il consumo energetico contenuto e la classe B assicurano un utilizzo efficiente e responsabile. Garanzia produttore 24 mesi.",
    specifiche_base: {
      Risoluzione: "Ultra HD 4K (3840 x 2160)",
      Pannello: "Crystal UHD",
      "Sistema Operativo": "Tizen OS"
    },
    specifiche_avanzate: {
      "Refresh Rate": "60 Hz",
      "HDMI 2.1": "3x Porte HDMI (eARC support)",
      "Tipo HDR": "HDR10, HLG",
      "Uscita Audio": "20W (2.0 canali)",
      "Smart OS": "Samsung Tizen Smart TV",
      "Processore": "Crystal 4K",
      "Classe Energetica": "G",
      "Luminosità Picco": "350 nits"
    },
    immagini: [
      `/images/${encodePath("Samsung UE55U8092FUXXH - 231")}/1.jpeg`,
      `/images/${encodePath("Samsung UE55U8092FUXXH - 231")}/2.jpeg`,
      `/images/${encodePath("Samsung UE55U8092FUXXH - 231")}/3.jpeg`,
      `/images/${encodePath("Samsung UE55U8092FUXXH - 231")}/4.jpeg`,
      `/images/${encodePath("Samsung UE55U8092FUXXH - 231")}/5.jpeg`,
      `/images/${encodePath("Samsung UE55U8092FUXXH - 231")}/6.jpeg`
    ]
  },
  {
    id: "samsung-qe43q8faauxxh",
    nome: "Samsung QE43Q8FAAUXXH",
    prezzo: 699,
    descrizione_breve: "QLED 43\" con processore Q4 AI, Quantum Dot, One UI Tizen e design AirSlim.",
    descrizione_approfondita: "Samsung QE43Q8FAAUXXH - Processore Q4 AI: Scopri la potenza dell'intelligenza artificiale in 4K. Il processore AI di Samsung offre un'esperienza audio e video ottimizzata per i TV 4K.\n\n100% di Volume Colore con Quantum Dot: Un miliardo di sfumature di colore. La tecnologia Real Quantum Dot regala le più belle immagini di sempre. Con il 100% di Volume Colore, Quantum Dot cattura la luce e la trasforma in colori mozzafiato che conservano tutto il loro realismo a vari livelli di luminosità.\n\nOne UI Tizen: Personalizza la tua esperienza di visione. One UI Tizen offre un'esperienza personalizzata sullo schermo. Con il sistema operativo Samsung Tizen, avrai a disposizione tutte le funzioni Samsung più aggiornate e innovative. Inoltre, la tua esperienza sarà protetta da Samsung Knox su tutti i dispositivi SmartThings. One UI Tizen supporterà gli aggiornamenti del sistema operativo Tizen per i prossimi 7 anni.\n\nSmartThings: Collega e gestisci i dispositivi smart home direttamente dal tuo TV. Grazie a un hub smart integrato, il TV è in grado di collegare e controllare i dispositivi smart, anche quelli che richiedono la compatibilità con gli standard Matter e HCA. Inoltre, potrai ricevere notifiche sui dispositivi direttamente dallo schermo, con una mappa 3D che mostra una panoramica completa del tuo sistema smart home.\n\nAirSlim: Più elegante e sottile che mai. Un design elegante e sottile che diventerà tutt'uno con la parete.\n\nTelecomando SolarCell: Grazie al pannello solare sul retro, il telecomando SolarCell si ricarica con la luce del sole, evitando di utilizzare batterie usa e getta. Grazie a funzioni smart come il microfono integrato e l'assistente vocale, questo telecomando si rivela incredibilmente innovativo.",
    specifiche_base: {
      Risoluzione: "Ultra HD 4K (3840 x 2160)",
      Pannello: "QLED Quantum Dot",
      "Sistema Operativo": "Tizen OS"
    },
    specifiche_avanzate: {
      "Refresh Rate": "60 Hz",
      "HDMI 2.1": "3x Porte HDMI (eARC support)",
      "Tipo HDR": "HDR10+, HLG",
      "Uscita Audio": "20W (2.0 canali)",
      "Smart OS": "Samsung Tizen Smart TV",
      "Processore": "Quantum Lite 4K",
      "Classe Energetica": "G",
      "Luminosità Picco": "500 nits"
    },
    immagini: [
      `/images/${encodePath("Samsung QE43Q8FAAUXXH - 233")}/1.jpeg`,
      `/images/${encodePath("Samsung QE43Q8FAAUXXH - 233")}/2.jpeg`,
      `/images/${encodePath("Samsung QE43Q8FAAUXXH - 233")}/3.jpeg`,
      `/images/${encodePath("Samsung QE43Q8FAAUXXH - 233")}/4.jpeg`,
      `/images/${encodePath("Samsung QE43Q8FAAUXXH - 233")}/5.jpeg`,
      `/images/${encodePath("Samsung QE43Q8FAAUXXH - 233")}/6.jpeg`
    ]
  },
  {
    id: "samsung-ue32h5002fkxxh",
    nome: "Samsung UE32H5002FKXXH",
    prezzo: 249,
    descrizione_breve: "TV LED HD Ready da 32\" con sistema Tizen, design compatto e funzioni smart per camere e ambienti ridotti.",
    descrizione_approfondita: "Il Samsung UE32H5002FKXXH è un TV LED HD Ready da 32 pollici progettato per offrire immagini nitide, colori realistici e una navigazione Smart semplice e fluida grazie al sistema operativo Tizen. Con una risoluzione di 1366 x 768 pixel e tecnologia Micro Dimming Pro, il televisore garantisce un contrasto equilibrato e neri più profondi, migliorando l’esperienza visiva in ogni condizione di luce.\n\nIdeale per camere da letto, cucine o piccoli salotti, combina un design compatto e moderno con funzionalità smart di ultima generazione.\n\nLa qualità dell’immagine è potenziata dal processore Hyper Real e dal sistema Samsung Contrast Enhancer, che ottimizza la profondità e il realismo dei contenuti. Il pannello LED piatto offre un’ampia angolazione di visione e tempi di risposta rapidi, con un refresh rate nativo di 50 Hz e supporto HDR10+ per una resa dei colori dinamica e vibrante.\n\nIl sistema audio integrato con potenza di 10W e tecnologia di suono adattivo offre un’esperienza bilanciata e immersiva, ideale per film, sport e contenuti in streaming. La compatibilità con Amazon Alexa consente inoltre di controllare il televisore con comandi vocali, rendendo l’esperienza ancora più intuitiva.\n\nGrazie al Wi-Fi integrato e alla connessione Ethernet LAN, il TV accede facilmente a Internet e ai servizi di streaming preferiti. Include browser web e Hybrid Broadcast Broadband TV (HbbTV) per sfruttare al meglio le funzioni interattive. La connettività è completa: 2 porte HDMI, 1 porta USB 2.0, CI+ 1.4, uscita audio digitale e compatibilità Anynet+ (HDMI-CEC) per gestire più dispositivi con un unico telecomando.\n\nIl televisore è efficiente dal punto di vista energetico, con un consumo in modalità SDR di 27 W e classe energetica F. Il design elegante in colore nero con cornici sottili e supporto centrale stabile lo rende adatto a qualsiasi arredamento moderno. Perfetto per chi cerca un TV affidabile, versatile e con funzioni smart, senza rinunciare alla qualità d’immagine tipica di Samsung.",
    specifiche_base: {
      Risoluzione: "HD Ready (1366 x 768)",
      Pannello: "LED",
      "Sistema Operativo": "Samsung Smart TV Legacy"
    },
    specifiche_avanzate: {
      "Refresh Rate": "60 Hz",
      "HDMI 2.1": "2x Porte HDMI",
      "Tipo HDR": "No",
      "Uscita Audio": "10W (2.0 canali)",
      "Smart OS": "Smart Hub (modello base)",
      "Processore": "Basic Quad Core",
      "Classe Energetica": "A+",
      "Luminosità Picco": "250 nits"
    },
    immagini: [
      `/images/${encodePath("Samsung UE32H5002FKXXH - 129")}/1.jpeg`,
      `/images/${encodePath("Samsung UE32H5002FKXXH - 129")}/2.jpeg`,
      `/images/${encodePath("Samsung UE32H5002FKXXH - 129")}/3.jpeg`,
      `/images/${encodePath("Samsung UE32H5002FKXXH - 129")}/4.jpeg`,
      `/images/${encodePath("Samsung UE32H5002FKXXH - 129")}/5.jpeg`,
      `/images/${encodePath("Samsung UE32H5002FKXXH - 129")}/6.jpeg`
    ]
  }
];
