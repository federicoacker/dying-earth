# Contesto
Sei un web developer esperto nell'utilizzo di Bootstrap 5.3.8 in combinazione con CSS avanzato e Javascript Vanilla

# Obiettivo
Creare una web app completamente responsive che abbia i seguenti 3 step nella stessa pagina, utilizzando la utility class di bootstrap "d-none" per simulare il cambio di pagina quando si arriva al prossimo step:
- Step 1:
    - Una pagina di benvenuto in cui mostri il contesto del gioco come segue:
        - Un container con dentro la spiegazione del gioco:
        Immaginiamo che la terra stia morendo. L'unica possibilità di salvezza è una navicella spaziale con sette posti, che sta per partire per un altro pianeta. Intorno alla navicella vi sono undici persone che aspirano a partire, Voi vi trovate nella posizione di dover scegliere le sette che partiranno e costruiranno il primo nucleo di una nuova civiltà. Di loro sappiamo pochissimo, quasi niente, e tuttavia su queste basi dovete scegliere anche rapidamente, altrimenti nessuno rimarrà in vita.
        - Al di sotto 3 piccoli container con delle informazioni extra:
            - Il tempo a disposizione per fare il test : 5 minuti.
            - Il numero massimo di candidati selezionabili: 7.
            - Un warning che avvisa che una volta fatte le scelte, esse saranno irreversibili per tutta la civiltà umana.
        - Un pulsante per iniziare il test (Che nasconde questo step e attiva step 2)
- Step 2:
    - Mostra la lista di candidati che trovi nel file "./scripts/candidates.js"
    - La lista mostra solo la proprietà label dei singoli candidati
    - La lista è composta da checkboxes che ti permettono di selezionare al massimo 7 candidati in contemporanea
    - In alto a destra un countdown per i 5 minuti allo scadere del quale, la web app disabilita lo step 2 e passa allo step 3
    - In basso un pulsante per confermare la scelta, che mostra un warning sul fatto che la scelta è irrreversibile e poi dopo un altro click di conferma, passa allo step 3, disabilitando lo step 2
- Step 3:
    - Mostra di nuovo la lista di candidati, con in highlight quelli scelti dall'utente e mostra per tutti i candidati, oltre il label anche il reveal
    - Sopra la lista dei candidati, un container contenente questo testo:
    Comprendere come i processi cognitivi influenzino le nostre decisioni è essenziale per mitigare l'impatto dei pregiudizi involontari.   
        - Analizzare il divario tra percezione e realtà permette di approcciare ogni scelta con maggiore rigore critico.
        - Semplificazione Cognitiva: Le etichette riducono la complessità ambientale, ma generano distorsioni che portano a giudizi superficiali e standardizzati.
        - Meccanismi di Bias: I pregiudizi agiscono come filtri sistematici, orientando le preferenze verso ciò che è familiare a scapito dell'analisi oggettiva.
        - Consapevolezza Decisionale: Superare lo stereotipo richiede un passaggio attivo dal pensiero intuitivo a una valutazione razionale basata su dati concreti.
    - Un pulsante per ripetere il test che ci rimandi allo step 1, azzerando tutte le scelte che erano state fatte

# Regole di stile
- Sebbene fatto con bootstrap 5.3.8, è tuo obiettivo, utilizzare il CSS avanzato che conosci per far si che la pagina non sembri fatta con bootstrap (Maschera il suo stile)
- Palette colori: toni scuri e profondi (blu notte, nero, grigio scuro), con accenti di luce (arancione, ciano, bianco) per elementi importanti (navicella, pulsanti, selezioni).
- Iconografia minimale, nessun stile cartoon: tutto deve comunicare serietà, profondità, introspezione.
- Il tono della pagina web Serio, non deve essere un tono giocoso, ma deve anzi suscitare Ansia 
- L'atmosfera visiva della pagina deve far capire che ci troviamo in uno scenario apocalittico, mi immagino, luci rosse che flashano dai bordi della pagina come un allarme, con un allarme audio che trovi nella cartella "./res/audio/alarm ship.mp3" nello Step 1.
- Quando l'utente preme conferma definitivamente in Step 2, parte l'audio "./res/audio/take-off.mp3"

# Struttura dei file
- index.html nella root folder
- script.js in cui metterai tutta la parte javascript, nella cartella "./scripts/"
- index.css in cui farai tutte le cose css di stile, nella cartella "./styles/"
- Nella cartella "./scripts/" hai un file "candidates.js" che contiene un array di oggetti chiamato candidates:
    - Il file candidates.js esporta un array di oggetti nel formato:
         { id: 1, label: "Militante nero", reveal: "È un pacifista, esperto in non-violenza e gestione creativa dei conflitti." }

# Vincoli
- Utilizzare Bootstrap 5.3.8
- Completo divieto di utilizzare stile in-line o scripts in-line
- Divieto di mettere lo style nell'head del file html
- Utilizzare la grid di bootstrap, quindi cols e rows
