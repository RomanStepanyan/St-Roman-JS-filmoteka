import toggleToWatched from './filmDetailsPage'
import toggleToQueue from './filmDetailsPage'
import showDetails from './filmDetailsPage'
import drawWatchedFilmList from './libraryPage'
import drawQueueFilmList from './libraryPage'
import renderFilms from './initialHomePage'


const homePageBtn = document.querySelector('#homePage-js');
const myLibraryPageBtn = document.querySelector('#myLibraryPage-js');
const detailsPage = document.querySelector('.detailsPage__block');
const myLibraryPage = document.querySelector('.myFilmLibraryPage__block');
const homePage = document.querySelector('.homePage__block');
const formSearch = document.querySelector('.homePage__form');
const homePageBtnLogo = document.querySelector('.header-logo');
let selectFilm = {};

const buttonWatch = document.querySelector('.js-buttonWatchedFilms');
const buttonQueue = document.querySelector('.js-buttonQueueFilms');

window.onload = showHomePage();

homePageBtn.addEventListener('click', showHomePage);
myLibraryPageBtn.addEventListener('click', showLibraryPage);
homePageBtnLogo.addEventListener('click', showHomePage);


function showHomePage() {
  myLibraryPage.classList.add('main__hidden');
  detailsPage.classList.add('main__hidden');
  formSearch.classList.remove('main__hidden');
  homePage.classList.remove('main__hidden');

  homePageBtn.classList.add('nav-list__item-hover');
  myLibraryPageBtn.classList.remove('nav-list__item-hover');
}

function showLibraryPage() {
  homePage.classList.add('main__hidden');
  detailsPage.classList.add('main__hidden');
  formSearch.classList.add('main__hidden');
  myLibraryPage.classList.remove('main__hidden');
  myLibraryPageBtn.classList.add('nav-bar__link-hover');
  homePageBtn.classList.remove('nav-bar__link-hover');

  buttonWatch.addEventListener('click', drawWatchedFilmList);
  buttonQueue.addEventListener('click', drawQueueFilmList);

  drawQueueFilmList();
}

export function activeDetailsPage(movieId, itsLibraryFilm) {
  homePage.classList.add('main__hidden');
  detailsPage.classList.remove('main__hidden');
  myLibraryPage.classList.add('main__hidden');

  if (itsLibraryFilm) {
    let allLocalStorageFilms = [];
    if (localStorage.getItem('filmsQueue') !== null) {
      allLocalStorageFilms.push(...JSON.parse(localStorage.getItem('filmsQueue')));
    };
    if (localStorage.getItem('filmsWatched') !== null) {
      allLocalStorageFilms.push(...JSON.parse(localStorage.getItem('filmsWatched')));
    };
    selectFilm = allLocalStorageFilms.find(el => el.id === movieId);
  } else {
    selectFilm = renderFilms.find(el => el.id === movieId);
  }
  showDetails(selectFilm);

  const buttonAddRemoveToWatched = document.querySelector('#watch');
  const buttonAddRemoveToQueue = document.querySelector('#queue');
  buttonAddRemoveToWatched.addEventListener('click', toggleToWatched);
  buttonAddRemoveToQueue.addEventListener('click', toggleToQueue);

  buttonWatch.removeEventListener('click', drawWatchedFilmList);
  buttonQueue.removeEventListener('click', drawQueueFilmList);
}
export {selectFilm}