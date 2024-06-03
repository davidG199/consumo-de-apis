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
      mostrarPokemon(data);
    })
    .catch((error) => {
      console.error("Error al obtener el Pokémon:", error);
      mostrarError(error.message);
    });
}

//mostrar el pokemon
function mostrarPokemon(pokemon) {
  const listaPokemon = document.querySelector(".listaPokemon");

  const div = document.createElement("div");
  div.classList.add("card", "w-50");

  const habilidades = pokemon.abilities.map((ability) => ability.ability.name);
  const peso = pokemon.weight;
  const altura = pokemon.height;

  div.innerHTML = `
        <img src="${
          pokemon.sprites.other.home.front_default
        }" class="card-img-top" alt="${pokemon.name}">
        <div class="card-body">
            <h5 class="card-title">${pokemon.name}</h5>
            <p class="card-text">Habilidades: ${habilidades.join(", ")}</p>
            <p class="card-text">Peso: ${peso / 10} kg</p>
            <p class="card-text">Altura: ${altura / 10} m</p>
        </div>
    `;
  listaPokemon.innerHTML = "";

  listaPokemon.appendChild(div);
}

//mostrar un mensaje de error si no se encuentra el pokemon
function mostrarError(mensaje) {
  const listaPokemon = document.querySelector(".listaPokemon");
  listaPokemon.innerHTML = `<p>${mensaje}</p>`;
}
