let btnWatch = document.elementById("btn-watch");
let video = document.elementById("video");  
let btnInvia = document.elementById("btn-invia");

btnWatch.addEventListener("click", function () {

    const film = {
        titolo: document.getElementById("titolo-film").value,
        durata: document.getElementById("durata-film").value,
        dataVisto: document.getElementById("data-visto").value,
        vistoCinema: document.getElementById("visto-cinema").checked
    }

    localStorage.setItem("film", JSON.stringify(film));

    alert("Dati del film salvati con successo!");
});