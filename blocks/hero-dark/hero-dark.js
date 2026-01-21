/**
 * Decorates the hero-dark block
 * @param {Element} block The hero-dark block element
 */
export default function decorate(block) {
  // Get the main container div (first child of block)
  const container = block.querySelector(':scope > div');
  if (!container) return;

  // Get all child divs
  const children = container.querySelectorAll(':scope > div');
  if (children.length < 2) return;

  // First div contains text content (heading, paragraph, button)
  const textDiv = children[0];

  // Second div contains the image
  const imageDiv = children[1];

  // Clear the container and rebuild with proper structure
  container.innerHTML = '';

  // Create text content wrapper
  const textWrapper = document.createElement('div');
  textWrapper.className = 'hero-text';
  textWrapper.appendChild(textDiv);

  // Create image wrapper
  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'hero-image';
  imageWrapper.appendChild(imageDiv);

  // Append in order: text first, image second (image will be on right via CSS)
  container.appendChild(textWrapper);
  container.appendChild(imageWrapper);
}
