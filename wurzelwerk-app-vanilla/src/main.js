// ===========================
//         STYLES
// ===========================
import "./styles/main.css";

// ===========================
//         MODULES
// ===========================
import { onUserChanged, logoutUser } from "./auth.js";
import { ladePflanzenListe } from "./pflanzen/list.js";
import { ladeKrankheitenListe } from "./krankheiten/list.js";
import { openUniversalModal } from "./editPopup.js"; // universelles Modal
// import { ladeTippsListe } from "./tipps/list.js"; // <-- Platzhalter für später

// ===========================
//        APP-START & LOGIN
// ===========================
const logoutBtn = document.getElementById("logout-btn");

// Setzt aktuellen User für alle Module
function setUserForModules(user) {
  window.setCurrentUser && window.setCurrentUser(user);
  window.setCurrentUserKrankheit && window.setCurrentUserKrankheit(user);
  window.setCurrentUserTipp && window.setCurrentUserTipp(user);
}

// App-Initialisierung nach Login
function initApp() {
  setUserForModules(window.currentUser);
  // Starte mit der Startseite oder der Pflanzenliste
  showSection("startseite");
  ladePflanzenListe();
}

// Authentifizierungs-Status überwachen
onUserChanged((user) => {
  window.currentUser = user;
  if (user) {
    if (logoutBtn) logoutBtn.style.display = "inline-block";
    initApp();
  } else {
    if (logoutBtn) logoutBtn.style.display = "none";
  }
});

// Logout-Button Event
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    logoutUser();
  });
}

// ===========================
//        NAVIGATION
// ===========================
const sections = {
  startseite: document.getElementById("startseite-section"),
  pflanzen: document.getElementById("pflanzen-liste-section"),
  krankheiten: document.getElementById("krankheiten-section"),
  tipps: document.getElementById("tipps-section"),
  community: document.getElementById("community-section"),
};

function showSection(key) {
  Object.values(sections).forEach((sec) => sec && (sec.style.display = "none"));
  sections[key] && (sections[key].style.display = "block");
}

// Menü-Buttons (mit Checks)
const menuPflanzen = document.getElementById("menu-pflanzen");
const menuKrankheiten = document.getElementById("menu-krankheiten");
const menuTipps = document.getElementById("menu-tipps");
const menuCommunity = document.getElementById("menu-community");

if (menuPflanzen) {
  menuPflanzen.addEventListener("click", () => {
    showSection("pflanzen");
    ladePflanzenListe();
  });
}
if (menuKrankheiten) {
  menuKrankheiten.addEventListener("click", () => {
    showSection("krankheiten");
    ladeKrankheitenListe();
  });
}
if (menuTipps) {
  menuTipps.addEventListener("click", () => {
    showSection("tipps");
    // ladeTippsListe(); // Platzhalter für später
  });
}
if (menuCommunity) {
  menuCommunity.addEventListener("click", () => {
    showSection("community");
    // Hier ggf. Community-Liste laden
  });
}

// "Zurück zur Startseite"-Button
document.querySelectorAll(".back-home-btn").forEach((btn) => {
  btn.addEventListener("click", () => showSection("startseite"));
});

// ===========================
//      "Hinzufügen"-Buttons
// ===========================

// Pflanze anlegen (öffnet universelles Modal)
const addPflanzeBtn = document.getElementById("pflanze-hinzufuegen-btn");
if (addPflanzeBtn) {
  addPflanzeBtn.addEventListener("click", () => {
    openUniversalModal({
      title: "Neue Pflanze anlegen",
      fields: [
        { name: "name", label: "Name", required: true },
        { name: "latin_name", label: "Botanischer Name" },
        { name: "family", label: "Familie" },
        { name: "category", label: "Kategorie" },
        { name: "image_url", label: "Bild-URL" },
        { name: "description", label: "Beschreibung" },
      ],
      submitText: "Speichern",
      onSubmit: async (data) => {
        // Hier Firestore-Add-Logik für Pflanzen einbauen!
        // await addDoc(collection(db, "pflanzen"), data);
        ladePflanzenListe();
      },
    });
  });
}

// Krankheit anlegen (öffnet universelles Modal)
const addKrankheitBtn = document.getElementById("krankheit-hinzufuegen-btn");
if (addKrankheitBtn) {
  addKrankheitBtn.addEventListener("click", () => {
    openUniversalModal({
      fields: [
        { name: "name", label: "Name", required: true },
        { name: "symptoms", label: "Symptome", type: "list", value: [] },
        { name: "treatment", label: "Behandlung", type: "list", value: [] },
      ],
      submitText: "Speichern",
      onSubmit: async (data) => {
        // Hier Firestore-Add-Logik für Krankheiten einbauen!
        // await addDoc(collection(db, "krankheiten"), data);
        ladeKrankheitenListe();
      },
    });
  });
}

// Tipps anlegen (Platzhalter für später!)
const addTippBtn = document.getElementById("tipp-hinzufuegen-btn");
if (addTippBtn) {
  addTippBtn.addEventListener("click", () => {
    openUniversalModal({
      title: "Tipp einreichen",
      fields: [
        { name: "title", label: "Titel", required: true },
        { name: "text", label: "Tipp-Text" },
      ],
      submitText: "Speichern",
      onSubmit: async (data) => {
        // Hier Firestore-Add-Logik für Tipps einbauen!
        // await addDoc(collection(db, "tipps"), data);
        // ladeTippsListe();
      },
    });
  });
}
