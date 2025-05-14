# Hunt App - Riassunto del Progetto

Ho creato un'app di ricerca eventi locali chiamata "Hunt" basata su React Native con Expo SDK 53. L'app è ispirata visivamente alle schermate di "Staseera" ma con una propria identità visiva distintiva.

## Tecnologie e struttura

L'app utilizza:
- **React Native** con **Expo SDK 53**
- **React Navigation** per la gestione delle schermate
- **ThemeContext** per la gestione dello stile centralizzato
- **Expo Location** per la geolocalizzazione
- **React Native Maps** per la visualizzazione della mappa
- **Firebase/Firestore** (configurazione pronta)
- **date-fns** per la gestione delle date

## Componenti principali

### Core
- **App.js**: Punto di ingresso dell'applicazione che gestisce stati globali e navigazione
- **ThemeContext.js**: Contesto React per la gestione centralizzata dello stile
- **BottomTabs.js**: Configurazione della navigazione a tab

### Schermate
- **OnboardingScreen**: Schermata di benvenuto con richiesta di posizione utente
- **HomeScreen**: Esplorazione degli eventi con filtro per data
- **DetailScreen**: Dettaglio evento con venditori
- **VendorScreen**: Dettaglio venditore con prodotti
- **FavoritesScreen**: Gestione preferiti (eventi, venditori, prodotti)
- **MapScreen**: Visualizzazione eventi sulla mappa
- **MyEventsScreen**: Eventi prenotati dall'utente
- **AboutScreen**: Informazioni sull'app

### Componenti riutilizzabili
- **HeaderDates**: Componente per scrollare tra le date
- **CardEvento**: Card per visualizzare un evento
- **VendorCard**: Card per visualizzare un venditore
- **TabBar**: Barra di navigazione personalizzata

### Dati
- **mockData.js**: Dati di esempio per lo sviluppo
- **firebaseConfig.js**: Configurazione per la connessione a Firebase

## Funzionalità implementate
- Onboarding con geolocalizzazione
- Esplorazione eventi nelle vicinanze
- Filtro eventi per data
- Visualizzazione dettaglio eventi e venditori
- Mappa interattiva con posizioni eventi
- Gestione preferiti
- Prenotazione prodotti (simulata)
- Visualizzazione eventi passati/futuri
- Indicatori di distanza

## Note sull'implementazione
- Design mobile-first con supporto web tramite React Native Web
- Utilizzo di StyleSheet.create per tutti gli stili
- Nessuna dipendenza su Tailwind
- Palette di colori calde ma con tonalità viola più soft

## Screenshot / Wireframes
L'app replica fedelmente i layout mostrati nelle immagini di riferimento:
- Home con card eventi e date scorrevoli
- Dettaglio evento con informazioni complete
- Lista venditori con dettagli prodotti
- Mappa interattiva degli eventi
- Area preferiti multitab

## Test e avvio
Istruzioni dettagliate nel README.md per:
- Installazione dipendenze
- Avvio in modalità sviluppo
- Deployment

## Personalizzazione
L'app è facilmente personalizzabile attraverso:
- Il ThemeContext centrale
- I dati di esempio in mockData.js
- La configurazione Firebase