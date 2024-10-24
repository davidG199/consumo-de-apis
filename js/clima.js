//funcion para obtener los datos de la api del clima
async function obtenerDatosClima(ciudad, apiKey) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=es&units=metric&appid=${apiKey}`
    );
    if (response == null) {
      throw new Error("Error al obtener los datos del clima");
    }
    const data = response.json();
    console.log(data);
    return await data;
  } catch (error) {
    console.error("Error fetching: ", error);
    mostrarError(error.message);
    return null;
  }
}

//mostrar los datos de la api del clima
function mostrarDatos(clima, contenedor) {

  let mostrarDatos = contenedor.querySelector(".card"); // Buscar si ya existe una card

  if (!mostrarDatos) {
    // Si no existe, crear una nueva card
    mostrarDatos = document.createElement("div");
    mostrarDatos.classList.add("card");
    contenedor.appendChild(mostrarDatos); // Añadirla al contenedor
  }

  
  if (clima) {
    const ciudadNombre = clima.name;
    const temperaturaActual = clima.main.temp;
    const temperaturaMinima = clima.main.temp_min;
    const temperaturaMaxima = clima.main.temp_max;
    const humedad = clima.main.humidity;
    const icon = `https://openweathermap.org/img/w/${clima.weather[0].icon}.png`;
    const description = clima.weather[0].description;

    
    mostrarDatos.innerHTML = `
    <div>
      <p class="description-cli">${description}</p>
      <img src=${icon} width=50 heigth=50></img>
    </div>
      <div class="card-body">
        <div>
          <p>Temperatura Actual</p>
          <p>${temperaturaActual}°c</p>
        </div>
        <div>
          <p>Temperatura maxima</p>
          <p>${temperaturaMaxima}°c</p>
        </div>
        <div>
          <p>Temperatura minima</p>
          <p>${temperaturaMinima}°c</p>
        </div>
        <div>
          <p>humedad</p>
          <p>${humedad}</p>
        </div>
      </div>
      `;
  } else {
    alert("Error no se pueden traer los datos de la cuidad");
  }
}

//llamamos a las dos funciones del clima y las iniciamos con sus parametros
function temperaturaApi() {
  const buscarCiudad = document.getElementById("buscarCiudad");
  const apiKey = "48399a1a479ec5f3c7478b3bc939a1db";

  const ciudad = buscarCiudad.value;

  const climaCiudades = document.querySelector(".Clima-ciudades");

  obtenerDatosClima(ciudad, apiKey).then((clima) => {
    console.log(clima);
    mostrarDatos(clima, climaCiudades);
  });
}

//evento para buscar la ciudad ingresada por el usuario
document.querySelector(".btn-buscar").addEventListener("click", () => {
  temperaturaApi();
});
