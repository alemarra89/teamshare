
# ProjectWork - teamshare
Progetto Angular con integrazione rest Spring + Websocket

*  Entrare da terminare nella cartella del progetto ed eseguire `npm install` per installarne le dipendenze.

*  Eseguire `ng serve` ed navigare all'indirizzo `http://localhost:4200/` per vedere l'applicazione in funzione.

File di configurazione

*  `src/environment/environment.ts`: per settare la baseUrl dei servizi rest e del server dei websocket

*  `src/app/my-rx-stomp.config.ts`: contiene la configurazione dei websocket

*  `src/app/features/dashboard/dashboard.component.ts`: nell'ngOnInit è contenuta la subscription ai topic '**/events/**' configurati lato server.
