/**
 * Decorate the accordion block
 * @param {Element} block The accordion block element
 */
export default function decorate(block) {
  // Get all rows (each row is a question-answer pair)
  const rows = [...block.children];

  // Transform each row into an accordion item
  rows.forEach((row, index) => {
    const columns = [...row.children];
    
    // First column is the question/header
    const questionCol = columns[0];
    const answerCol = columns[1];

    // Create accordion item container
    const accordionItem = document.createElement('div');
    accordionItem.className = 'accordion-item';

    // Create header (button for accessibility)
    const header = document.createElement('button');
    header.className = 'accordion-header';
    header.setAttribute('aria-expanded', 'false');
    header.setAttribute('aria-controls', `accordion-panel-${index}`);
    header.id = `accordion-header-${index}`;

    // Move question content into header
    while (questionCol.firstChild) {
      header.append(questionCol.firstChild);
    }

    // Add chevron icon
    const icon = document.createElement('span');
    icon.className = 'accordion-icon';
    icon.setAttribute('aria-hidden', 'true');
    header.append(icon);

    // Create body/panel
    const body = document.createElement('div');
    body.className = 'accordion-body';
    body.id = `accordion-panel-${index}`;
    body.setAttribute('aria-labelledby', `accordion-header-${index}`);
    body.setAttribute('role', 'region');
    body.hidden = true;

    // Move answer content into body
    while (answerCol && answerCol.firstChild) {
      body.append(answerCol.firstChild);
    }

    // Add click handler
    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      
      // Close all other items (optional - remove if you want multiple items open)
      block.querySelectorAll('.accordion-header').forEach((otherHeader) => {
        if (otherHeader !== header) {
          otherHeader.setAttribute('aria-expanded', 'false');
          otherHeader.classList.remove('active');
          const otherPanel = document.getElementById(otherHeader.getAttribute('aria-controls'));
          if (otherPanel) {
            otherPanel.hidden = true;
          }
        }
      });

      // Toggle current item
      header.setAttribute('aria-expanded', !isExpanded);
      header.classList.toggle('active');
      body.hidden = isExpanded;
    });

    // Assemble the accordion item
    accordionItem.append(header, body);
    
    // Replace the original row with the accordion item
    row.replaceWith(accordionItem);
  });
}

