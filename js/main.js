// const vestidos = [
//   { nombre: 'benjamin', talle: 'm', precio: 4800, img: './vestidos/benjamin_m.jpg' },
//   { nombre: 'chuy', talle: 'm', precio: 4800, img: './vestidos/chuy_m.jpg' },
//   { nombre: 'doha', talle: 's', precio: 4800, img: './vestidos/doha_s.jpg' },
//   { nombre: 'gloss', talle: 's', precio: 4800, img: './vestidos/gloss_s.jpg' },
//   { nombre: 'huali', talle: 'm', precio: 4800, img: './vestidos/huali_m.jpg' },
//   { nombre: 'jazmin', talle: 's', precio: 4800, img: './vestidos/jazmin_s.jpg' },
//   { nombre: 'margarita', talle: 'm', precio: 4800, img: './vestidos/margarita_m.jpg' },
//   { nombre: 'merida', talle: 'u', precio: 4800, img: './vestidos/merida_u.jpg' },
//   { nombre: 'moana', talle: 's', precio: 4800, img: './vestidos/moana_s.jpg' },
//   { nombre: 'moon', talle: 'l', precio: 4800, img: './vestidos/moon_l.jpg' },
//   { nombre: 'paula', talle: 'm', precio: 4800, img: './vestidos/paula_m.jpg' },
//   { nombre: 'skipper', talle: 'm', precio: 4800, img: './vestidos/skipper_m.jpg' },
//   { nombre: 'timon', talle: 's', precio: 4800, img:'./vestidos/timon_s.jpg' },
//   { nombre: 'tressy', talle: 'm', precio: 4800, img:'./vestidos/tressy_m.jpg' },
//   { nombre: 'valley', talle: 'u', precio: 4800, img:'./vestidos/valley_u.jpg' },
//   { nombre: 'vison', talle: 's', precio: 4800, img:'./vestidos/vison_s.jpg' },
//   { nombre: 'xiomi', talle: 'm', precio: 4800, img:'./vestidos/xiomi_m.jpg' },
// ]

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
      <button class="btn-reserva" data-nombre=${vestido.nombre} data-precio=${vestido.precio}>Reservar</button>
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


//Funcion para agregar los productos al carrito
document.addEventListener('click', function (event) {
if (event.target.classList.contains('btn-reserva')) {
  const nombre = event.target.dataset.nombre;
  const precioString = event.target.dataset.precio;

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
    carrito.push({ nombre, precio });
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

//usar asincronia y fetch para cargar el array desde un json


fetch('../DB/db.json')
.then(res => res.json())
.then(data =>{
  const {vestidos=[]} = data;
  //console.log(vestidos);
  generarTarjetas(vestidos, []);
})


// reiniciar la interfaz del carrito cuando recarga pagina
actualizarCarrito();
