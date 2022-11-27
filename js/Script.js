/*
!Consumir la API de Rick y Morty a través de REST, específicamente los personjes
*/
const url_personajes = "https://rickandmortyapi.com/api/character";
const contenedor_main = document.getElementById("contenedor_main");

function definirLimite() {

    // ! Primero necesito hacer la limitante, en este caso solo quiero 150 personajes, no quiero más
    let limite = "/[";

    for(let i = 1; i<= 100; i++){
        limite += String(i) + ",";
    }

    limite = limite.slice(0,-1);
    limite += "]";

    return limite;
}


function consultarPersonajes(url_personajes, publicarPersonajes) {

    url_personajes += definirLimite();
    
    fetch(url_personajes)
        .then(respuesta => respuesta.json())
        .then(respuesta => publicarPersonajes(respuesta))
        .catch(error => console.log("Error al consumir la API: " + error));
}

function publicarPersonajes(personajes) {

    personajes.forEach(personaje => {
        // !Una forma muy poderosa de usar HTML dentro de JS vanilla, se crea un fragmento HTML
        const contenido = document.createRange().createContextualFragment(`
            <div class="contenedor_personaje">
                <h2>${personaje.name}</h2>
                <img src="${personaje.image}" alt="No se encontró la imagen"></img>
                <h3>Estado: ${personaje.status}</h3>
                <h3>Especie: ${personaje.species}</h3>
                <h3>Genero: ${personaje.gender}</h3>
            </div>
            `); // ! El parámetro será el contenido HTML a publicar a través de una cadena dinámica con template String
        contenedor_main.append(contenido);
    });
    
}

consultarPersonajes(url_personajes, publicarPersonajes);
