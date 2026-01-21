/* global WebImporter */

/**
 * Parser for carousel-logos block
 *
 * Source: https://www.wearedesignmind.com/
 * Base Block: carousel
 *
 * Block Structure:
 * - Each row: One logo image
 *
 * Source HTML Pattern:
 * <section id="logo-list">
 *   <ul>
 *     <li><img src="logo1.png" /></li>
 *     <li><img src="logo2.png" /></li>
 *   </ul>
 * </section>
 *
 * Generated: 2026-01-08
 */
export default function parse(element, { document }) {
  // Extract logo images
  const logos = Array.from(element.querySelectorAll('img'));

  // Build cells array - one row per logo
  const cells = [];

  logos.forEach((logo) => {
    cells.push([logo.cloneNode(true)]);
  });

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Carousel-Logos', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
