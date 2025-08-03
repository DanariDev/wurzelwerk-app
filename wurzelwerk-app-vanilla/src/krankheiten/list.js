import { db } from "../firebase.js";
import { getDocs, collection } from "firebase/firestore";
import { renderKrankheitEntry } from "./krankheiten-verwaltung.js";

const krankheitenListe = document.getElementById("krankheiten-liste");

export async function ladeKrankheitenListe() {
  if (!krankheitenListe) return;
  const querySnapshot = await getDocs(collection(db, "krankheiten"));
  krankheitenListe.innerHTML = "";
  querySnapshot.forEach((docu) => {
    const krankheit = docu.data();
    const id = docu.id;
    const eintrag = document.createElement("div");
    eintrag.innerHTML = renderKrankheitEntry(krankheit, id);
    krankheitenListe.appendChild(eintrag);
  });
}
