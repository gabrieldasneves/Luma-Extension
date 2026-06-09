import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from 'docx'
import type { Capture } from '@/types'

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function captureBlock(capture: Capture): Paragraph[] {
  return [
    new Paragraph({
      children: [new TextRun({ text: capture.text, size: 24 })],
      border: {
        left: { style: BorderStyle.THICK, size: 12, color: 'F5A623', space: 12 },
      },
      indent: { left: 440 },
      spacing: { before: 120, after: 120 },
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 240 },
      children: [
        new TextRun({ text: `${capture.pageTitle}  `, color: '9898AA', size: 18 }),
        new ExternalHyperlink({
          link: capture.url,
          children: [
            new TextRun({ text: capture.url, color: 'F5A623', size: 18 }),
          ],
        }),
      ],
    }),
    new Paragraph({
      text: '',
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 4, color: '4A4A6A', space: 4 },
      },
      spacing: { after: 240 },
    }),
  ]
}

export async function generateDocx(captures: Capture[]): Promise<void> {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: 'Luma — Research Export',
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            children: [new TextRun({ text: formatDate(new Date()), color: '9898AA', size: 20 })],
            spacing: { after: 480 },
          }),
          ...captures.flatMap(captureBlock),
        ],
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `luma-export-${new Date().toISOString().slice(0, 10)}.docx`
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}
