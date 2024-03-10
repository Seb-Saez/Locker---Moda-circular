const vestidos = [
    { nombre: 'benjamin', talle: 'm', precio: '4800', img: './vestidos/benjamin_m.jpg' },
    { nombre: 'chuy', talle: 'm', precio: '4800', img: './vestidos/chuy_m.jpg' },
    { nombre: 'doha', talle: 's', precio: '4800', img: './vestidos/doha_s.jpg' },
    { nombre: 'gloss', talle: 's', precio: '4800', img: './vestidos/gloss_s.jpg' },
    { nombre: 'huali', talle: 'm', precio: '4800', img: './vestidos/huali_m.jpg' },
    { nombre: 'jazmin', talle: 's', precio: '4800', img: './vestidos/jazmin_s.jpg' },
    { nombre: 'margarita', talle: 'm', precio: '4800', img: './vestidos/margarita_m.jpg' },
    { nombre: 'merida', talle: 'u', precio: '4800', img: './vestidos/merida_u.jpg' },
    { nombre: 'moana', talle: 's', precio: '4800', img: './vestidos/moana_s.jpg' },
    { nombre: 'moon', talle: 'l', precio: '4800', img: './vestidos/moon_l.jpg' },
    { nombre: 'paula', talle: 'm', precio: '4800', img: './vestidos/paula_m.jpg' },
    { nombre: 'skipper', talle: 'talmle', precio: '4800', img: './vestidos/skipper_m.jpg' },
    { nombre: 'timon', talle: 's', precio: '4800', img:'./vestidos/timon_s.jpg' },
    { nombre: 'tressy', talle: 'm', precio: '4800', img:'./vestidos/tressy_m.jpg' },
    { nombre: 'valley', talle: 'u', precio: '4800', img:'./vestidos/valley_u.jpg' },
    { nombre: 'vison', talle: 's', precio: '4800', img:'./vestidos/vison_s.jpg' },
    { nombre: 'xiomi', talle: 'm', precio: '4800', img:'./vestidos/xiomi_m.jpg' },
]

function generarTarjetas(array) {
    const contenedorTarjetas = document.querySelector('.card-container'); //selector del contenedor html

    array.forEach(vestido => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('card');

        tarjeta.innerHTML = `
            <h3>${vestido.nombre}</h3>
            <img src="${vestido.img}" class="img-vestido" alt="vestido">
            <h4>Talle: ${vestido.talle}</h4>
            <h4>Precio: ${vestido.precio}</h4>
            <button class="btn-reserva">Reservar</button>
        `;

        contenedorTarjetas.appendChild(tarjeta);
    });
}

// Llamada a la función para generar las tarjetas
generarTarjetas(vestidos);
