# Browser Game

Un browser-game statico (HTML5 + CSS3 + JavaScript vanilla) con workflow di sviluppo, staging e deploy automatizzato tramite GitHub Actions e GitHub Pages.

---

## Struttura del progetto

```
Browser-Game/
├── index.html          # Schermata di login + area di gioco (placeholder)
├── main.js             # Logica del gioco e gestione dello stato (placeholder)
├── style.css           # Stili base e token di design (placeholder)
├── assets/             # Risorse statiche (immagini, audio, font – da aggiungere)
│   └── .gitkeep
├── .github/
│   └── workflows/
│       ├── test.yml      # Linting HTML/CSS/JS + test automatici
│       ├── staging.yml   # Deploy su GitHub Pages (ambiente staging)
│       └── deploy.yml    # Deploy su GitHub Pages (produzione)
└── README.md
```

---

## Branch strategy

| Branch      | Scopo                                                              |
|-------------|--------------------------------------------------------------------|
| `main`      | Codice stabile e pronto per la produzione. Ogni push fa il deploy. |
| `staging`   | Codice da validare prima di andare in produzione.                  |
| `develop`   | Branch di integrazione per le feature in sviluppo.                 |
| `feature/*` | Singole feature – aperte da `develop`, chiuse con PR su `develop`. |

Flusso consigliato:

```
feature/xxx → develop → staging → main
```

1. Aprire un **branch `feature/...`** da `develop`.
2. Aprire una **Pull Request** su `develop` quando la feature è pronta.
3. Periodicamente, fare merge di `develop` in **`staging`** per validare.
4. Una volta approvato in staging, fare merge di `staging` in **`main`** per il deploy in produzione.

---

## GitHub Actions workflows

### `test.yml` – Test automatici
Eseguito su **ogni push** e su ogni **Pull Request** verso `main` o `staging`.

- Valida `index.html` con [html-validate](https://html-validate.org/)
- Valida `style.css` con [stylelint](https://stylelint.io/)
- Valida `main.js` con [ESLint](https://eslint.org/)
- Placeholder per futuri test unitari/E2E

### `staging.yml` – Deploy staging
Eseguito su ogni push al branch **`staging`**.

1. Carica i file statici come artefatto Pages.
2. Fa il deploy sul GitHub Pages environment **`staging`**.
3. L'URL di staging viene pubblicato nella sezione Environments della repo.

### `deploy.yml` – Deploy produzione
Eseguito su ogni push al branch **`main`**.

1. Carica i file statici come artefatto Pages.
2. Fa il deploy sul GitHub Pages environment **`github-pages`** (produzione).

---

## Setup GitHub Pages

1. Vai su **Settings → Pages** nella tua repository.
2. In *Source*, seleziona **GitHub Actions**.
3. Crea gli environment **`staging`** e **`github-pages`** in **Settings → Environments** (se non esistono già).
4. (Opzionale) Se la repo è **privata**, in *Settings → Pages* attiva la protezione per limitare l'accesso ai soli collaboratori.

---

## Sviluppo locale

### Prerequisiti
- Un browser moderno
- (Opzionale) Python 3 o Node.js per un server locale

### Avviare un server locale

**Python:**
```bash
python -m http.server 8000
```

**Node.js (npx):**
```bash
npx http-server -p 8000
```

Poi apri `http://localhost:8000` nel browser.

---

## Roadmap

- [ ] Aggiungere framework di test (es. Jest + Playwright per E2E)
- [ ] Integrare backend (AWS Lambda + API Gateway) per autenticazione e inventario
- [ ] Aggiungere assets grafici e audio
- [ ] Implementare game loop e meccaniche di gioco
- [ ] Configurare dominio personalizzato su GitHub Pages (CNAME)

---

## Sviluppo assistito da AI

Questo progetto è pensato per essere sviluppato principalmente tramite agenti AI (GitHub Copilot Coding Agent).  
L'agente può:
- Creare branch, aprire e unire Pull Request
- Scrivere codice, test e documentazione
- Eseguire workflow di staging/deploy

Ogni modifica significativa deve passare per una PR revisionata prima di atterrare su `main`.
