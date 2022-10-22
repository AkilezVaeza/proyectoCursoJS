
let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []

let divProductos = document.getElementById("productos")
function mostrarCatalogo(array){
    array.forEach((Juegos)=>{
        let nuevoProducto = document.createElement("div")
        nuevoProducto.innerHTML = ` <div class="tarjetas">
        <div id=${Juegos.id} class="tarjeta">
            <img class="imgJuego" src="./assets/img/${Juegos.imagen}" alt="${Juegos.titulo}">
            <h5 class="tarjeta__titulo">${Juegos.genero}</h5>
            <p class="tarjeta__genero">Genero: ${Juegos.titulo}</p>
            <p class="tarjeta__precio">Precio:${Juegos.precio}</p>
            <button id="agregarBtn${Juegos.id}" class="btns btnComprar">Agregar al Carrito</button>
        </div>
    </div>`
    divProductos.appendChild(nuevoProducto)

        let btnAgregar = document.getElementById(`agregarBtn${Juegos.id}`)
        btnAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(Juegos)
        })
    })
}

function agregarAlCarrito(Juegos){
    let juegoAgregado = productosEnCarrito.find((elem)=>(elem.id == Juegos.id))
    if(juegoAgregado == undefined){
        productosEnCarrito.push(Juegos)
        localStorage.setItem("carrito", JSON.stringify( productosEnCarrito))
        Swal.fire({
            title: "Ha agregado un producto",
            icon: "success",
            confirmButtonText: "Acepto",
            confirmButtonColor: "rgb(122, 8, 8)",
            timer: 3000,
            })
    }else{
        Swal.fire({
            title: "Producto ya agregado",
            text: `El juego ${Juegos.genero} ya se encuentra en el carrito.`,
            icon: "info",
            timer: 4500,
            confirmButtonText: "Aceptar",
            confirmButtonColor: `grey`,
        })
    }
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
                    <h4 class="card-title">${productoCarrito.genero}</h4>
                
                    <p class="card-text">$${productoCarrito.precio}</p> 
                    <button class= "btn" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"><img class="borrar" src="./assets/img/borrar.jpg" alt=""></i></button>
            </div>    
        </div>`

    })
    array.forEach((productoCarrito, indice)=>{
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click",()=>{
            array.splice(indice, 1)
            localStorage.setItem("carrito", JSON.stringify(array))


            
            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
            cardProducto.remove()
        })
    })
    compraTotal(array)
}

function compraTotal(array){
    let acumulador = 0

    acumulador = array.reduce((acumulador, productoCarrito)=>{
        return acumulador + productoCarrito.precio
    },0)
    acumulador == 0 ? parrafoCompra.innerHTML = `<strong><center>No hay productos en el carrtio</center></strong>` : parrafoCompra.innerHTML = `<center><strong>El total de su carrito es: ${acumulador}</center></strong>`

}

botonFinalizarCompra.addEventListener("click", ()=>{finalizarCompra()})
function finalizarCompra(){
    Swal.fire({
        title: 'Está seguro de realizar la compra',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then((result)=>{
        if(result.isConfirmed){
            Swal.fire({
                title:'Transacción Exitosa',
                icon:'success',
                confirmButtonColor:'green',
                text:'¡Gracias por su compra!',
            })
            productosEnCarrito = []
            localStorage.removeItem("carrito")
        }else{
            Swal.fire({
                title: 'Transacción Cancelada',
                icon: 'info',
                text: 'La compra no fue realizada, sus productos siguen en el carrito.',
                confirmButtonColor: 'green',
                timer: 4000
            })
        }
    })
}


let btnBuscar = document.getElementById("btnBuscar")
let buscador = document.getElementById("buscador")

btnBuscar.addEventListener("click", ()=>{
    event.preventDefault()
    let buscado = catalogo.filter(juego => juego.titulo.toLowerCase().includes(buscador.value.toLowerCase()) || juego.genero.toLowerCase().includes(buscador.value.toLocaleLowerCase()))
    console.log(buscado)
    if(buscado.length == 0 ){
        Swal.fire({
            title: 'No hay coincidencias',
            icon: 'error',
            text: 'No contamos con ese juego en el catalogo',
            confirmButtonColor: 'grey',
            timer: 4000
        })
    }else{
        divProductos.innerHTML = ""
        mostrarCatalogo(buscado)
    }
})

