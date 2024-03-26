const carritoCheck = JSON.parse(localStorage.getItem('carrito'));
console.log(carritoCheck);                      //BORRAR ACA DESPUES

// funcion para generar las tarjetas del carrito

 function generarCardsCarrito(arr){
    let contenedorTarjeta= document.querySelector('.card-container');
    arr.forEach(elemento => {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('card-checkout');

    tarjeta.innerHTML = `
    <img src="${elemento.imagenURL}" class="img-vestido" alt="vestido">
    <h3>${elemento.nombre}</h3> 
    <h4>Precio: ${elemento.precio}</h4>
    `;

    contenedorTarjeta.appendChild(tarjeta);
    });
 }


 //renderizar el carrito con asincronia
 async function renderizarCarro() {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        generarCardsCarrito(carritoCheck);
        
    } catch (error) {
        console.error('Error al renderizar el carrito:', error);
    }
}

// Función para limpiar el carrito


function limpiarCarrito() {
        localStorage.removeItem('carrito');
        
        const contenedorTarjeta = document.querySelector('.card-container');
        contenedorTarjeta.innerHTML = ''; 
        
        Swal.fire({
            title: "Atención!",
            text: "Tu carrito fue vaciado",
            icon: "warning"
        });
    }

// boton para eliminar carrito
document.addEventListener('DOMContentLoaded', function () {  // --------DUDA------  no entiendo porque hay que poner esto del DOMContetnLoaded, me ayude con chatgpt en esta funcion
    const clearCarroBtn = document.querySelector('.clear-carro');
    
    clearCarroBtn.addEventListener('click', limpiarCarrito);
    
    });

// funcion para el boton del checkout

function comprarCheckout() {
    const datosValidacionCheck = document.querySelectorAll('.form-control');
    let camposVacios = false;

    // Verificar si algún campo está vacío
    datosValidacionCheck.forEach(input => {
        if (input.value.trim() === '') { 
            camposVacios = true;
            return; 
        }
    });

    if (camposVacios) {
        Swal.fire({
            title: "Atención",
            text: "Debe completar todos los campos",
            icon: "warning"
        });
    } else {
        localStorage.removeItem('carrito');
        const contenedorTarjeta = document.querySelector('.card-container');
        contenedorTarjeta.innerHTML = '';
        datosValidacionCheck.forEach(input => {
            input.value = ''; 
        });

        Swal.fire({
            title: "Bravo!",
            text: "Tu reserva se completó con éxito!",
            icon: "success"
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const btnPagar = document.querySelector('.btn-compra');

    btnPagar.addEventListener('click', comprarCheckout);
});


renderizarCarro();




