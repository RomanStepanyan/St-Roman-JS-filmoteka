import selectFilm from './navigation';

const details = document.querySelector('.detailsPage__block');

function monitorButtonStatusText() {
  const iconQueue = document.querySelector('.film-card__icon-queue');
  const btnToQueue = document.querySelector('.js-to-queue');

  const iconWatched = document.querySelector('.film-card__icon-watch');
  const btnToWatched = document.querySelector('.js-to-watched');

  let lsWatchedList = JSON.parse(localStorage.getItem('filmsWatched'));
  if (lsWatchedList !== null) {
    if (lsWatchedList.find(el => el.id === selectFilm.id)) {
      iconWatched.textContent = '🗑️';
      btnToWatched.textContent = 'Delete from watched';
    } else {
      iconWatched.textContent = '📽️';
      btnToWatched.textContent = 'Add to watched';
    }
  }

  let lsQueueList = JSON.parse(localStorage.getItem('filmsQueue'));
  if (lsQueueList !== null) {
    if (lsQueueList.find(el => el.id === selectFilm.id)) {
      iconQueue.textContent = '➖';
      btnToQueue.textContent = 'Delete from queue';
    } else {
      iconQueue.textContent = '➕';
      btnToQueue.textContent = 'Add to queue';
    }
  }
}

export function toggleToWatched() {
  monitorButtonStatusText();
  let watchedList = [];
  let lsWatchedList = JSON.parse(localStorage.getItem('filmsWatched'));
  if (lsWatchedList !== null) {
    watchedList = [...lsWatchedList];
  }
  if (watchedList.find(el => el.id === selectFilm.id)) {
    watchedList = watchedList.filter(el => el.id !== selectFilm.id);
  } else {
    watchedList.push(selectFilm);
  }
  localStorage.setItem('filmsWatched', JSON.stringify(watchedList));
  monitorButtonStatusText();
}

export function toggleToQueue() {
  monitorButtonStatusText();
  let queueList = [];
  let lsQueueList = JSON.parse(localStorage.getItem('filmsQueue'));
  if (lsQueueList !== null) {
    queueList = [...lsQueueList];
  }
  if (queueList.find(el => el.id === selectFilm.id)) {
    queueList = queueList.filter(el => el.id !== selectFilm.id);
  } else {
    queueList.push(selectFilm);
  }
  localStorage.setItem('filmsQueue', JSON.stringify(queueList));
  monitorButtonStatusText();
}

export function showDetails(selectFilm) {
  details.innerHTML = '';
  const imagePosterPath = `https://image.tmdb.org/t/p/w500/${selectFilm.poster_path}`;
  // const img = document.createElement('img');
  // img.classList.add('film-card__img')
  // img.setAttribute('src', `${imagePosterPath}`);
  // details.append(img);
  // monitorButtonStatusText();

  details.insertAdjacentHTML(
    'afterbegin',
    `<div class="film-card">
    <img src=${imagePosterPath} alt="film-img" class="film-card__img">
    <div class="film-card__details">
<h2 class="film-card__title"> ${
      selectFilm.title
    }<span class="film-card__release">${
      selectFilm.release_date.split('-')[0]
    }</span></h2>
      <ul class="film-card__info-list info-list">
        <li class="info-list__item">
          <p class="info-list__keywords">vote</p>
          <p class="info-list__value">${selectFilm.vote_average} </p>
        </li>
        <li class="info-list__item">
          <p class="info-list__keywords">popularity</p>
          <p class="info-list__value">${selectFilm.popularity}</p>
        </li>
        <li class="info-list__item">
          <p class="info-list__keywords">original title</p>
          <p class="info-list__value">${selectFilm.original_title}</p>
        </li>
        <li class="info-list__item">
          <p class="info-list__keywords">genre</p>
          <p class="info-list__value">${genres
            .filter(el => selectFilm.genre_ids.find(item => el.id === item))
            .reduce((acc, el) => acc + `${el.name} `, '')}</p>
        </li>
      </ul>
      <div class="film-card__about about">
        <h2 class="film-card__title">About</h2>
        <p class="film-card__text">${selectFilm.overview}</p>
      </div>
      <ul class="film-card__btn-list">
        <li class="btn-list__item" id="watch">
        <span class="film-card__icon-watch"></span>
          <button type="button" class="btn btn__to-watch js-to-watched" data-action="add" id="watch">Add to watched</button>
        </li>
        <li class="btn-list__item" id="queue">
          <span class="film-card__icon-queue"></span>
          <button type="button" class="btn btn__to-queue js-to-queue">Add to queue</button>
        </li>
      </ul>
    </div>
  </div>`,
  );

  monitorButtonStatusText();
}
