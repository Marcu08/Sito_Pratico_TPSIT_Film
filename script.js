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
        localStorage.setItem("listaFilm", JSON.stringify(listaFilm));
        alert("Film salvato con successo!");
        
        mostraFilm();
        
        document.getElementById('inputNome').value     = "";
        document.getElementById('inputDurata').value   = "";
        document.getElementById('inputData').value     = "";
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