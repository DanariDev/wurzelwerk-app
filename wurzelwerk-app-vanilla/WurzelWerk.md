# 🌱 WurzelWerk – Community-App für Pflanzenfreunde

## Status-Überblick

### ✅ Fertig umgesetzt:

- **Login & Registrierung**  
  *(auth.js, index.html, main.css)*

- **Admin-System (nur der Master-Account kann löschen, alle dürfen bearbeiten)**  
  *(auth.js – `ADMIN_UID`, pflanzen-verwaltung.js, tipps-verwaltung.js, krankheiten-verwaltung.js)*

- **Pflanzenliste (CRUD inkl. Bearbeiten/Löschen über Universal-Popup)**  
  *(list.js, pflanzen-verwaltung.js, editPopup.js, main.css, index.html)*

- **Overlay- und Card-Design (modern, responsiv, mobilefreundlich)**  
  *(main.css – Modal Styles, Card Styles, Pflanzen-List-Styles)*

- **Navigation (Startseite, Bereichs-Tabs, Bottom-Nav, Bereichs-Wechsel)**  
  *(index.html – Sections & Navigation, main.js – Section-Switching)*

- **Zurück-zur-Startseite-Button in allen Bereichen**  
  *(index.html – `.back-home-btn`, main.js – Event-Handler, main.css)*

---

### 🆕 Neu hinzugekommen:

- **Universelles Bearbeiten-Popup (Modal) für Pflanzen, Tipps, Krankheiten**  
  *(editPopup.js, main.css – Modal Styles, Aufrufe in pflanzen-verwaltung.js etc.)*

- **Startseite (Begrüßung, Info, To-dos)**  
  *(index.html – `#startseite-section`, main.css – Startseiten-Styles, main.js – Section-Switching)*

- **Modularer Code-Aufbau (jede Hauptfunktion in eigener JS-Datei)**  
  *(Siehe: list.js, pflanzen-verwaltung.js, tipps-verwaltung.js, krankheiten-verwaltung.js, editPopup.js, main.js)*

- **User-Statistiken/Community-Zähler (in Planung)**  
  *(index.html, main.js, ggf. später eigenes stats.js)*

---

## To-do & Roadmap (mit Code-Verweis)

- [ ] **Krankheiten-Modul (CRUD wie bei Pflanzen):**  
      *(krankheiten-verwaltung.js, krankheiten/list.js, editPopup.js, index.html Section, main.js)*
- [ ] **Tipps-Modul (CRUD wie bei Pflanzen):**  
      *(tipps-verwaltung.js, tipps/list.js, editPopup.js, index.html Section, main.js)*
- [ ] **Such- und Filterfunktion:**  
      *(list.js, main.css – später eigenes filter.js?)*  
- [ ] **Onboarding-Flow („Hier findest du…“):**  
      *(index.html, main.js, später evtl. onboarding.js)*  
- [ ] **Community-Statistiken:**  
      *(main.js, stats.js (optional), index.html (Anzeige))*  
- [ ] **Bilder-Upload (Galerie):**  
      *(später: gallery.js, main.css, index.html)*  
- [ ] **Bewertungen/Likes:**  
      *(später: likes.js, main.css, index.html)*  
- [ ] **Favoriten („Mein Garten“):**  
      *(später: favoriten.js, main.js, main.css)*  
- [ ] **Erfolgspopup nach Community-Aktion:**  
      *(editPopup.js, main.css, main.js – für Animationen)*  
- [ ] **Mobile-UX-Details (Floating Button, Swipe):**  
      *(main.css, main.js)*  
- [ ] **Barrierefreiheit & Hilfetexte:**  
      *(index.html, main.css, ggf. hilfe.js)*  

---

## Verbesserungs-Ideen (mit Dateihinweis)

- **Persönliche Begrüßung:**  
  *(main.js – nach Login, index.html – Startseite)*
- **Highlight-Box auf Startseite („Tipp des Tages“ etc.):**  
  *(index.html – Startseite, main.js, tipps/list.js)*
- **Community-Stats:**  
  *(main.js, stats.js, index.html)*
- **Onboarding/Quick-Tour:**  
  *(main.js, onboarding.js, index.html)*
- **Direkte Schnell-Buttons:**  
  *(index.html, main.css, main.js)*
- **Animiertes Erfolgspopup:**  
  *(editPopup.js, main.css, main.js)*
- **Farbige Badges:**  
  *(main.css, list.js, tipps-verwaltung.js, pflanzen-verwaltung.js)*
- **Mobile-UX-Extras:**  
  *(main.css, main.js)*

---

## Offene Fragen und Optionen

- **Was wollen wir auf der Startseite dauerhaft zeigen?**  
  *(index.html – Startseite, main.js, stats.js)*
- **Kleine Challenges/Badges einbauen?**  
  *(main.js, stats.js, index.html)*
- **Forum/Community-Bereich?**  
  *(community-section in index.html, ggf. community.js)*
- **Push-Benachrichtigungen oder Newsletter?**  
  *(später: notifications.js, index.html, ggf. externe Tools)*

---

## Nächste konkrete Schritte

1. **Krankheiten- und Tipps-Modul wie Pflanzen aufbauen:**  
    *(Analog: krankheiten-verwaltung.js, tipps-verwaltung.js, list.js, editPopup.js, main.js)*
2. **Startseiten-UX ausgestalten:**  
    *(index.html, main.css, main.js)*
3. **Schnell-Buttons & Community-Statistiken einbauen:**  
    *(index.html, main.js, stats.js)*
4. **Feedback von ersten Usern einholen:**  
    *(Alle Files, Fokus auf User-Experience)*
5. **Optionale Features wie Bewertung, Favoriten testen:**  
    *(likes.js, favoriten.js, main.js, main.css)*

---

*Jede Funktion ist mit ihrem Code-Ort dokumentiert – für einfaches Nachschlagen, Erweitern & Fixen!*
