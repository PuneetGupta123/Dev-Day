/* global WebImporter */

/**
 * Parser for quote-simple block
 *
 * Source: https://www.wearedesignmind.com/
 * Base Block: quote
 *
 * Block Structure:
 * - Row 1: Quote text
 * - Row 2: Attribution/logo (optional)
 *
 * Source HTML Pattern:
 * <section id="testimonial">
 *   <p>Quote text here...</p>
 *   <img src="company-logo.png" />
 * </section>
 *
 * Generated: 2026-01-08
 */
export default function parse(element, { document }) {
  // Extract quote text - look for paragraph with substantial text
  const paragraphs = Array.from(element.querySelectorAll('p.framer-text, p'));
  const quoteText = paragraphs.find((p) => p.textContent.length > 50);

  // Extract attribution logo
  const logo = element.querySelector('img[src*="NjPOE"], img[src*="magnet"], img');

  // Build cells array
  const cells = [];

  // Row 1: Quote text
  if (quoteText) {
    cells.push([quoteText.cloneNode(true)]);
  }

  // Row 2: Attribution logo (if present)
  if (logo) {
    cells.push([logo.cloneNode(true)]);
  }

  // Create block using WebImporter utility
  if (cells.length > 0) {
    const block = WebImporter.Blocks.createBlock(document, { name: 'Quote-Simple', cells });
    element.replaceWith(block);
  }
}
