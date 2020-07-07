const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const SERVER = 'https://api.themoviedb.org/3';
const API_KEY = '4caae6ba2aef660ad94e99e520a25b84';

//основыне константы

const leftMenu = document.querySelector('.left-menu'),
    hamburger = document.querySelector('.hamburger'),
    tvShowsList = document.querySelector('.tv-shows__list'),
    modal = document.querySelector('.modal'),
    tvShows = document.querySelector('.tv-shows'),
    tvCardImg = document.querySelector('.tv-card__img'),
    modalTitle = document.querySelector('.modal__title'),
    genresList = document.querySelector('.genres-list'),
    rating = document.querySelector('.rating'),
    description = document.querySelector('.description'),
    modalLink = document.querySelector('.modal__link'),
    searchForm = document.querySelector('.search__form'),
    searchFormInput = document.querySelector('.search__form-input'),
    dropdown = document.querySelectorAll('.dropdown'),
    tvShowsHead = document.querySelector('.tv-shows__head');

const loading = document.createElement('div');
loading.className = 'loading';

const preloader = document.querySelector('.preloader');


const DBService = class {
    getData = async (url) => {
        const res = await fetch(url)
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(`не удалось получить даные по адресу ${url}`);
        }
    }

    getSearchResult = query => {
        return this.getData(`${SERVER}/search/tv?api_key=${API_KEY}&language=ru-RU&query=${query}`);
    }

    getTvShows = id =>{
        return this.getData(`${SERVER}/tv/${id}?api_key=${API_KEY}&language=ru-RU`);
    }

    getTopRated = () => this.getData(`${SERVER}/tv/top_rated?api_key=${API_KEY}&language=ru-RU`);
    
    getPopular = () => this.getData(`${SERVER}/tv/popular?api_key=${API_KEY}&language=ru-RU`);
    
    getToday = () => this.getData(`${SERVER}/tv/airing_today?api_key=${API_KEY}&language=ru-RU`);
    
    getWeek = () => this.getData(`${SERVER}/tv/on_the_air?api_key=${API_KEY}&language=ru-RU`);

}


const renderCard = (response, target ) => {
    tvShowsList.textContent = '';

    if (!response.total_results) {
        loading.remove();
        tvShowsHead.textContent = ('По вышему запросу сериалов не найдено');
    }
    tvShowsHead.textContent = target ? target.textContent : 'Результат поиска';

    
        response.results.forEach(item => {
            const {
                backdrop_path: backdrop, 
                name: title, 
                poster_path: poster,
                vote_average: vote,
                id
            } = item;
    
            const posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg';
            const backdropIMG = backdrop ? IMG_URL + backdrop : '';
            const voteElem = vote ? `<span class="tv-card__vote">${vote}</span>` : '';
            
            
            
    
            const card = document.createElement('li');
            card.className = 'tv-shows__item';
            card.innerHTML = `
                        <a href="#" id="${id}" class="tv-card">
                            ${voteElem}
                            <img class="tv-card__img"
                                 src="${posterIMG}"
                                 data-backdrop="${backdropIMG}"
                                 alt="${title}">
                            <h4 class="tv-card__head">${title}</h4>
                        </a>
            `;
            loading.remove();
            tvShowsList.append(card);
        });
    
};

searchForm.addEventListener('submit', event =>{
    event.preventDefault();
    const value = searchFormInput.value.trim(); 
    if (value) {
        
        tvShows.append(loading);
        new DBService().getSearchResult(value).then(renderCard);   
    }
    searchFormInput.value = '';
});



// меню  
const closeDropdown = () =>{
    dropdown.forEach(item => {
        item.classList.remove('active');
    })
}

hamburger.addEventListener('click', event => {
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
    closeDropdown();
});

document.addEventListener('click', event => {
    const target = event.target;
    if (!target.closest('.left-menu')) {
        leftMenu.classList.remove('openMenu');
        hamburger.classList.remove('open');
        closeDropdown();
    };
});

leftMenu.addEventListener('click', event => {
    const target = event.target,
        dropdown = target.closest('.dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
        leftMenu.classList.add('openMenu');
        hamburger.classList.add('open');
    }

    if (target.closest('#top-rated')) {
        new DBService().getTopRated().then((response) => renderCard(response, target));
    }
    if (target.closest('#popular')) {
        new DBService().getPopular().then((response) => renderCard(response, target));
    }
    if (target.closest('#week')) {
        new DBService().getWeek().then((response) => renderCard(response, target));
    }
    if (target.closest('#today')) {
        new DBService().getToday().then((response) => renderCard(response, target));   
    }

    if (target.closest('#search')) {
        tvShowsList.textContent = '';
        tvShowsHead.textContent = '';
    }
});

// модальное окно

tvShowsList.addEventListener('click', event => {
    event.preventDefault();
    const target = event.target,
        card = target.closest('.tv-card');

    if (card) {
        preloader.style.display = 'block';

        new DBService().getTvShows(card.id)
            .then(response => {
            tvCardImg.src = response.poster_path ? IMG_URL + response.poster_path : 'img/no-poster.jpg';  
            tvCardImg.alt = response.name;
            modalTitle.textContent = response.name;
            genresList.textContent = '';
            for (const item of response.genres) {
                genresList.innerHTML += `<li style ='text-transform: capitalize'>${item.name}</li>`
            }
            rating.textContent = response.vote_average;
            description.textContent = response.overview;
            modalLink.href = response.homepage;
            })

            .then(() => {
                document.body.style.overflow = 'hidden';
                modal.classList.remove('hide');
            })
            .finally(() => {
                preloader.style.display = ''
            })
            
    }
});

modal.addEventListener('click', event => {
    const target = event.target,
        cross = target.closest('.cross'),
        modalRemove = target.classList.contains('modal');

    if (cross || modalRemove) {
        document.body.style.overflow = '';
        modal.classList.add('hide');
    }
});

// смена карточки

const chahgeImage = event => {
    const card = event.target.closest('.tv-shows__item');

    if (card) {
        const img = card.querySelector('.tv-card__img');
        if (img.dataset.backdrop) {
            [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src]
        }
    }
};

tvShowsList.addEventListener('mouseover', chahgeImage);
tvShowsList.addEventListener('mouseout', chahgeImage);