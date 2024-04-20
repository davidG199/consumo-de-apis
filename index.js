//mostrar las imagenes de la api cada vez que se recarga la pagina
document.addEventListener("DOMContentLoaded", function () {
  imagenesApi();
  const btnBuscarPokemon = document.querySelector(".btn-buscar-pokemon");

  btnBuscarPokemon.addEventListener("click", () => {
    const inputPokemon = document.getElementById("buscarPokemon").value;
    obtenerPokemon(inputPokemon.toLowerCase());
  });
});

//construir obtener las imagenes y mostrarlas
function imagenesApi() {
  const imagenGaleria = document.getElementById("galeria-imagenes");

  fetch("https://jsonplaceholder.typicode.com/albums/1/photos")
    .then((response) => response.json())
    .then((galeria) => {
      galeria.slice(0, 10).forEach((foto) => {
        const img = document.createElement("img");
        img.src = foto.thumbnailUrl;
        img.alt = "imagen";
        img.classList.add("col", "mb-3");
        imagenGaleria.appendChild(img);
      });
    })
    .catch((error) => console.error("Error en obtener los datos:", error));
}

//funcion para obtener los datos de la api del clima
async function obtenerDatosClima(ciudad, apiKey) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=es&units=metric&appid=${apiKey}`
    );
    if (response == null) {
      throw new Error('Error al obtener los datos del clima');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching: ", error);
    mostrarError(error.message)
    return null;
  }
}

//mostrar los datos de la api del clima
function mostrarDatos(clima, contenedor) {
  if (clima) {
    const ciudadNombre = clima.name;
    const temperaturaActual = clima.main.temp;
    const temperaturaMinima = clima.main.temp_min;
    const temperaturaMaxima = clima.main.temp_max;
    const humedad = clima.main.humidity
    const icon = `https://openweathermap.org/img/wn/${clima.weather[0].icon}.png`

    const mostrarDatos = document.createElement("div");
    mostrarDatos.innerHTML =
    `
    <table class="table">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">ciudad</th>
      <th scope="col">Temperatura actual:</th>
      <th scope="col">Temperatura maxima:</th>
      <th scope="col">Temperatura minima</th>
      <th scope="col">Humedad</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td scope="row">
      <img src=${icon}></img>
      </td>
      <td>${ciudadNombre}</td>
      <td>${temperaturaActual}°</td>
      <td>${temperaturaMinima}°</td>
      <td>${temperaturaMaxima}°</td>
      <td>${humedad}%</td>
    </tr>
  </tbody>
</table>
    `;
    contenedor.appendChild(mostrarDatos);
  } else {
    alert("Error no se pueden traer los datos de la cuidad")
  }
}

//llamamos a las dos funciones del clima y las iniciamos con sus parametros
function temperaturaApi() {
  const buscarCiudad = document.getElementById("buscarCiudad");
  const apiKey = "48399a1a479ec5f3c7478b3bc939a1db";

  const ciudad = buscarCiudad.value;

  const climaCiudades = document.querySelector(".Clima-ciudades");

  obtenerDatosClima(ciudad, apiKey)
  .then((clima) => {
    console.log(clima);
    mostrarDatos(clima, climaCiudades);

  });

}

//evento para buscar la ciudad ingresada por el usuario
document.querySelector(".btn-buscar").addEventListener("click", () => {
  temperaturaApi();

});


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

function mostrarError(mensaje) {
  const listaPokemon = document.querySelector(".listaPokemon");
  listaPokemon.innerHTML = `<p>${mensaje}</p>`;
}
