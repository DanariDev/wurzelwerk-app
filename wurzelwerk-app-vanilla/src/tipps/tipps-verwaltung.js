import { db } from "../firebase.js";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { openUniversalModal } from "../editPopup.js";
import { ladeTippsListe } from "./list.js";
import { ADMIN_UID } from "../auth.js";

// User merken
let currentUser = null;
window.setCurrentUserTipp = function(user) { currentUser = user; };

// Rendering für einen Tipp-Eintrag
export function renderTippEntry(tipp, id) {
  let btns = '';
  if (currentUser && currentUser.uid === ADMIN_UID) {
    btns += `<button class="delete-btn" data-id="${id}">🗑️ Löschen</button>`;
  }
  btns += `<button class="edit-btn" data-id="${id}">✏️ Bearbeiten</button>`;
  return `
    <div class="tipp-eintrag-card">
      <span class="tipp-eintrag-title">${tipp.title}</span>
      ${btns}
    </div>
  `;
}

// Bearbeiten
export async function handleEditTipp(id) {
  const ref = doc(db, "tipps", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;
  const daten = snap.data();

  openUniversalModal({
    title: "Tipp bearbeiten",
    fields: [
      { name: "title", label: "Titel", value: daten.title, required: true },
      { name: "text", label: "Text", value: daten.text, type: "textarea" }
    ],
    submitText: "Speichern",
    onSubmit: async (update) => {
      await updateDoc(ref, update);
      ladeTippsListe();
    }
  });
}

// Löschen (nur für Admin)
export async function handleDeleteTipp(id) {
  if (!currentUser || currentUser.uid !== ADMIN_UID) {
    alert("Nur der Admin kann Tipps löschen!");
    return;
  }
  if (confirm("Willst du diesen Eintrag wirklich löschen?")) {
    await deleteDoc(doc(db, "tipps", id));
    ladeTippsListe();
  }
}

// Event-Delegation für die Buttons (global)
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    handleDeleteTipp(e.target.dataset.id);
  }
  if (e.target.classList.contains("edit-btn")) {
    handleEditTipp(e.target.dataset.id);
  }
});
