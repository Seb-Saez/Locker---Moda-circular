// cargar de forma asincronica los datos desde un json

let vestidos = [];

//fetch('../DB/db.json')
fetch('https://github.com/Seb-Saez/Locker---Moda-circular/blob/main/DB/db.json')
  .then(res => res.json())
  .then(data => {
    const { vestidos: vestidosData = [] } = data;
    vestidos = vestidosData; 
    //console.log(vestidos);   // log para verificar que los datos se cargaron bien
    generarTarjetas(vestidos, []);
  });

// Función para crear las tarjetas y poder filtrar por talles
function generarTarjetas(arrayDeVestidos, tallesSeleccionados) {
const contenedorTarjetas = document.querySelector('.card-container');
contenedorTarjetas.innerHTML = '';                                      // Limpiar contenido actual

arrayDeVestidos.forEach(vestido => {

  // Filtrar por talles seleccionados
  if (tallesSeleccionados.length === 0 || tallesSeleccionados.includes(vestido.talle)) {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('card');

    tarjeta.innerHTML = `
      <h3>${vestido.nombre}</h3>
      <img src="${vestido.img}" class="img-vestido" alt="vestido">
      <h4>Talle: <span>${vestido.talle}</span></h4>
      <h4>Precio: ${vestido.precio}</h4>
      <button class="btn-reserva" data-nombre=${vestido.nombre} data-precio=${vestido.precio} data-imgCarrito=${vestido.img}>Reservar</button>
    `;

    contenedorTarjetas.appendChild(tarjeta);
  }
});
}

// Filtrador de talles por checkbox

const talleCheckboxes = document.querySelectorAll('.talle-filters input');

talleCheckboxes.forEach(checkbox => {
checkbox.addEventListener('change', function () {
  const tallesSeleccionados = Array.from(talleCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  generarTarjetas(vestidos, tallesSeleccionados);
});
});

//generarTarjetas(vestidos, []); // mostrar las tarjetas



// Función para actualizar el carrito

function actualizarCarrito() {
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const total = carrito.reduce((sum, vestido) => sum + vestido.precio, 0);

// Renderizar el carrito en el DOM
document.getElementById('total-carrito').textContent = `Total: $ ${total} Pesos`;

const listaCarrito = document.getElementById('listaCarrito');

listaCarrito.innerHTML = '';                                          // Limpiar la lista

carrito.forEach(vestido => {
  const listItem = document.createElement('li');
  listItem.textContent = vestido.nombre;
  listaCarrito.appendChild(listItem);
});

// Guarda el carrito en el local storage
localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para limpiar el carrito con el boton "limpiar carrito"
function limpiarCarrito() {

localStorage.removeItem('carrito');
Swal.fire({
  title: "Atención!",
  text: "Tu carrito fue vaciado",
  icon: "warning"
});

actualizarCarrito(); // volver a actualizar la interfaz
}

// Evento de clic para el botón "limpiar carrito"
document.addEventListener('DOMContentLoaded', function () {  // --------DUDA------  no entiendo porque hay que poner esto del DOMContetnLoaded, me ayude con chatgpt en esta funcion
const clearCarroBtn = document.querySelector('.clear-carro');

clearCarroBtn.addEventListener('click', limpiarCarrito);

});

// Funcion para agregar los productos al carrito 

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn-reserva')) {
      const nombre = event.target.dataset.nombre;
      const precioString = event.target.dataset.precio;
      const imagenURL = event.target.closest('.card').querySelector('.img-vestido').src;

      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

      const vestidoExistente = carrito.find(vestido => vestido.nombre === nombre);

      if (vestidoExistente) {
          Swal.fire({
              title: "Atención!",
              text: "Este vestido ya está en el carrito.",
              icon: "warning"
          });
      } else {
          const precio = /^\d+(\.\d+)?$/.test(precioString) ? parseFloat(precioString) : 0;
          
          carrito.push({ nombre, precio, imagenURL }); // Guardar la URL de la imagen en el carrito
          
          Swal.fire({
              title: "Bravo!",
              text: "El vestido fue agregado al carrito con exito.",
              icon: "success"
          });

          // Guarda el carrito en el Local Storage
          localStorage.setItem('carrito', JSON.stringify(carrito));

          // Actualiza la interfaz del carrito de nuevo
          actualizarCarrito();
      }
  }
});




//funcion para barra buscador

const buscarInput = document.querySelector('.buscador-texto');

buscarInput.addEventListener('input', filterVestidos);


function filterVestidos() {
  const filtradorNav = buscarInput.value.toLowerCase();
  const navFiltrado = vestidos.filter(vestido => vestido.nombre.toLowerCase().includes(filtradorNav));
  generarTarjetas(navFiltrado, []);
}



// reiniciar la interfaz del carrito cuando recarga pagina
actualizarCarrito();
