//mostrar las imagenes de la api cada vez que se recarga la pagina
document.addEventListener("DOMContentLoaded", function () {
  imagenesApi();
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


