/* Variables */
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let addToCar = [];

allEvent();
function allEvent() {
    /* Cuando agregas un curso presionando "Agregar al Carrito" */
    listaCursos.addEventListener('click', seleccionarCurso);

    /* Elimina cursos del carrito */
    carrito.addEventListener('click', deleteCurso);

    /* Vaciar carrito */
    vaciarCarrito.addEventListener('click', () => {

        /* Vaciamos el arreglo */
        addToCar = [];

        /* Limpiamos el <tbody> */
        resetCar();
    });
}

/* FUNCIONES */

function seleccionarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        /* Apuntamos al contenedor padre <div.card> */
        const cursoSelected = e.target.parentElement.parentElement;

        obtenerDatosCurso(cursoSelected);
    }
}

/* Elimina un curso del carrito */
function deleteCurso(e) {

    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        /* Elimina del arreglo de addToCar por el data -id */
        addToCar = addToCar.filter((curso) => curso.id !== cursoId);

        createCarHTML(); /* Iteramos sobre el carrito y mostramos su HTML */
    }
}

/* Función para leer la información requerida del curso */
function obtenerDatosCurso(curso) {

    /* CREAMOS un objeto con la información del curso actual */
    const infoCurso = {
        imagen: curso.querySelector('.card img').src,
        nombre: curso.querySelector('.info-card h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('.info-card a').getAttribute('data-id'),
        cantidad: 1
    }

    /* Verificamos si el curso ya existe en el arreglo
    -> .some(), itera sobre un arreglo de objtos.   */
    const existe = addToCar.some(curso => curso.id === infoCurso.id);
    if (existe) {
        const curso = addToCar.map((curso) => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; /* Retorna le objeto actualizado */
            } else {
                return curso; /* Retorna los objetos no duplicados */
            }
        });
        addToCar = [...curso];
    } else {
        /* Si el curso no existe...
        Agrega el objeto infoCurso al arreglo addToCarrito[] */
        addToCar = [...addToCar, infoCurso];
    }

    console.log(addToCar);
    createCarHTML();
}

/* CREA un HTML donde muestra los productos en el carrito de compras */
function createCarHTML() {

    /* LIMPIA el carrito */
    resetCar();

    /* Itera sobre addToCar creando un <td> por cada objeto iterado */
    addToCar.forEach((curso) => {
        /* Aplicando Destructuring... */
        const { imagen, nombre, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

        /* AGREGA row al contenedor del carrito */
        contenedorCarrito.appendChild(row);

    });

}

/* ELIMINA los elementos que existan en el <tbody> */
function resetCar () {

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

    /* Otra manera de limpiar HTML, PERO DE UNA MANERA LENTA PARA JAVASCRIPT 
    -> contenedorCarrito.innerHTML = ""; */
}

