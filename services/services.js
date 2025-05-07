// document.addEventListener('DOMContentLoaded', () => {
//   // Enable smooth scrolling for anchor links
//   const anchorLinks = document.querySelectorAll('a[href^="#"]');

//   anchorLinks.forEach(link => {
//     link.addEventListener('click', event => {
//       event.preventDefault();

//       const targetId = link.getAttribute('href');

//       // Ignore empty anchors like href="#"
//       if (targetId === '#' || targetId === '') return;

//       const targetElement = document.querySelector(targetId);

//       if (targetElement) {
//         const offset = 100; // Adjust this based on fixed headers, etc.

//         window.scrollTo({
//           top: targetElement.offsetTop - offset,
//           behavior: 'smooth'
//         });
//       }
//     });
//   });
// });
