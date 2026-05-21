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
        alert("Film salvato con successo!");
        
        // 6. Svuotiamo i campi visivi del form per il prossimo inserimento
        document.getElementById('inputNome').value = "";
        document.getElementById('inputDurata').value = "";
        document.getElementById('inputData').value = "";
        document.getElementById('inputCinema').checked = false;
    });
}