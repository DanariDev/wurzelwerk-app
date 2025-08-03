import { db } from "../firebase.js";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { openUniversalModal } from "../editPopup.js";
import { ladeKrankheitenListe } from "./list.js";
import { ADMIN_UID } from "../auth.js";

let currentUser = null;
window.setCurrentUserKrankheit = function (user) {
  currentUser = user;
};

// Rendering für Eintrag
export function renderKrankheitEntry(krankheit, id) {
  let btns = "";
  if (currentUser && currentUser.uid === ADMIN_UID) {
    btns += `<button class="delete-btn" data-id="${id}">🗑️ Löschen</button>`;
  }
  btns += `<button class="edit-btn" data-id="${id}">✏️ Bearbeiten</button>`;
  return `
    <div class="krankheit-eintrag-card">
      <span class="krankheit-eintrag-name">${krankheit.name}</span>
      ${btns}
    </div>
  `;
}

export async function handleEditKrankheit(id) {
  const ref = doc(db, "krankheiten", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;
  const daten = snap.data();

  openUniversalModal({
    title: "Krankheit bearbeiten",
    fields: [
      { name: "name", label: "Name", value: daten.name, required: true },
      {
        name: "symptoms",
        label: "Symptome",
        type: "list",
        value: daten.symptoms || [],
      },
      {
        name: "treatment",
        label: "Behandlung",
        type: "list",
        value: daten.treatment || [],
      },
    ],
    submitText: "Speichern",
    onSubmit: async (update) => {
      await updateDoc(ref, update);
      ladeKrankheitenListe();
    },
  });
}

export async function handleDeleteKrankheit(id) {
  if (!currentUser || currentUser.uid !== ADMIN_UID) {
    alert("Nur der Admin kann Krankheiten löschen!");
    return;
  }
  if (confirm("Willst du diesen Eintrag wirklich löschen?")) {
    await deleteDoc(doc(db, "krankheiten", id));
    ladeKrankheitenListe();
  }
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    handleDeleteKrankheit(e.target.dataset.id);
  }
  if (e.target.classList.contains("edit-btn")) {
    handleEditKrankheit(e.target.dataset.id);
  }
});
