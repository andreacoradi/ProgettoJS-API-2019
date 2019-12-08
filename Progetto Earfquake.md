# DOCUMENTO DI SPECIFICA DEI REQUISITI SOFTWARE
## Tabella contenuti

1. **Introduzione**
1.1 Propositi
1.2 Obiettivi
1.3 Definizioni, acronimi e abbreviazioni
1.4 Riferimenti
2. **Descrizione generale**
2.1 Prospettive del prodotto
2.2 Funzionalità del prodotto
2.3 Caratteristche utente
2.4 Vincoli generali
2.5 Assunzioni e dipendenze
3. **Requisiti specifici**
3.1 Interfaccia utente
3.2 Come selezionare il luogo di interesse e l'intensità del magnitudo
1. **Introduzione**

1.1 **Propositi**

Il proposito di questo documento è quello di specificare i requisiti del progetto
"Earfquake.js" per facilitarne la realizzazione.
Questo documento è stato scritto seguendo le indicazioni contenute nel documento "IEEE Recommended Practce for Software Requirements Specificatons" avente riferimento IEEE Std 830-1993 (Revision of IEEE Std 830-
1984).

1.2 **Obiettivi**

Si desidera fornire una seria di informazioni sull'argomento terremoti, tenendo conto dei terremoti avvenuti su tutto il globo negli ultmi sette giorni.

I dati che si intende riportare sono:

- Quanti terremoti sono avvenuti;
- Dove si sono manifestatI;
- Con quale intensità;
- La visione delle diverse placche tettoniche;
I terremoti sono visibili tramite delle icone sui rispettivi punti di manifestazione.

L'applicazione permette inoltre di scegliere manualmente,sia il luogo di manifestazione che l'intensità.

L'applicazione presenta un interfaccia scritta in HTML, invece le funzionalità sono state implementate utlizzando Javascript.

1.3 **Definizioni, acronimi e abbreviazioni**

Il linguaggio HTML(acronimo di:HyperText Markup Language) è un linguaggio di programmazione web usato per la creazione di pagine web.
Javascript è un linguaggio di programmazione web come il precedente ma utilizzato per la creazione di applicazioni orientate ad oggetti o eventi.

1.4 **Riferimenti**

Per ottenere informazioni sui terremoti abbiamo utilizzato l'API di questo sito:
https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

Abbiamo ottenuto informazioni sulle placche tettoniche tramite il geoJSON disponibile presso:
https://github.com/fraxen/tectonicplates/

Abbiamo utilizzato inoltre una libreria per lavorare sulla mappa resa disponibile
da: https://leafletjs.com/

Altri link che ci sono stati utili:
https://github.com/public-apis/public-apis
https://www.programmableweb.com/apis/directory

2. **Descrizione generale**

2.1 **Prospettive del prodotto**

Il prodotto può essere utilizzato in totale autonomia, dotato però di connessione internet.

2.2 **Funzionalità del prodotto**

Il progetto Earfquake.js deve:
- Visualizzare tutti i terremoti avvenuti negli ultimi 7 giorni;
- Permettere di controllare lo zoom sulla mappa;
- Permettere la scelta di visualizzare i terremoti solo di una certa intensità;
- Permettere la scelta di visualizzare i terremoti solo di un certo luogo;
- Permettere la visione delle placche tettoniche;
- Permettere un utilizzo User-Friendly;

2.3 **Caratteristche utente**

Il sistema è rivolto a chiunque sia interessato a sapere dove accadono i terremoti nel mondo, indipendentemente dal fine personale.

2.4 **Vincoli generali**

Voler rendere l'applicazione meno confusa e più intuitiva, raggruppando i terremoti in un area circoscritta.

2.5 **Assunzioni e dipendenze**

Il sistema dipende da una libreria presa da un sito esterno, inoltre anche dalle API, non di google in quanto a pagamento, per tanto di un sito esterno.

3. **Requisiti specifici**

3.1 **Interfaccia utente**

L'interfaccia utente è il supporto visivo su cui è possibile visualizzare tutti i dati utili; la nostra interfaccia è in grado di mostrare il globo,con le sue placche tettoniche, e sopra mostrarci i vari terremoti in maniera semplice e intuitva.

3.2 **Come selezionare il luogo di interesse e l'intensità del magnitudo**

L'applicazione in alto a sinistra presenta un campo di testo nel quale si può scrivere numericamente l'intensità del magnitudo desiderata, altrimenti la località desiderata,o ambedue assieme per filtrare in maniera completa,con nome completo preferibilmente in quanto per esempio scrivendo CA(California) non uscirannò solo luoghi della California, ma anche luoghi che hanno nel nome CA o iniziano per CA.