export default function decorate(block) {
  const rows = [...block.children];

  // Create wrapper for quote content
  const wrapper = document.createElement('div');
  wrapper.classList.add('quote-simple-wrapper');

  // Create opening quotation mark SVG
  const openingQuotationMark = document.createElement('div');
  openingQuotationMark.classList.add('quote-simple-quotation-mark', 'opening');
  openingQuotationMark.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 42">
      <path d="M13.4 41.6C6 41.6 0 35.6 0 28.2c0-7.4 6-13.4 13.4-13.4v6.7c-3.7 0-6.7 3-6.7 6.7s3 6.7 6.7 6.7c3.7 0 6.7-3 6.7-6.7V14.8H6.7V0h20.1v28.2c0 7.4-6 13.4-13.4 13.4zm27 0c-7.4 0-13.4-6-13.4-13.4 0-7.4 6-13.4 13.4-13.4v6.7c-3.7 0-6.7 3-6.7 6.7s3 6.7 6.7 6.7c3.7 0 6.7-3 6.7-6.7V14.8h-13.4V0h20.1v28.2c0 7.4-6 13.4-13.4 13.4z"/>
    </svg>
  `;
  wrapper.appendChild(openingQuotationMark);

  if (rows.length > 0) {
    // First row is the quote text
    const quoteRow = rows[0];
    quoteRow.classList.add('quote-simple-text');
    wrapper.appendChild(quoteRow);
  }

  // Create closing quotation mark SVG (rotated 180 degrees)
  const closingQuotationMark = document.createElement('div');
  closingQuotationMark.classList.add('quote-simple-quotation-mark', 'closing');
  closingQuotationMark.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 42">
      <path d="M13.4 41.6C6 41.6 0 35.6 0 28.2c0-7.4 6-13.4 13.4-13.4v6.7c-3.7 0-6.7 3-6.7 6.7s3 6.7 6.7 6.7c3.7 0 6.7-3 6.7-6.7V14.8H6.7V0h20.1v28.2c0 7.4-6 13.4-13.4 13.4zm27 0c-7.4 0-13.4-6-13.4-13.4 0-7.4 6-13.4 13.4-13.4v6.7c-3.7 0-6.7 3-6.7 6.7s3 6.7 6.7 6.7c3.7 0 6.7-3 6.7-6.7V14.8h-13.4V0h20.1v28.2c0 7.4-6 13.4-13.4 13.4z"/>
    </svg>
  `;
  wrapper.appendChild(closingQuotationMark);

  if (rows.length > 1) {
    // Second row is attribution (logo) - if provided
    const attributionRow = rows[1];
    attributionRow.classList.add('quote-simple-attribution');
    wrapper.appendChild(attributionRow);
  }

  // Replace block content with wrapper
  block.replaceChildren(wrapper);
}
