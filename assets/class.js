class Juegos {
    constructor(id, titulo, genero, precio, imagen){

        this.id = id,
        this.titulo = titulo,
        this.genero = genero,
        this.precio = precio,
        this.imagen = imagen

    }

}

fetch("./assets/productos.json")
.then((res) => res.json())

let catalogo = []
const cargarProductos = async() =>{
    const response = await fetch("./assets/productos.json")
    const data = await response.json()

    for(let juego of data){
        let juegoNuevo = new Juegos(juego.id, juego.titulo, juego.genero, juego.precio, juego.imagen)
        catalogo.push(juegoNuevo)
    }
    localStorage.setItem("catalogo", JSON.stringify(catalogo))
}

if(localStorage.getItem("catalogo")){
    catalogo = JSON.parse(localStorage.getItem("catalogo"))
}
else{
    cargarProductos()
}