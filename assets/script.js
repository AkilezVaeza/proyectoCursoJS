class Juegos {
    constructor(id, genero, titulo, precio, imagen){

        this.id = id,
        this.titulo = titulo,
        this.genero = genero,
        this.precio = precio
        this.imagen = imagen

    }

    mostrarData(){
        console.log(
            `El titulo es: ${this.titulo}
            El genero es: ${this.genero}
            Su precio es: ${this.precio}`)
    }
}

const juego1 = new Juegos(1, "Survival Horror","Resident Evil 3 Nemesis", 2900, "re3.jpg")

const juego2 = new Juegos(2,"Survival Horror", "Dead Space", 1500, "DS.jpg")

const juego3 = new Juegos(3, "Survival Horror", "Silent Hill", 2800,"SH.jpg")

const juego4 = new Juegos(4, "Lucha","Marvel vs Capcom", 1400,"MvsC.jpg")

const juego5 = new Juegos(5, "Lucha", "Street Fighter", 1500,"SF.jpg")

const juego6 = new Juegos(6, "Lucha", "Super Smash Bros: Ultimate", 2000,"SSBU.jpg")

const juego7 = new Juegos(7, "Deportes", "Rocket League", 1000,"RL.jpg")

const juego8 = new Juegos(8, "Deportes", "Fifa 22", 900,"Fifa22.jpg")

const juego9 = new Juegos(9, "Deportes", "NBA2K22", 800,"NBA.jpg")

const juego10 = new Juegos(10, "Aventuras", "God of War", 2100,"GOW.jpg")

const juego11 = new Juegos(11, "Aventuras", "Assassins Creed Valhalla", 2700,"ACV.jpg")

const juego12 = new Juegos(12, "Aventuras", "Sekiro: Shadows Die Twice", 2500,"sekiro.jpg")


let productosEnCarrito = []
const catalogo= []
catalogo.push(juego1, juego2, juego3, juego4, juego5, juego6, juego7, juego8, juego9, juego10, juego11, juego12)


let divProductos = document.getElementById("productos")
function mostrarCatalogo(array){
    array.forEach((Juegos)=>{
        let nuevoProducto = document.createElement("div")
        nuevoProducto.innerHTML = ` <div class="tarjetas">
        <div id=${Juegos.id} class="tarjeta">
            <img class="imgJuego" src="./assets/img/${Juegos.imagen}" alt="${Juegos.titulo}">
            <h5 class="tarjeta__titulo">${Juegos.titulo}</h5>
            <p class="tarjeta__genero">Genero:${Juegos.genero}</p>
            <p class="tarjeta__precio">Precio:${Juegos.precio}</p>
            <button id="agregarBtn${Juegos.id}" class="btns btnComprar">Agregar al Carrito</button>
        </div>
    </div>`
    divProductos.appendChild(nuevoProducto)

        let btnAgregar = document.getElementById(`agregarBtn${Juegos.id}`)
        console.log(btnAgregar)
        btnAgregar.addEventListener("click", ()=>{
            console.log(Juegos)
            agregarAlCarrito(Juegos)
        })
    })
}

function agregarAlCarrito(Juegos){
    productosEnCarrito.push(Juegos)
    console.log(productosEnCarrito)
}

let btnMostrarCatalogo = document.getElementById("verCatalogo")
btnMostrarCatalogo.addEventListener("click", ()=>{
    mostrarCatalogo(catalogo)
})

function ocultarCatalogo(){
    divProductos.innerHTML = ""
}

let btnOcultarCatalogo = document.getElementById("ocultarCatalogo")
btnOcultarCatalogo.onclick = ocultarCatalogo

//Storge
let juego1JSON = JSON.stringify(juego1)

localStorage.setItem("objetoJuego", juego1)
localStorage.setItem("objetoJuegoJSON", juego1JSON)

let juegoStorage = localStorage.getItem("objetoJuego")
console.log(juegoStorage)



//DOM CARRITO
let botonCarrito = document.getElementById("botonCarrito")
let modalBody = document.getElementById("modal-body")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
let parrafoCompra = document.getElementById('precioTotal')

botonCarrito.addEventListener("click", ()=>{
    cargarProductosCarrito(productosEnCarrito)
})
function cargarProductosCarrito(array){

    modalBody.innerHTML = ""
    array.forEach((productoCarrito)=>{

        modalBody.innerHTML += `
        <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
            <img class="card-img-top" src="./assets/img/${productoCarrito.imagen}" alt="${productoCarrito.titulo}">
            <div class="card-body">
                    <h4 class="card-title">${productoCarrito.titulo}</h4>
                
                    <p class="card-text">$${productoCarrito.precio}</p> 
                    <button class= "btn" id="botonEliminar"><i class="fas fa-trash-alt"><img class="borrar" src="./assets/img/borrar.jpg" alt=""></i></button>
            </div>    
        </div>`

    })
    // Calcular el total
    compraTotal(array)
}

function compraTotal(array){
    let acumulador = 0

    acumulador = array.reduce((acumulador, productoCarrito)=>{
        return acumulador + productoCarrito.precio
    },0)
    if(acumulador == 0){
        parrafoCompra.innerHTML = `<strong>No hay productos en el carrtio</strong>`
    }
    else{
        parrafoCompra.innerHTML = `El total de su carrito es: ${acumulador}`
    }
}