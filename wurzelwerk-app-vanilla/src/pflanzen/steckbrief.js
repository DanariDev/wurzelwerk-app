import { db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { ladePflanzenListe } from "./list.js";

const steckbrief = document.getElementById("pflanzen-steckbrief");
const pflanzenListe = document.getElementById("pflanzen-liste");

export async function zeigeSteckbrief(pflanzenId) {
  if (!steckbrief) return;
  const ref = doc(db, "pflanzen", pflanzenId);
  const docSnap = await getDoc(ref);
  if (!docSnap.exists()) return;
  const pflanze = docSnap.data();

  steckbrief.innerHTML = `
    <button onclick="window.ladePflanzenListe()">⬅️ Zurück</button>
    <h2>${pflanze.name}</h2>
    <img src="${pflanze.image_url || ""}" alt="${pflanze.name}" style="max-width:120px;">
    <div><b>Botanischer Name:</b> ${pflanze.latin_name || ""}</div>
    <div><b>Familie:</b> ${pflanze.family || ""}</div>
    <div><b>Kategorie:</b> ${pflanze.category || ""}</div>
    <div>${pflanze.description || ""}</div>
  `;

  steckbrief.style.display = "block";
  if (pflanzenListe) pflanzenListe.style.display = "none";
}

// Damit der Zurück-Button funktioniert:
window.ladePflanzenListe = ladePflanzenListe;
