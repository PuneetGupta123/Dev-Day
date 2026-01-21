/* global WebImporter */

/**
 * Parser for columns-split block
 *
 * Source: https://www.wearedesignmind.com/
 * Base Block: columns
 *
 * Block Structure:
 * - Row 1: 2 columns [text content | image] or [left content | right content]
 *
 * Source HTML Pattern:
 * <section id="services|pricing">
 *   <div>
 *     <h2>Heading</h2>
 *     <ul><li>Item 1</li></ul>
 *   </div>
 *   <div>
 *     <img src="image.png" />
 *   </div>
 * </section>
 *
 * Generated: 2026-01-08
 */
export default function parse(element, { document }) {
  // Find the main content columns
  const childDivs = Array.from(element.querySelectorAll(':scope > div > div, :scope > div'));

  // Separate text content from image content
  const textColumn = [];
  let imageColumn = null;

  childDivs.forEach((div) => {
    const hasMainImage = div.querySelector('img[src*="8wCpBAl"], img[src*="services"]');
    const heading = div.querySelector('h2, h3');
    const list = div.querySelector('ul, ol');
    const paragraphs = div.querySelectorAll('p.framer-text');

    if (hasMainImage && !heading) {
      // This is an image column
      imageColumn = hasMainImage.cloneNode(true);
    } else if (heading || list || paragraphs.length > 0) {
      // This is text content
      if (heading) textColumn.push(heading.cloneNode(true));
      if (list) textColumn.push(list.cloneNode(true));
      paragraphs.forEach((p) => textColumn.push(p.cloneNode(true)));
    }
  });

  // Build cells array - 2 columns
  const cells = [];

  if (imageColumn) {
    // Text + Image layout
    cells.push([textColumn, imageColumn]);
  } else {
    // Two text columns (pricing)
    const leftContent = [];
    const rightContent = [];

    // For pricing, look for pricing card structures
    const pricingCards = element.querySelectorAll('[class*="pricing"], [class*="plan"]');
    if (pricingCards.length >= 2) {
      pricingCards.forEach((card, index) => {
        const content = card.cloneNode(true);
        if (index === 0) leftContent.push(content);
        else rightContent.push(content);
      });
      cells.push([leftContent, rightContent]);
    } else {
      // Fallback - single column
      cells.push([textColumn]);
    }
  }

  // Create block using WebImporter utility
  if (cells.length > 0) {
    const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Split', cells });
    element.replaceWith(block);
  }
}
