/* global WebImporter */

/**
 * Parser for hero-dark block
 *
 * Source: https://www.wearedesignmind.com/
 * Base Block: hero
 *
 * Block Structure:
 * - Row 1: Content (heading, paragraph, CTA) | Image
 *
 * Source HTML Pattern:
 * <section id="hero-1">
 *   <div class="framer-*">
 *     <h1>Heading</h1>
 *     <p>Description</p>
 *     <a href="#pricing">See Plans</a>
 *   </div>
 *   <img src="starburst.png" />
 * </section>
 *
 * Generated: 2026-01-08
 */
export default function parse(element, { document }) {
  // Extract content from source HTML
  const heading = element.querySelector('h1, h2, [class*="framer-"] h1');
  const description = element.querySelector('p.framer-text, [class*="framer-"] > p');
  const ctaLinks = Array.from(element.querySelectorAll('a[href*="pricing"], a[href*="plan"], a.framer-*'));
  const heroImage = element.querySelector('img[src*="161fo"], img[src*="starburst"], picture img');

  // Build content cell
  const contentCell = [];
  if (heading) contentCell.push(heading.cloneNode(true));
  if (description) contentCell.push(description.cloneNode(true));
  ctaLinks.forEach((cta) => contentCell.push(cta.cloneNode(true)));

  // Build cells array - 2 columns: content | image
  const cells = [];

  if (heroImage) {
    cells.push([contentCell, heroImage.cloneNode(true)]);
  } else {
    cells.push([contentCell]);
  }

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero-Dark', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
