// pflanzen-actions.js
import { db } from "../firebase.js";
import { doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { ladePflanzenListe } from "./list.js";
import { zeigeSteckbrief } from "./steckbrief.js";
import { ADMIN_UID } from "../auth.js"; // Die UID deines Admin-Accounts muss dort exportiert sein
import { openUniversalModal } from "../editPopup.js"; // Pfad ggf. anpassen!


// Globale Referenz auf User (musst du bei onUserChanged setzen)
let currentUser = null;
window.setCurrentUser = function(user) { currentUser = user; };

export function renderPflanzenEntry(pflanze, id) {
  let btns = '';
  if (currentUser && currentUser.uid === ADMIN_UID) {
    btns += `<button class="delete-btn" data-id="${id}">🗑️ Löschen</button>`;
  }
  // Edit für alle User
  btns += `<button class="edit-btn" data-id="${id}">✏️ Bearbeiten</button>`;
  return `
    <div class="pflanzen-eintrag-card">
      <span class="pflanzen-eintrag-name">${pflanze.name}</span>
      ${btns}
    </div>
  `;
}

// Löschfunktion – nur für Admin
export async function handleDeletePflanze(id) {
  if (!currentUser || currentUser.uid !== ADMIN_UID) {
    alert("Nur der Admin kann Pflanzen löschen!");
    return;
  }
  if (confirm("Willst du diesen Eintrag wirklich löschen?")) {
    await deleteDoc(doc(db, "pflanzen", id));
    ladePflanzenListe();
  }
}

// Bearbeiten – öffnet Overlay, lädt Daten ins Formular (funktioniert, wenn du im Overlay ein Bearbeiten-Formular hast)
export async function handleEditPflanze(id) {
  const ref = doc(db, "pflanzen", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;
  const daten = snap.data();

  openUniversalModal({
    title: "Pflanze bearbeiten",
    fields: [
      { name: "name", label: "Name", value: daten.name, required: true },
      { name: "latin_name", label: "Botanischer Name", value: daten.latin_name },
      { name: "family", label: "Familie", value: daten.family },
      { name: "category", label: "Kategorie", value: daten.category },
      { name: "image_url", label: "Bild-URL", value: daten.image_url },
      { name: "description", label: "Beschreibung", value: daten.description }
    ],
    submitText: "Speichern",
    onSubmit: async (update) => {
      await updateDoc(ref, update);
      ladePflanzenListe();
    }
  });
}


// Event-Delegation (für alle Einträge)
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    handleDeletePflanze(e.target.dataset.id);
  }
  if (e.target.classList.contains("edit-btn")) {
    handleEditPflanze(e.target.dataset.id);
  }
});
