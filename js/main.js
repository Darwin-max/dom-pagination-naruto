// Importamos la URL y la función GET desde nuestro archivo API
import url, { get } from "../API/api.js";

// Variables globales
let allCharacters = []; // Aquí se guardarán todos los personajes
let currentPage = 1; // Página actual que se está mostrando
const itemsPerPage = prompt("Ingrese el número de personajes por página");

// Esperamos a que todo el DOM esté cargado para ejecutar el código
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Hacemos la petición a la API para obtener los personajes
    const { characters } = await get(url);
    allCharacters = characters; // Guardamos los personajes en la variable global

    // Mostramos la primera página de personajes
    showPage(currentPage);
  } catch (e) {
    // Si algo falla, mostramos el error en consola
    console.error("Error al traer los personajes:", e);
  }
});

// Función que crea una tarjeta (card) con la info de un personaje
const createCard = ({ name, images = [], personal = {}, debut = {} }) => {
  const card = document.createElement("div"); // Creamos el contenedor
  card.className = "card"; // Le asignamos la clase CSS

  // Extraemos las imágenes (principal y alternativa), o ponemos una por defecto
  const [img = "ruta/default.png", alt = "ruta/default.png"] = images;

  // Le ponemos contenido HTML con los datos del personaje
  card.innerHTML = `
        <img class="card-image" src="${img}" alt="${name}">
        <h3 class="card-title">${name}</h3>
        <p class="card-head">Clan: ${personal.clan || "Desconocido"}</p>
        <p class="card-description">Debut: ${debut.manga || "No disponible"}</p>
    `;

  // Lógica para cambiar entre la imagen principal y la alternativa al hacer clic
  const imagen = card.querySelector(".card-image");
  let index = 0;
  const opciones = [alt, img]; // Lista de imágenes para alternar

  // Cambia la imagen cada vez que se hace clic
  imagen.onclick = () => (imagen.src = opciones[++index % opciones.length]);

  return card; // Devolvemos la tarjeta para que pueda ser agregada al DOM
};

// Función para mostrar una página específica de personajes
const showPage = (page) => {
  const cards = document.querySelector(".cards-container"); // Contenedor donde van las tarjetas
  cards.innerHTML = ""; // Limpiamos las tarjetas anteriores

  // Calculamos el índice de inicio y final para los personajes a mostrar
  const start = (page - 1) * itemsPerPage;

  // Tomamos solo los personajes de esta página y generamos sus tarjetas
  allCharacters
    .slice(start, start + itemsPerPage)
    .forEach((p) => cards.appendChild(createCard(p)));

  // Actualizamos los botones de paginación después de mostrar la nueva página
  updatePagination();
};

// Función reutilizable para crear botones de paginación
const createButton = (text, disabled, onClick, active = false) => {
  const btn = document.createElement("button"); // Creamos el botón
  btn.textContent = text; // Texto del botón

  if (disabled) btn.disabled = true; // Lo deshabilitamos si se necesita
  if (active) btn.classList.add("active"); // Si es la página actual, le damos clase "active"

  btn.onclick = onClick; // Asignamos su función al hacer clic
  return btn; // Devolvemos el botón
};

// Función que crea y actualiza los botones de paginación
const updatePagination = () => {
  const totalPages = Math.ceil(allCharacters.length / itemsPerPage); // Total de páginas
  const buttons = document.querySelector(".pagination"); // Contenedor de botones
  buttons.innerHTML = ""; // Limpiamos los botones anteriores

  // Botón "Antes" (solo se habilita si no estamos en la primera página)
  buttons.appendChild(createButton("Antes", currentPage === 1, () =>
    showPage(--currentPage))
  );

  // Botones numéricos para cada página
  for (let i = 1; i <= totalPages; i++) {
    buttons.appendChild(
      createButton(i, false,() => 
        showPage((currentPage = i)),
        i === currentPage // Activamos solo el botón de la página actual
      )
    );
  }

  // Botón "Después" (solo se habilita si no estamos en la última página)
  buttons.appendChild(createButton("Después", currentPage === totalPages, () =>
      showPage(++currentPage)
    )
  );
};
