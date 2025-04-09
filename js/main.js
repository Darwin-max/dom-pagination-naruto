
document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card');
    const imagen = document.querySelector('.card-image');

    const imagenes = [
        'https://static.wikia.nocookie.net/naruto/images/d/d6/Naruto_Part_I.png',
        'https://static.wikia.nocookie.net/naruto/images/7/7d/Naruto_Part_II.png'
    ];

    let index = 0;

    imagen.addEventListener('click', () => {
     
        index = (index + 1) % imagenes.length;
        imagen.src = imagenes[index];
    });
    const titulo = card.querySelector('.card-title');
    titulo.textContent = 'Naruto';
    const head = card.querySelector('.card-head');
    head.textContent = 'Naruto Shippuden';
    const description = card.querySelector('.card-description');
    description.textContent = 'Naruto Shippuden is a Japanese manga series written and illustrated by Masashi Kishimoto. It was serialized in Shogakukan\'s Weekly Shōnen Jump magazine from 1994 to 2002, with its chapters collected in twenty-four tankōbon volumes.';
})