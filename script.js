let listaFilm =[
    { nome : "Star Wars", durata: 167, cinema : true},
    { nome : "Harry Potter", durata : 150, cinema :true},
    { nome : "Interstellar", durata: 169, cinema : false }
];
//PULSANTE WATCH ME
const btnWatchTime = document.getElementById('btnWatchTime');
if (btnWatchTime) {
    btnWatchTime.addEventListener('click', function() {
        // Creiamo una variabile per tenere il conto dei minuti totali, partendo da 0
        let minutiTotali = 0;

        // Giriamo dentro l'array film per film con un ciclo forEach
        listaFilm.forEach(function(film) {
            // Prendiamo la durata del film corrente e la sommiamo ai minuti totali
            minutiTotali += Number(film.durata);
        });
        // Troviamo il corpo del modal nel file HTML e ci scriviamo dentro il risultato
        document.getElementById('modalWatchTimeBody').innerText = "Tempo totale speso: " + minutiTotali + " minuti.";

        // Diciamo a Bootstrap di prendere il Modal grafico e di mostrarlo a schermo
        let elementoModal = document.getElementById('modalWatchTime');
        let finestraModal = new bootstrap.Modal(elementoModal);
        finestraModal.show();
    });
}

// FREQUENZA CINEMA
const btnFrequenzaCinema = document.getElementById('btnFrequenzaCinema');
if (btnFrequenzaCinema) {
    btnFrequenzaCinema.addEventListener('click', function() {
        // Creiamo un contatore per quante volte siamo andati al cinema
        let contatoreCinema = 0;
        // Creiamo una lista di testi vuota per inserire i nomi dei film visti al cinema
        let nomiFilmCinema = [];

        // Cicliamo tutti i film per controllare chi ha "cinema: true"
        listaFilm.forEach(function(film) {
            if (film.cinema === true) {
                contatoreCinema++; // Aumentiamo il contatore di 1
                nomiFilmCinema.push(film.nome); // Aggiungiamo il nome del film alla lista
            }
        });

        let listaTestuale = nomiFilmCinema.join(", ");

        // Prepariamo la frase da mostrare nel modal
        let messaggio = "Sei stato al cinema " + contatoreCinema + " volte. Film visti: " + listaTestuale;
        
        // Inseriamo la frase nel modal del cinema
        document.getElementById('modalCinemaBody').innerText = messaggio;

        // Mostriamo il modal del cinema a schermo
        let elementoModal = document.getElementById('modalCinema');
        let finestraModal = new bootstrap.Modal(elementoModal);
        finestraModal.show();
    });
}

// PULSANTE INVIA DATI
if (document.getElementById('btnInvia')) {
    document.getElementById('btnInvia').addEventListener('click', function() {
        // 1. Leggiamo i dati inseriti dall'utente nell'index.html
        let nomeScritto = document.getElementById('inputNome').value.trim();
        let durataScritta = document.getElementById('inputDurata').value;
        let dataScritta = document.getElementById('inputData').value;
        let alCinema = document.getElementById('inputCinema').checked;

        // 2. Controllo se ci sono campi lasciati vuoti
        if (nomeScritto === "" || durataScritta === "" || dataScritta === "") {
            alert("Per favore, compila tutti i campi!");
            return; // Blocca l'inserimento
        }

        // 3. Controllo duplicati (Richiesto dalla traccia)
        let filmGiaEsistente = false;
        listaFilm.forEach(function(film) {
            if (film.nome.toLowerCase() === nomeScritto.toLowerCase()) {
                filmGiaEsistente = true;
            }
        });

        if (filmGiaEsistente === true) {
            alert("Questo film è già stato registrato!");
            return; // Blocca l'inserimento se esiste già
        }

        // 4. Creiamo il nuovo oggetto del film
        let nuovoFilm = {
            nome: nomeScritto,
            durata: Number(durataScritta),
            data: dataScritta,
            cinema: alCinema
        };

        // 5. Aggiungiamo il film all'array globale
        listaFilm.push(nuovoFilm);
        localStorage.setItem("listaFilm", JSON.stringify(listaFilm));
        alert("Film salvato con successo!");
        
        // 6. Svuotiamo i campi visivi del form per il prossimo inserimento
        document.getElementById('inputNome').value = "";
        document.getElementById('inputDurata').value = "";
        document.getElementById('inputData').value = "";
        document.getElementById('inputCinema').checked = false;
    });
}
function mostraFilm() {
    let tabella = document.getElementById("corpoTabella");
    if (!tabella) return; // non siamo in tabella.html, esci
 
    tabella.innerHTML = "";
 
    listaFilm.forEach(function(film, indice) {
        let riga = document.createElement("tr");
 
        // NOME
        let cellaNome = document.createElement("td");
        cellaNome.innerText = film.nome;
 
        // DURATA
        let cellaDurata = document.createElement("td");
        cellaDurata.innerText = film.durata + " min";
 
        // DATA (formato gg-mm-aaaa)
        let cellaData = document.createElement("td");
        if (film.data) {
            let parti = film.data.split("-");
            cellaData.innerText = parti[2] + "-" + parti[1] + "-" + parti[0];
        } else {
            cellaData.innerText = "Non disponibile";
        }
 
        // CINEMA
        let cellaCinema = document.createElement("td");
        cellaCinema.innerText = film.cinema === true ? "SI" : "NO";
 
        // PULSANTE ELIMINA
        let cellaBottone = document.createElement("td");
        let bottoneElimina = document.createElement("button");
        bottoneElimina.innerText = "Elimina";
        bottoneElimina.className = "btn btn-danger btn-sm";
        bottoneElimina.addEventListener("click", function() {
            eliminaFilm(indice);
        });
        cellaBottone.appendChild(bottoneElimina);
 
        // Aggiungi celle alla riga
        riga.appendChild(cellaNome);
        riga.appendChild(cellaDurata);
        riga.appendChild(cellaData);
        riga.appendChild(cellaCinema);
        riga.appendChild(cellaBottone);
 
        tabella.appendChild(riga);
    });
 
    // Numero film
    let numeroFilm = document.getElementById("NumeroFilm");
    if (numeroFilm) {
        numeroFilm.innerText = "Film registrati: " + listaFilm.length;
    }
}
let btnInvia = document.getElementById("btn-invia");

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
const btnEliminaTutti = document.getElementById("btnEliminazioneTutti");
if (btnEliminaTutti) {
    btnEliminaTutti.addEventListener("click", function() {
        listaFilm = [];
        localStorage.removeItem("listaFilm");
        mostraFilm();
    });
}

let filmSalvati =JSON.parse(localStorage.getItem("listaFilm")) || [];

if (filmSalvati.length > 0) {
    listaFilm = filmSalvati;
}
async function gestisciRichiesta() {
    let jsonFilm = JSON.stringify(listaFilm);
    let prompt = "Leggi i seguenti dati in JSON: " + jsonFilm +
        " Rispondi esclusivamente in JSON (no backtick, no markdown) suggerendomi 3 nuovi film che potrei vedere in base ai dati che ti ho fornito." +
        " Il JSON che devi fornire deve avere un campo listaSuggerimenti che contiene un array di 3 oggetti dove ogni oggetto ha 2 campi:" +
        " nome che contiene il nome del film e descrizione che contiene una brevissima descrizione sul perché quel film è stato proposto.";
 
    const oggettoRichiesta = {
        contents: [{ parts: [{ text: prompt }] }]
    };
 
    try {
        let risposta = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=AIzaSyCBVLm6HAYoqd0XLaCLbBtOAarKdYfNfYU",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(oggettoRichiesta)
            }
        );
        let dati = await risposta.json();
        let testo = dati.candidates[0].content.parts[0].text;
        let suggerimenti = JSON.parse(testo);
 
        let risultato = document.getElementById("risultato");
        if (risultato) {
            risultato.innerHTML = "<h5>Suggerimenti Gemini:</h5>";
            suggerimenti.listaSuggerimenti.forEach(function(film) {
                risultato.innerHTML += "<p><strong>" + film.nome + "</strong>: " + film.descrizione + "</p>";
            });
        }
    } catch (e) {
        console.log("Errore Gemini:", e);
    }
}
function eliminaFilm(indice) {
    listaFilm.splice(indice, 1);
    localStorage.setItem("listaFilm", JSON.stringify(listaFilm));
    mostraFilm();
}
gestisciRichiesta();
mostraFilm();