//mostrar las imagenes de la api cada vez que se recarga la pagina
document.addEventListener("DOMContentLoaded", function () {
  imagenesApi();
});

//construir obtener las imagenes m¿y mostrarlas
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
    .catch((error) => console.error("Error fetching data:", error));
}

//funcion para obtener los datos de la api del clima
async function obtenerDatosClima(ciudad, apiKey) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=es&appid=${apiKey}`
    );
    if (response == null) {
      throw new Error('Error al obtener los datos del clima');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching: ", error);
    return null;
  }
}

//mostrar los datos de la api del clima
function mostrarDatos(clima, contenedor) {
  if (clima) {
    const ciudadNombre = clima.name;
    const temperaturaActual = clima.main.temp;
    const climaDescripcion = clima.weather[0].description;
    const temperaturaMinima = clima.main.temp_min;
    const temperaturaMaxima = clima.main.temp_max;

    const mostrarDatos = document.createElement("div");
    mostrarDatos.innerHTML = `
    <p>Ciudad: ${ciudadNombre}</p>
    <p>Temperatura actual: ${temperaturaActual}°C</p>
    <p>Descripción del clima: ${climaDescripcion}</p>
    <p>Temperatura mínima: ${temperaturaMinima}°C</p>
    <p>Temperatura máxima: ${temperaturaMaxima}°C</p>
    `;
    contenedor.appendChild(mostrarDatos);
  } else {
    const errorMensaje = document.createElement("p");
    errorMensaje.textContent = "No se pudo obtener los datos del clima.";
    contenedor.appendChild(errorMensaje);
  }
}

//llamamos a las dos funciones del clima y las iniciamos con sus parametros
function temperaturaApi() {
  const buscarCiudad = document.getElementById("buscarCiudad");
  const apiKey = "48399a1a479ec5f3c7478b3bc939a1db";

  const ciudad = buscarCiudad.value;

  const climaCiudades = document.querySelector(".Clima-ciudades");

  obtenerDatosClima(ciudad, apiKey).then((clima) => {
    mostrarDatos(clima, climaCiudades);
  });
}

//evento para buscar la ciudad ingresada por el usuario
document.querySelector(".btn-buscar").addEventListener("click", () => {
  temperaturaApi();
});
