// Creiamo una lista (array) vuota che conterrà tutti i nostri film.
// Come richiesto, parte vuota e verrà riempita successivamente.
let listaFilm = [];


// CARICAMENTO AUTOMATICO DATI ALL'AVVIO
// Controlliamo se ci sono già dei film salvati nella memoria del browser (LocalStorage)
let filmSalvatiAutomatici = JSON.parse(localStorage.getItem("listaFilm")) || [];
if (filmSalvatiAutomatici.length > 0) {
    listaFilm = filmSalvatiAutomatici;
}


// FUNZIONE PER MOSTRARE I FILM NELLA TABELLA HTML
function mostraFilm() {
    const corpoTabella = document.getElementById('corpoTabella');
    
    if (corpoTabella) {
        corpoTabella.innerHTML = "";

        listaFilm.forEach(function(film, indice) {
            
            let dataFormattata = "Non specificata";
            if (film.data) {
                let partiData = film.data.split("-"); 
                dataFormattata = partiData[2] + "-" + partiData[1] + "-" + partiData[0]; 
            }

            let vistoAlCinema = "No";
            if (film.cinema === true) {
                vistoAlCinema = "Sì";
            }

            corpoTabella.innerHTML += `
                <tr>
                    <td>${film.nome}</td>
                    <td>${film.durata} min</td>
                    <td>${dataFormattata}</td>
                    <td>${vistoAlCinema}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="eliminaFilm(${indice})">Elimina</button>
                    </td>
                </tr>
            `;
        });
    }

    const contatoreTotale = document.getElementById('contatoreTotale');
    if (contatoreTotale) {
        contatoreTotale.innerText = "Totale film registrati: " + listaFilm.length;
    }
}

// Mostriamo i film caricati all'apertura della pagina
mostraFilm();


// PULSANTE WATCH TIME
const btnWatchTime = document.getElementById('btnWatchTime');
if (btnWatchTime) {
    btnWatchTime.addEventListener('click', function() {
        let minutiTotali = 0;
        listaFilm.forEach(function(film) {
            minutiTotali += Number(film.durata);
        });
        document.getElementById('modalWatchTimeBody').innerText =
            "Tempo totale speso a guardare film: " + minutiTotali + " minuti.";
        let elementoModal = document.getElementById('modalWatchTime');
        let finestraModal = new bootstrap.Modal(elementoModal);
        finestraModal.show();
    });
}


// PULSANTE FREQUENZA CINEMA
const btnFrequenzaCinema = document.getElementById('btnFrequenzaCinema');
if (btnFrequenzaCinema) {
    btnFrequenzaCinema.addEventListener('click', function() {
        let contatoreCinema = 0;
        let nomiFilmCinema = [];
        listaFilm.forEach(function(film) {
            if (film.cinema === true) {
                contatoreCinema++; 
                nomiFilmCinema.push(film.nome); 
            }
        });
        let listaTestuale = nomiFilmCinema.join(", ");
        let messaggio = "Sei stato al cinema " + contatoreCinema + " volte. Film visti: " + listaTestuale;
        document.getElementById('modalCinemaBody').innerText = messaggio;
        let elementoModal = document.getElementById('modalCinema');
        let finestraModal = new bootstrap.Modal(elementoModal);
        finestraModal.show();
    });
}


// PULSANTE INVIA DATI (AGGIUNGI FILM)
const btnInvia = document.getElementById('btnInvia');
if (btnInvia) {
    btnInvia.addEventListener('click', function() {
        let nomeScritto   = document.getElementById('inputNome').value.trim();
        let durataScritta = document.getElementById('inputDurata').value;
        let dataScritta   = document.getElementById('inputData').value;
        let alCinema      = document.getElementById('inputCinema').checked;
 
        if (nomeScritto === "" || durataScritta === "" || dataScritta === "") {
            alert("Per favore, compila tutti i campi!");
            return;
        }
 
        let filmGiaEsistente = false;
        listaFilm.forEach(function(film) {
            if (film.nome.toLowerCase() === nomeScritto.toLowerCase()) {
                filmGiaEsistente = true;
            }
        });
 
        if (filmGiaEsistente === true) {
            alert("Questo film è già stato registrato!");
            return;
        }
 
        let nuovoFilm = {
            nome:   nomeScritto,
            durata: Number(durataScritta),
            data:   dataScritta,
            cinema: alCinema
        };
 
        listaFilm.push(nuovoFilm);
        alert("Film salvato con successo!");
        
        mostraFilm();
        
        document.getElementById('inputNome').value     = "";
        document.getElementById('inputDurata').value   = "";
        document.getElementById('inputData').value     = "";
        document.getElementById('inputCinema').checked = false;
    });
}


// FUNZIONE ELIMINA SINGOLO FILM
function eliminaFilm(indice) {
    listaFilm.splice(indice, 1);
    mostraFilm();
}
 
 
// PULSANTE ELIMINA TUTTI
const btnEliminaTutti = document.getElementById('btnEliminaTutti');
if (btnEliminaTutti) {
    btnEliminaTutti.addEventListener('click', function() {
        listaFilm.length = 0;
        mostraFilm();
    });
}
let btninvia = document.getElementById("btn-invia");

const btnSalva = document.getElementById("btnSalvataggioInformazioni");

if (btnSalva) {

    btnSalva.addEventListener("click", function() {

        localStorage.setItem(
            "listaFilm",
            JSON.stringify(listaFilm)
        );

        alert("Informazioni salvate!");

    });

}

const btnCarica = document.getElementById("btnCaricamentoInformazioni");

if (btnCarica) {

    btnCarica.addEventListener("click", function() {

        listaFilm =
        JSON.parse(
            localStorage.getItem("listaFilm")
        ) || [];

        mostraFilm();

        alert("Informazioni caricate!");

    });

}

let filmSalvati =JSON.parse(localStorage.getItem("listaFilm")) || [];

if (filmSalvati.length > 0) {
    listaFilm = filmSalvati;
}
async function gestisciRichiesta() {

    const oggettoRichiesta = {
        contents: [
            {
                parts: [
                    { text: "Qui devi inserire il prompt" }
                ]
            }
        ]
    };

 let risposta = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyA0E6BeSlm-b6_BLX18q94HpwerYw9f5xI",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(oggettoRichiesta)
        }
    );

    let dati = await risposta.json();

    console.log(dati);

    console.log(
        dati.candidates[0].content.parts[0].text
    );
}

gestisciRichiesta();