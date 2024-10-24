document.addEventListener("DOMContentLoaded", function () {
  const btnBuscarPokemon = document.querySelector(".btn-buscar-pokemon");

  btnBuscarPokemon.addEventListener("click", () => {
    const inputPokemon = document.getElementById("buscarPokemon").value;
    obtenerPokemon(inputPokemon.toLowerCase());
  });
});

//funcion para llamar a la api y obtener el pokemon
function obtenerPokemon(nombrePokemon) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "No se encontró el Pokémon. Por favor, ingresa un nombre válido."
        );
      }
      return response.json();
    })
    .then((data) => {
      obtenerDescripcionPokemon(data); // Llamar a la función que obtiene la descripción
    })
    .catch((error) => {
      console.error("Error al obtener el Pokémon:", error);
      mostrarError(error.message);
    });
}

// Mostrar el Pokémon y su descripción
function mostrarPokemon(pokemon, descripcion) {
  const listaPokemon = document.querySelector(".listaPokemon");

  const habilidades = pokemon.abilities
    .map((ability) => ability.ability.name)
    .join(", ");
  const tipo = pokemon.types.map((type) => type.type.name);
  const peso = pokemon.weight / 10;
  const altura = pokemon.height / 10;
  const pokemonImg = pokemon.sprites.other.dream_world.front_default;

  const tiposHtml = tipo
    .map((tipo) => `<span class="pill ${tipo}">${tipo}</span>`)
    .join(" ");

  // Crear la card
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">
        ${pokemon.name.toUpperCase()}
      </h5>
      <p>
        ${descripcion}
        </p>
      <div>${tiposHtml}</div>
      <p>
        <strong>Habilidades:</strong> 
        ${habilidades}
      </p>
      <p>
        <strong>Peso:</strong> 
        ${peso} kg
      </p>
      <p>
      <strong>Altura:</strong> 
        ${altura} m
      </p>
      </div>
      <picture>
        <img src="${pokemonImg}" class="" alt="${pokemon.name}">
      </picture>
  `;

  // Limpiar el contenido anterior y añadir el nuevo
  listaPokemon.innerHTML = "";
  listaPokemon.appendChild(div);
}
// Función para obtener la descripción del Pokémon
function obtenerDescripcionPokemon(pokemon) {
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener la descripción del Pokémon.");
      }
      return response.json();
    })
    .then((data) => {
      // Buscar la descripción en español
      const descripcion =
        data.flavor_text_entries.find((entry) => entry.language.name === "es")
          ?.flavor_text || "Descripción no disponible.";
      mostrarPokemon(pokemon, descripcion);
    })
    .catch((error) => {
      console.error("Error al obtener la descripción del Pokémon:", error);
      mostrarPokemon(pokemon, "Descripción no disponible.");
    });
}

//mostrar un mensaje de error si no se encuentra el pokemon
function mostrarError(mensaje) {
  const listaPokemon = document.querySelector(".listaPokemon");
  listaPokemon.innerHTML = `<p>${mensaje}</p>`;
}
