# Hunt App

Hunt è un'app mobile-first creata con React Native e Expo per la scoperta di eventi locali, mercatini e prodotti nelle vicinanze dell'utente. Questa app è ispirata al design di "Staseera" con alcune variazioni distintive nel colore e nell'interfaccia.

## Caratteristiche Principali

- **Onboarding con geolocalizzazione**: Permette agli utenti di inserire la loro posizione manualmente o utilizzare il GPS
- **Esplorazione eventi**: Lista di eventi nelle vicinanze con dettagli su orari, luoghi e distanze
- **Schede dettaglio**: Visualizzazione dettagliata degli eventi con informazioni sui venditori partecipanti
- **Pagine venditori**: Catalogo prodotti per ogni venditore con opzioni per aggiungere ai preferiti e prenotare
- **Gestione preferiti**: Possibilità di salvare eventi, venditori e prodotti preferiti
- **Mappa interattiva**: Visualizzazione degli eventi su mappa con pin e dettagli
- **Calendario eventi**: Header con date scorrevoli per filtrare gli eventi per giorno

## Tecnologie Utilizzate

- **React Native**: Framework per lo sviluppo cross-platform
- **Expo SDK 53**: Toolkit per facilitare lo sviluppo React Native
- **React Navigation**: Navigazione tra schermate
- **Firebase/Firestore**: Backend per dati (configurazione inclusa)
- **Expo Location**: Geolocalizzazione dell'utente
- **React Native Maps**: Visualizzazione della mappa interattiva
- **date-fns**: Gestione e formattazione delle date
- **UUID**: Generazione di ID univoci
- **Expo Vector Icons**: Set di icone per l'interfaccia

## Come Iniziare

### Prerequisiti

- Node.js (versione 16 o superiore)
- npm o yarn
- Expo CLI (`npm install -g expo-cli`)
- Un account Expo (opzionale, ma utile per testare su dispositivi fisici)

### Installazione

1. Clonare il repository
   ```
   git clone https://github.com/tuonomeutente/hunt-app.git
   cd hunt-app
   ```

2. Installare le dipendenze
   ```
   npm install
   ```
   o
   ```
   yarn install
   ```

3. Avviare l'app in modalità sviluppo
   ```
   npm start
   ```
   o
   ```
   expo start
   ```

4. Scegliere la piattaforma di test:
   - Premere `a` per avviare su emulatore Android
   - Premere `i` per avviare su emulatore iOS
   - Premere `w` per avviare su web
   - Scansionare il QR code con l'app Expo Go su dispositivo fisico

### Avvio specifico per piattaforma

- **Android**: `npm run android` o `expo start --android`
- **iOS**: `npm run ios` o `expo start --ios`
- **Web**: `npm run web` o `expo start --web`

## Struttura del Progetto

```
HuntApp/
├── App.js                    # Punto di ingresso principale
├── app.json                  # Configurazione Expo
├── babel.config.js           # Configurazione Babel
├── package.json              # Dipendenze e script
├── .env                      # Variabili d'ambiente (crea questo file)
├── data/
│   ├── firebaseConfig.js     # Configurazione Firebase
│   └── mockData.js           # Dati di esempio per sviluppo
├── navigation/
│   └── BottomTabs.js         # Navigazione con tab inferiori
├── components/
│   ├── CardEvento.js         # Card per gli eventi
│   ├── HeaderDates.js        # Header con date scorrevoli
│   ├── TabBar.js             # Barra di navigazione inferiore
│   └── VendorCard.js         # Card per i venditori
├── screens/
│   ├── HomeScreen.js         # Schermata principale con eventi
│   ├── DetailScreen.js       # Dettaglio evento
│   ├── VendorScreen.js       # Pagina venditore
│   ├── FavoritesScreen.js    # Preferiti utente
│   ├── MapScreen.js          # Mappa eventi
│   ├── MyEventsScreen.js     # Eventi dell'utente
│   ├── AboutScreen.js        # Informazioni app
│   └── OnboardingScreen.js   # Onboarding iniziale
└── assets/
    └── ...                   # Immagini, font, etc.
```

## Personalizzazione

- Modifica i colori, le spaziature e altre proprietà di stile nel file `context/ThemeContext.js`
- Aggiorna i dati di esempio in `data/mockData.js`
- Configura Firebase con le tue credenziali in `data/firebaseConfig.js`

## Deployment

### Web

Per creare una build statica per il web:

```
expo build:web
```

Questo creerà una cartella `web-build` con i file statici che possono essere deployati su Vercel, Netlify, o qualsiasi host web.

### Mobile

Per creare file eseguibili per iOS e Android:

```
expo build:android    # Crea un file APK o AAB per Android
expo build:ios        # Crea un file IPA per iOS
```

## Note

Per un'app completa e funzionante:

1. Configura Firebase con le tue credenziali nel file `data/firebaseConfig.js`
2. Crea un file `.env` nella root del progetto per le variabili d'ambiente
3. Sostituisci "YOUR_GOOGLE_MAPS_API_KEY" in `app.json` con la tua API key di Google Maps

---

Creato con ❤️ usando React Native e Expo