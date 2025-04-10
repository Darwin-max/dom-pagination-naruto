import url, { get } from '../API/api.js';

let allCharacters = [];
let currentPage = 1;
const itemsPerPage = 4;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await get(url);
        allCharacters = data.characters;
        showPage(currentPage);
    } catch (error) {
        console.error('Error al traer los personajes:', error);
    }
});

const createCard = ({ name, images = [], personal = {}, debut = {} }) => {
    const card = document.createElement('div');
    card.className = 'card';

    const [img, imgAlt] = images;
    const imgActual = img || 'ruta/default.png';
    const imgAlterna = imgAlt || imgActual;

    card.innerHTML = `
        <img class="card-image" src="${imgActual}" alt="${name}">
        <h3 class="card-title">${name}</h3>
        <p class="card-head">Clan: ${personal.clan}</p>
        <p class="card-description">Debut: ${debut.manga }</p>
    `;

    const imagen = card.querySelector('.card-image');
    let indexImg = 0;
    const alternativas = [imgAlterna, imgActual];

    imagen.addEventListener('click', () => {
        indexImg = (indexImg + 1) % alternativas.length;
        imagen.src = alternativas[indexImg];
    });

    return card;
};

const showPage = (page) => {
    const cardsContainer = document.querySelector('.cards-container');
    cardsContainer.innerHTML = "";

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    allCharacters.slice(start, end).forEach(personaje =>
        cardsContainer.appendChild(createCard(personaje))
    );

    updatePagination();
};

const updatePagination = () => {
    const totalPages = Math.ceil(allCharacters.length / itemsPerPage);
    const buttons = document.querySelector('.pagination');

    buttons.innerHTML = `
        <button ${currentPage === 1 ? 'disabled' : ''} id="prev">Antes</button>
        <button disabled>Página ${currentPage} de ${totalPages}</button>
        <button ${currentPage === totalPages ? 'disabled' : ''} id="next">Después</button>
    `;

    buttons.querySelector('#prev')?.addEventListener('click', () => {
        currentPage--;
        showPage(currentPage);
    });

    buttons.querySelector('#next')?.addEventListener('click', () => {
        currentPage++;
        showPage(currentPage);
    });
};
