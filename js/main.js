
import url, { get } from '../API/api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const cards = document.querySelectorAll('.card');

    try {
        const data = await get(url);
        const personajes = data.characters;

        cards.forEach((card, index) => {
            const personaje = personajes[index];
            if (!personaje) return;

            const imagen = card.querySelector('.card-image');
            const titulo = card.querySelector('.card-title');
            const head = card.querySelector('.card-head');
            const description = card.querySelector('.card-description');

            imagen.src = personaje.images?.[0];
            titulo.textContent = personaje.name;
            head.textContent = `Clan: ${personaje.personal.clan}`;
            description.textContent = `Debut: ${personaje.debut.manga}`;

            const imagenesAlternativas = [
                personaje.images?.[1] || personaje.images?.[0],
                personaje.images?.[0]
            ];
            let indexImg = 0;

            imagen.addEventListener('click', () => {
                indexImg = (indexImg + 1) % imagenesAlternativas.length;
                imagen.src = imagenesAlternativas[indexImg];
            });
        });
    } catch (error) {
        console.error('Error al traer los personajes:', error);
    }
});
