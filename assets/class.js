class Juegos {
    constructor(id, titulo, genero, precio, imagen){

        this.id = id,
        this.titulo = titulo,
        this.genero = genero,
        this.precio = precio,
        this.imagen = imagen

    }

    mostrarData(){
        console.log(
            `El titulo es: ${this.titulo},
            El genero es: ${this.genero}
            Su precio es: ${this.precio}`)
    }
}

fetch("./assets/productos.json")
.then((res) => res.json())
.then((data) => {console.log(data)})

let catalogo = []
const cargarProductos = async() =>{
    const response = await fetch("./assets/productos.json")
    const data = await response.json()
    console.log(data)
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
    console.log("Seteando por primera vez el array")
    cargarProductos()
}


// const juego1 = new Juegos(1, "Survival Horror","Resident Evil 3 Nemesis", 2900, "re3.jpg")

// const juego2 = new Juegos(2,"Survival Horror", "Dead Space", 1500, "DS.jpg")

// const juego3 = new Juegos(3, "Survival Horror", "Silent Hill", 2800,"SH.jpg")

// const juego4 = new Juegos(4, "Lucha","Marvel vs Capcom", 1400,"MvsC.jpg")

// const juego5 = new Juegos(5, "Lucha", "Street Fighter", 1500,"SF.jpg")

// const juego6 = new Juegos(6, "Lucha", "Super Smash Bros: Ultimate", 2000,"SSBU.jpg")

// const juego7 = new Juegos(7, "Deportes", "Rocket League", 1000,"RL.jpg")

// const juego8 = new Juegos(8, "Deportes", "Fifa 22", 900,"Fifa22.jpg")

// const juego9 = new Juegos(9, "Deportes", "NBA2K22", 800,"NBA.jpg")

// const juego10 = new Juegos(10, "Aventuras", "God of War", 2100,"GOW.jpg")

// const juego11 = new Juegos(11, "Aventuras", "Assassins Creed Valhalla", 2700,"ACV.jpg")

// const juego12 = new Juegos(12, "Aventuras", "Sekiro: Shadows Die Twice", 2500,"sekiro.jpg")

