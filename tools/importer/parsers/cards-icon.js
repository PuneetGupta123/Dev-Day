/* global WebImporter */

/**
 * Parser for cards-icon block
 *
 * Source: https://www.wearedesignmind.com/
 * Base Block: cards
 *
 * Block Structure:
 * - Each row: 2 columns [image | title + description]
 *
 * Source HTML Pattern:
 * <section id="process|benefits|work">
 *   <div class="framer-*">
 *     <img src="icon.png" />
 *     <h3>Title</h3>
 *     <p>Description</p>
 *   </div>
 * </section>
 *
 * Generated: 2026-01-08
 */
export default function parse(element, { document }) {
  // Find card containers - look for divs with images
  const cardContainers = Array.from(element.querySelectorAll(':scope > div > div, :scope > div'));

  // Filter to only containers that have both image and text
  const cards = cardContainers.filter((container) => {
    const hasImage = container.querySelector('img, picture');
    const hasText = container.querySelector('h2, h3, h4, h5, h6, p.framer-text');
    return hasImage && hasText;
  });

  // Build cells array - one row per card
  const cells = [];

  cards.forEach((card) => {
    const image = card.querySelector('img, picture img');
    const title = card.querySelector('h2, h3, h4, h5, h6');
    const description = card.querySelector('p.framer-text, p');

    if (image) {
      const textContent = [];
      if (title) textContent.push(title.cloneNode(true));
      if (description) textContent.push(description.cloneNode(true));

      cells.push([image.cloneNode(true), textContent]);
    }
  });

  // Only create block if we found cards
  if (cells.length > 0) {
    const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-Icon', cells });
    element.replaceWith(block);
  }
}
