document.addEventListener('DOMContentLoaded', () => {
  // Get all tab buttons and corresponding content containers
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  // Activate the selected tab and its corresponding content
  function activateTab(tabButton) {
    // Clear existing active states
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Activate clicked tab
    tabButton.classList.add('active');

    // Find and activate corresponding content section
    const targetId = tabButton.getAttribute('data-tab');
    const targetContent = document.getElementById(targetId);
    if (targetContent) {
      targetContent.classList.add('active');
    }
  }

  // Handle tab button clicks
  tabButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      activateTab(event.currentTarget);
    });
  });

  // Handle tabs via URL hash (e.g. example.com#tab2)
  function handleHashChange() {
    const hash = window.location.hash.slice(1); // Remove the "#" symbol
    if (!hash) return;

    const matchingTab = document.querySelector(`.tab-btn[data-tab="${hash}"]`);
    if (matchingTab) {
      activateTab(matchingTab);
      // Scroll into view if tab is far down the page
      matchingTab.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Check hash on initial load
  handleHashChange();

  // React to hash changes while browsing
  window.addEventListener('hashchange', handleHashChange);
});
