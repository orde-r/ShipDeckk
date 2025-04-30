document.addEventListener('DOMContentLoaded', function() {
  // Tab functionality
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  // Handle tab click
  function handleTabClick(e) {
    // Remove active class from all tabs and contents
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding content
    const clickedTab = e.currentTarget;
    clickedTab.classList.add('active');
    
    const tabId = clickedTab.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  }
  
  // Add click event to tabs
  tabButtons.forEach(button => {
    button.addEventListener('click', handleTabClick);
  });
  
  // Handle URL hash for direct access to specific tabs
  function handleUrlHash() {
    const hash = window.location.hash.substring(1); // Get hash without the #
    
    if (hash) {
      const targetTab = document.querySelector(`.tab-btn[data-tab="${hash}"]`);
      if (targetTab) {
        // Remove active class from all tabs and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to target tab and content
        targetTab.classList.add('active');
        document.getElementById(hash).classList.add('active');
        
        // Scroll to tabs if not in view
        targetTab.scrollIntoView({behavior: 'smooth', block: 'center'});
      }
    }
  }
  
  // Check URL hash on page load
  handleUrlHash();
  
  // Listen for hash changes
  window.addEventListener('hashchange', handleUrlHash);
});