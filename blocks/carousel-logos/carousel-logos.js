export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'carousel-logos-track';

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'carousel-logos-item';
    while (row.firstElementChild) li.append(row.firstElementChild);
    ul.append(li);
  });

  // Duplicate items for seamless infinite loop
  // We need exactly 2 copies: when animation reaches -50%,
  // the second copy is in the same position as the first started
  const clone = ul.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');

  const wrapper = document.createElement('div');
  wrapper.className = 'carousel-logos-wrapper';
  wrapper.append(ul, clone);

  block.replaceChildren(wrapper);
}
