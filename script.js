let btnInvia = document.getElementById("btn-invia");


const film = JSON.parse(localStorage.getItem("film"));

if (film) {
    console.log(film.titolo);
    console.log(film.durata);
    console.log(film.dataVisto);
    console.log(film.vistoCinema ? "Visto al cinema" : "Non visto al cinema");
}
btnInvia.addEventListener("click", function () {

    const film = {
        titolo: document.getElementById("titolo-film").value,
        durata: document.getElementById("durata-film").value,
        dataVisto: document.getElementById("data-visto").value,
        vistoCinema: document.getElementById("visto-cinema").checked
    };

    localStorage.setItem("film", JSON.stringify(film));

    alert("Dati del film salvati con successo!");
});

async function gestisciRichiesta() {
    let risposta = await fetch("https://www.");
    method: "POST",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify({
    });
}

const oggettoRichiesta = {
    "contents": [
        {
        "parts":[{ "text": "Qui devi inserire il prompt" }]
        ]
    }   
}