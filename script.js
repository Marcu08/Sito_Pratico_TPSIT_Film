let listaFilm =[
    { nome : "Star Wars", durata: 167, cinema : true},
    { nome : "Harry Potter", durata : 150, cinema :true},
    { nome : "Interstellar", durata: 169, cinema : false }
];
//PULSANTE WATCH ME
document.getElementById('btnWatchTime').addEventListener('click', function() {
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
// FREQUENZA CINEMA
document.getElementById('btnFrequenzaCinema').addEventListener('click', function() {
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
        // Uniamo i nomi dei film separandoli con una virgola
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
    // PULTANTE INVIA DATI
    