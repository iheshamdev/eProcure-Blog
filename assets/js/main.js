// Show sticky header only at Article page
if (window.location.pathname.includes('/article')) {
  const header = document.querySelector('.sticky-header');
  let progressBar = header.querySelector('.progress-scroll-bar');
  let scrollProgressPercentage = 0;
  let pageHeight = document.body.scrollHeight - window.innerHeight;
  document.addEventListener('scroll', function (e) {
    scrollProgressPercentage =
      Math.round((window.scrollY * 100) / pageHeight) / 100;
    progressBar.style.transform = `scaleX(${scrollProgressPercentage})`;
    if (window.scrollY >= 400) {
      header.classList.add('show');
    } else {
      header.classList.remove('show');
    }
  });
}

window.onload = function () {
  filterCategories();
};
// Filter Articles by category
let categoriesLinks = document.querySelectorAll('.categories a');
let articles = document.querySelectorAll('.articles .article-card');
let activeCategory = 'all';
categoriesLinks.forEach((itm) => {
  itm.addEventListener('click', addSearchParam);
});

function filterCategories() {
  activeCategory = window.location.search.replace('?category=', '');
  if (!activeCategory) {
    document
      .querySelector('.categories a[data-category="all"]')
      .classList.add('active');
  } else {
    document
      .querySelector(`.categories a[data-category="${activeCategory}"]`)
      .classList.add('active');
    articles.forEach((card) => {
      if (card.dataset.category != activeCategory) {
        card.style.display = 'none';
      }
    });
  }
}

function addSearchParam(e) {
  activeCategory = e.target.dataset.category;
  if (activeCategory != 'all') {
    window.location.href =
      window.location.origin + `?category=${e.target.dataset.category}`;
  } else if (
    activeCategory === 'all' &&
    (window.location.search || window.location.pathname.includes('/article'))
  ) {
    window.location.href = window.location.origin;
  }
}
