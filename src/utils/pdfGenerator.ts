import jsPDF from "jspdf";
import { CartItem } from "../context/CartContext";

async function loadLogo(): Promise<{ base64: string; width: number; height: number }> {
  const response = await fetch("/images/FP%20Smart_testo.png");
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      const img = new Image();
      img.onload = () => resolve({ base64, width: img.width, height: img.height });
      img.src = base64;
    };
    reader.readAsDataURL(blob);
  });
}

export async function generateOrderPDF(
  items: CartItem[],
  paymentMethod: string,
  total: number
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  const logo = await loadLogo();
  const maxWidth = 50;
  const ratio = logo.height / logo.width;
  const logoWidth = maxWidth;
  const logoHeight = maxWidth * ratio;
  doc.addImage(logo.base64, "PNG", 20, 10, logoWidth, logoHeight);

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Ordine", pageWidth / 2, 32, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Data: ${new Date().toLocaleDateString("it-IT")}`, 20, 42);
  doc.text(`Numero ordine: ${Date.now()}`, 20, 49);

  doc.setDrawColor(19, 127, 185);
  doc.setLineWidth(0.5);
  doc.line(20, 55, pageWidth - 20, 55);

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Prodotti", 20, 65);

  let y = 75;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  items.forEach((item, index) => {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.text(`${index + 1}. ${item.product.nome}`, 20, y);
    y += 7;

    doc.setFont("helvetica", "normal");
    doc.text(`Pannello: ${item.product.specifiche_base.Pannello}`, 25, y);
    y += 6;
    doc.text(`Risoluzione: ${item.product.specifiche_base.Risoluzione}`, 25, y);
    y += 6;
    doc.text(`Prezzo unitario: €${item.product.prezzo}`, 25, y);
    y += 6;
    doc.text(`Quantità: ${item.quantita}`, 25, y);
    y += 6;
    doc.text(`Subtotale: €${item.product.prezzo * item.quantita}`, 25, y);
    y += 10;
  });

  doc.setDrawColor(19, 127, 185);
  doc.line(20, y, pageWidth - 20, y);
  y += 10;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`Metodo di pagamento: ${paymentMethod}`, 20, y);
  y += 10;

  doc.setFontSize(14);
  doc.text(`Totale: €${total}`, 20, y);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("FPSMART - Wholesale Tech Solutions", pageWidth / 2, 280, { align: "center" });
  doc.text("www.fpsmart.it | info@fpsmart.it", pageWidth / 2, 285, { align: "center" });

  doc.save(`ordine-fpsmart-${Date.now()}.pdf`);
}
