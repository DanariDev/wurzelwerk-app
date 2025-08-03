import { db } from "../firebase.js";
import { getDocs, collection } from "firebase/firestore";

import { renderPflanzenEntry } from "./pflanzen-verwaltung.js";

const pflanzenListe = document.getElementById("pflanzen-liste");
const steckbrief = document.getElementById("pflanzen-steckbrief");

export async function ladePflanzenListe() {
  if (!pflanzenListe) return;
  const querySnapshot = await getDocs(collection(db, "pflanzen"));
  pflanzenListe.innerHTML = "";
  querySnapshot.forEach((docu) => {
    const pflanze = docu.data();
    const id = docu.id;
    const eintrag = document.createElement("div");
    eintrag.innerHTML = renderPflanzenEntry(pflanze, id);
    pflanzenListe.appendChild(eintrag);
  });
  pflanzenListe.style.display = "block";
  if (steckbrief) steckbrief.style.display = "none";
}
