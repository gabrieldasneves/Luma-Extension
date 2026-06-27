import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import { jsPDF } from "jspdf";
import type { Capture } from "@/types";

export type ExportFormat = "docx" | "pdf";

const PDF_COLORS = {
  text: [30, 33, 46] as [number, number, number],
  muted: [139, 146, 158] as [number, number, number],
  mint: [44, 255, 186] as [number, number, number],
  blue: [44, 153, 254] as [number, number, number],
  border: [70, 73, 82] as [number, number, number],
};

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function exportFilename(extension: string): string {
  return `luma-export-${new Date().toISOString().slice(0, 10)}.${extension}`;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function captureBlock(capture: Capture): Paragraph[] {
  return [
    new Paragraph({
      children: [new TextRun({ text: capture.text, size: 24 })],
      border: {
        left: {
          style: BorderStyle.THICK,
          size: 12,
          color: "2CFFBA",
          space: 12,
        },
      },
      indent: { left: 440 },
      spacing: { before: 120, after: 120 },
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 240 },
      children: [
        new TextRun({
          text: `${capture.pageTitle}  `,
          color: "8B929E",
          size: 18,
        }),
        new ExternalHyperlink({
          link: capture.url,
          children: [
            new TextRun({ text: capture.url, color: "2C99FE", size: 18 }),
          ],
        }),
      ],
    }),
    new Paragraph({
      text: "",
      border: {
        bottom: {
          style: BorderStyle.SINGLE,
          size: 4,
          color: "464952",
          space: 4,
        },
      },
      spacing: { after: 240 },
    }),
  ];
}

export async function generateDocx(captures: Capture[]): Promise<void> {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: "Luma — Research Export",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: formatDate(new Date()),
                color: "8B929E",
                size: 20,
              }),
            ],
            spacing: { after: 480 },
          }),
          ...captures.flatMap(captureBlock),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  downloadBlob(blob, exportFilename("docx"));
}

export async function generatePdf(captures: Capture[]): Promise<void> {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 20;
  const barGap = 6;
  const textX = margin + barGap;
  const contentWidth = pageWidth - margin * 2 - barGap;
  const bodyLineHeight = 5.5;
  const metaLineHeight = 4.5;
  let y = margin;

  const ensureSpace = (height: number) => {
    if (y + height > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...PDF_COLORS.text);
  doc.text("Luma — Research Export", margin, y);
  y += 9;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...PDF_COLORS.muted);
  doc.text(formatDate(new Date()), margin, y);
  y += 14;

  for (const capture of captures) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(...PDF_COLORS.text);

    const textLines = doc.splitTextToSize(capture.text, contentWidth);
    const blockHeight = textLines.length * bodyLineHeight + 18;
    ensureSpace(blockHeight);

    const barTop = y;
    const barBottom = y + Math.max(16, textLines.length * bodyLineHeight);
    doc.setDrawColor(...PDF_COLORS.mint);
    doc.setLineWidth(1.2);
    doc.line(margin, barTop, margin, barBottom);

    doc.text(textLines, textX, y + 5);
    y += textLines.length * bodyLineHeight + 6;

    doc.setFontSize(9);
    doc.setTextColor(...PDF_COLORS.muted);
    const metaLines = doc.splitTextToSize(
      `${capture.pageTitle}  ${capture.url}`,
      contentWidth,
    );
    ensureSpace(metaLines.length * metaLineHeight + 8);
    doc.text(metaLines, textX, y);
    y += metaLines.length * metaLineHeight + 4;

    doc.setDrawColor(...PDF_COLORS.border);
    doc.setLineWidth(0.2);
    doc.line(margin, y, margin + contentWidth + barGap, y);
    y += 12;
  }

  downloadBlob(doc.output("blob"), exportFilename("pdf"));
}

export async function generateExport(
  captures: Capture[],
  format: ExportFormat,
): Promise<void> {
  if (format === "pdf") await generatePdf(captures);
  else await generateDocx(captures);
}
