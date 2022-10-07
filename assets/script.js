
// Storage carrito
let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []

let divProductos = document.getElementById("productos")
function mostrarCatalogo(array){
    array.forEach((Juegos)=>{
        let nuevoProducto = document.createElement("div")
        nuevoProducto.innerHTML = ` <div class="tarjetas">
        <div id=${Juegos.id} class="tarjeta">
            <img class="imgJuego" src="./assets/img/${Juegos.imagen}" alt="${Juegos.titulo}">
            <h5 class="tarjeta__titulo">${Juegos.genero}</h5>
            <p class="tarjeta__genero">Genero:${Juegos.titulo}</p>
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
    localStorage.setItem("carrito", JSON.stringify( productosEnCarrito))
    //Alert con Sweeat Alert
    Swal.fire({
        title: "Ha agregado un producto",
        icon: "success",
        confirmButtonText: "Acepto",
        confirmButtonColor: "rgb(122, 8, 8)",
        timer: 3000,
        })
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
    acumulador == 0 ? parrafoCompra.innerHTML = `<strong>No hay productos en el carrtio</strong>` : parrafoCompra.innerHTML = `El total de su carrito es: ${acumulador}`

}

//Finalizar compra carrito
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
