/**
 * Decorates the cards-project block
 * @param {Element} block The cards-project block element
 */
export default function decorate(block) {
  // Convert rows to project cards
  const projects = [...block.children].map((row) => {
    const cells = [...row.children];
    if (cells.length < 2) return null;

    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';

    // First cell: Project title and description
    const titleDescCell = cells[0];
    const title = titleDescCell.querySelector('strong');
    const description = titleDescCell.querySelector('p:not(:has(strong))');

    if (title) {
      const titleEl = document.createElement('h3');
      titleEl.textContent = title.textContent;
      projectCard.appendChild(titleEl);
    }

    if (description) {
      const descEl = document.createElement('p');
      descEl.className = 'project-description';
      descEl.textContent = description.textContent;
      projectCard.appendChild(descEl);
    }

    // Second cell: Key Contributions and Tech Stack
    const detailsCell = cells[1];

    // Extract Key Contributions
    const contributionsHeading = Array.from(detailsCell.querySelectorAll('strong'))
      .find((el) => el.textContent.includes('Key Contributions'));

    if (contributionsHeading) {
      const contributionsSection = document.createElement('div');
      contributionsSection.className = 'project-contributions';

      const heading = document.createElement('h4');
      heading.textContent = 'Key Contributions';
      contributionsSection.appendChild(heading);

      // Get the list after the heading
      const nextEl = contributionsHeading.parentElement.nextElementSibling;
      if (nextEl && nextEl.tagName === 'UL') {
        const ul = document.createElement('ul');
        [...nextEl.children].forEach((li) => {
          const newLi = document.createElement('li');
          newLi.textContent = li.textContent;
          ul.appendChild(newLi);
        });
        contributionsSection.appendChild(ul);
      }

      projectCard.appendChild(contributionsSection);
    }

    // Extract Tech Stack
    const techStackText = Array.from(detailsCell.querySelectorAll('strong'))
      .find((el) => el.textContent.includes('Tech Stack'));

    if (techStackText) {
      const techSection = document.createElement('div');
      techSection.className = 'project-tech';

      const heading = document.createElement('h4');
      heading.textContent = 'Tech Stack';
      techSection.appendChild(heading);

      const techContent = techStackText.parentElement.textContent
        .replace('Tech Stack:', '').trim();

      const techTags = document.createElement('div');
      techTags.className = 'tech-tags';

      techContent.split(',').forEach((tech) => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = tech.trim();
        techTags.appendChild(tag);
      });

      techSection.appendChild(techTags);
      projectCard.appendChild(techSection);
    }

    return projectCard;
  }).filter((card) => card !== null);

  // Clear block and add project cards
  block.innerHTML = '';
  const container = document.createElement('div');
  container.className = 'cards-project-container';

  projects.forEach((project, index) => {
    project.style.animationDelay = `${index * 0.1}s`;
    container.appendChild(project);
  });

  block.appendChild(container);

  // Animate cards on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  projects.forEach((card) => observer.observe(card));
}
