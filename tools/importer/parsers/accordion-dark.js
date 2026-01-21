/* global WebImporter */

/**
 * Parser for accordion-dark block
 *
 * Source: https://www.wearedesignmind.com/
 * Base Block: accordion
 *
 * Block Structure:
 * - Each row: 2 columns [question | answer]
 *
 * Source HTML Pattern:
 * <section id="faqs">
 *   <div>
 *     <h6>Question text?</h6>
 *     <div>Answer text...</div>
 *   </div>
 * </section>
 *
 * Generated: 2026-01-08
 */
export default function parse(element, { document }) {
  // Find FAQ items - look for h6 elements (questions)
  const questions = Array.from(element.querySelectorAll('h6.framer-text, h6'));

  // Build cells array - one row per Q&A pair
  const cells = [];

  questions.forEach((question) => {
    // Get the question text
    const questionText = question.textContent.trim();

    // Try to find the answer - typically in a sibling or nearby div
    let answerText = '';
    const parentDiv = question.closest('div[class*="framer-"]');
    if (parentDiv) {
      const nextSibling = parentDiv.nextElementSibling;
      if (nextSibling) {
        const answerEl = nextSibling.querySelector('p, div');
        if (answerEl) {
          answerText = answerEl.textContent.trim();
        }
      }
    }

    // Create question element
    const questionEl = document.createElement('p');
    questionEl.textContent = questionText;

    // Create answer element
    const answerEl = document.createElement('p');
    answerEl.textContent = answerText || 'Answer content here.';

    // Add row with question and answer
    cells.push([questionEl, answerEl]);
  });

  // Create block using WebImporter utility
  if (cells.length > 0) {
    const block = WebImporter.Blocks.createBlock(document, { name: 'Accordion-Dark', cells });
    element.replaceWith(block);
  }
}
