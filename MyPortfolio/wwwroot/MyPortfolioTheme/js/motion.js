/* MyPortfolioTheme | motion: loaded in <head>, before the page is drawn */
// Enables scroll animations only when supported and the user has not chosen reduced motion
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) document.documentElement.classList.add('js-motion');
})();
