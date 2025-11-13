import React from "react";
import jsPDF from "jspdf";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";

const DownloadReport = ({
  user,
  payments,
  totalPaid,
  totalBills,
  periodStart,
  periodEnd,
  avgPerBill,
  avgMonthly,
  months,
  fileTime,
}) => {
  const [isGenerating, setIsGenerating] = React.useState(false);

  React.useEffect(() => {
    console.log("DownloadReport props:", {
      user,
      payments,
      totalPaid,
      totalBills,
      periodStart,
      periodEnd,
      avgPerBill,
      avgMonthly,
      months,
      fileTime,
    });
  }, [
    user,
    payments,
    totalPaid,
    totalBills,
    periodStart,
    periodEnd,
    avgPerBill,
    avgMonthly,
    months,
    fileTime,
  ]);

  const currentFileTime =
    fileTime ||
    new Date().toLocaleString("en-US", {
      timeZone: "Asia/Dhaka",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const formatDate = (d) => {
    if (!d) return "-";
    const date = new Date(d);
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const safeCurrency = (amount) => {
    // jsPDF's default fonts may not render the Bengali Taka glyph (৳) correctly.
    // Use fallback "Tk" / "BDT" to ensure no odd characters appear.
    // If you want the real glyph, embed a TTF that supports it (see notes below).
    const symbol = "Tk";
    if (typeof amount === "number") {
      return `${symbol} ${amount.toLocaleString()}`;
    }
    return `${symbol} ${amount || 0}`;
  };

  const handleDownload = () => {
    setIsGenerating(true);
    try {
      if (!Array.isArray(payments)) {
        throw new Error("Payments must be an array.");
      }
      if (!user || typeof user !== "object" || !user.email) {
        throw new Error("User object is missing or invalid.");
      }

      // Initialize jsPDF
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // NOTE: if you want to render the Taka glyph (৳) reliably,
      // embed a UTF-8 TTF font that includes it:
      // 1) Convert a .ttf file (e.g., Roboto-Regular.ttf) to base64 and add it to VFS:
      //    doc.addFileToVFS("Roboto-Regular.ttf", "<BASE64_DATA>");
      //    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
      //    doc.addFileToVFS("Roboto-Bold.ttf", "<BASE64_DATA>");
      //    doc.addFont("Roboto-Bold.ttf", "Roboto", "bold");
      // 2) Then use doc.setFont("Roboto", "normal") and you'll be able to use "৳".
      //
      // For portability here we'll use default fonts and "Tk" fallback.

      const margin = 14;
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let y = margin;

      // Helpers
      const setFont = (size = 12, style = "normal") => {
        doc.setFont("helvetica", style);
        doc.setFontSize(size);
      };

      const addText = (
        text,
        x,
        yPos,
        size = 12,
        style = "normal",
        maxWidth
      ) => {
        setFont(size, style);
        const effectiveMaxWidth = maxWidth || pageWidth - x - margin;
        const lines = doc.splitTextToSize(String(text), effectiveMaxWidth);
        doc.text(lines, x, yPos);
        return lines.length * (size * 0.35); // approximate height used
      };

      const drawLine = (x1, y1, x2, y2, w = 0.2) => {
        doc.setLineWidth(w);
        doc.line(x1, y1, x2, y2);
      };

      const addSectionTitle = (title) => {
        setFont(16, "bold");
        doc.setTextColor(20, 20, 20);
        doc.text(title, margin, y);
        y += 7;
        drawLine(margin, y, pageWidth - margin, y);
        y += 6;
      };

      // Header
      setFont(22, "bold");
      doc.setTextColor(10, 10, 10);
      doc.text("Bill Statement", margin, y);
      y += 10;

      setFont(11, "normal");
      addText(`Customer: ${user.displayName || "N/A"}`, margin, y);
      y += 6;
      addText(`Email: ${user.email || "N/A"}`, margin, y);
      y += 6;
      addText(`Generated on: ${currentFileTime}`, margin, y);
      y += 10;

      // Summary
      addSectionTitle("Summary");

      setFont(11, "normal");
      addText(
        `Statement Period: ${periodStart || "N/A"} – ${periodEnd || "N/A"}`,
        margin,
        y
      );
      y += 6;
      addText(`Total Bills: ${totalBills || 0}`, margin, y);
      y += 6;
      addText(`Total Paid: ${safeCurrency(totalPaid || 0)}`, margin, y);
      y += 6;
      addText(
        `Average per Bill: ${safeCurrency(Number(avgPerBill) || 0)}`,
        margin,
        y
      );
      y += 6;
      addText(
        `Average Monthly: ${safeCurrency(Number(avgMonthly) || 0)}`,
        margin,
        y
      );
      y += 6;
      addText(
        `Duration: ${months || 1} Month${(months || 1) > 1 ? "s" : ""}`,
        margin,
        y
      );
      y += 6;
      addText(
        `Phone: ${
          payments.length > 0 && payments[0]?.Phone ? payments[0].Phone : "N/A"
        }`,
        margin,
        y
      );
      y += 12;

      // Table
      if (payments.length > 0) {
        addSectionTitle("All Payments");

        const headers = ["Date", "Amount", "Username", "Address", "Phone"];
        // Set column start positions (relative)
        const colWidths = [
          40,
          30,
          45,
          pageWidth - margin * 2 - (40 + 30 + 45 + 25),
          25,
        ];
        const colX = [margin];
        for (let i = 1; i < colWidths.length; i++) {
          colX.push(colX[i - 1] + colWidths[i - 1]);
        }

        // Draw header background
        doc.setFillColor(22, 160, 133);
        doc.rect(margin, y - 6, pageWidth - margin * 2, 8, "F");
        // Header text
        headers.forEach((h, i) => {
          doc.setTextColor(255, 255, 255);
          setFont(10, "bold");
          const headerX = colX[i] + 1;
          doc.text(String(h), headerX, y - 0.5);
        });
        doc.setTextColor(0, 0, 0);
        y += 6;
        drawLine(margin, y, pageWidth - margin, y);
        y += 2;

        // Rows
        payments.forEach((p, index) => {
          // Prepare cells
          const rowCells = [
            formatDate(p.date),
            p.amount ? String(p.amount) : "-",
            p.username || "-",
            p.Address || "-",
            p.Phone || "-",
          ];

          // Convert amount to currency string
          rowCells[1] = safeCurrency(Number(p.amount) || p.amount || 0);

          // Pre-split each cell using splitTextToSize to estimate height
          const cellLines = rowCells.map((cell, i) =>
            doc.splitTextToSize(String(cell), colWidths[i] - 2)
          );
          const rowHeight =
            Math.max(...cellLines.map((lines) => lines.length)) * 4.5 + 2; // estimate mm height

          // Page overflow check
          if (y + rowHeight > pageHeight - margin) {
            doc.addPage();
            y = margin;

            // redraw header on new page
            addSectionTitle("All Payments");
            doc.setFillColor(22, 160, 133);
            doc.rect(margin, y - 6, pageWidth - margin * 2, 8, "F");
            headers.forEach((h, i) => {
              doc.setTextColor(255, 255, 255);
              setFont(10, "bold");
              const headerX = colX[i] + 1;
              doc.text(String(h), headerX, y - 0.5);
            });
            doc.setTextColor(0, 0, 0);
            y += 6;
            drawLine(margin, y, pageWidth - margin, y);
            y += 2;
          }

          // Render each cell
          rowCells.forEach((cell, i) => {
            setFont(10, "normal");
            doc.text(cellLines[i], colX[i] + 1, y + 3);
          });

          y += rowHeight;
          drawLine(margin, y, pageWidth - margin, y);
          y += 2;
        });
      } else {
        addText("No payments available.", margin, y);
      }

      // Filename and save
      const safeUserName = (user.displayName || "user").replace(
        /[^a-zA-Z0-9]/g,
        "_"
      );
      const timestamp = new Date().toISOString().split("T")[0];
      const fileName = `Bill_Statement_${safeUserName}_${timestamp}.pdf`;
      doc.save(fileName);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error(
        `Failed to generate PDF: ${error.message || "Unknown error"}`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleDownload}
      disabled={isGenerating}
      className={`group flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 px-4 sm:px-6 py-3 text-white font-medium shadow-lg hover:shadow-xl transition-all ${
        isGenerating ? "opacity-60 cursor-not-allowed" : ""
      }`}
    >
      {isGenerating ? (
        <FaSpinner className="w-5 h-5 animate-spin" />
      ) : (
        <FiDownload className="w-5 h-5" />
      )}
      <span className="text-sm sm:text-base">
        {isGenerating ? "Generating..." : "Download Report"}
      </span>
    </motion.button>
  );
};

export default DownloadReport;
