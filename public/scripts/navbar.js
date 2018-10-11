/* Script for the nav to be sticky */

window.addEventListener('scroll', () => {
  const navBar = document.querySelector('.gb-navbar');
  let isPassed = window.pageYOffset > 0;
  if (isPassed && navBar.classList.contains('gb-background-transparent')) {
    navBar.classList.remove('gb-background-transparent');
    navBar.classList.add('gb-background-primary', 'sticky');
  } else if (!isPassed && navBar.classList.contains('sticky')) {
    navBar.classList.remove('gb-background-primary', 'sticky');
    navBar.classList.add('gb-background-transparent');
  }
});
