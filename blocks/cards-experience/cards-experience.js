import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-experience-card-image';
      else div.className = 'cards-experience-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.replaceChildren(ul);

  // Animate cards on scroll - re-trigger every time section enters/exits viewport
  const cards = block.querySelectorAll('li');
  let animationTimeouts = [];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const card = entry.target;
      const index = Array.from(cards).indexOf(card);

      if (entry.isIntersecting) {
        // Card is entering viewport - animate in with stagger
        const timeout = setTimeout(() => {
          card.classList.add('animate-in');
        }, index * 150); // 150ms delay between each card
        animationTimeouts.push(timeout);
      } else {
        // Card is leaving viewport - remove animation class
        card.classList.remove('animate-in');
        // Clear any pending timeouts for this card
        animationTimeouts.forEach(clearTimeout);
        animationTimeouts = [];
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  cards.forEach((card) => observer.observe(card));
}
