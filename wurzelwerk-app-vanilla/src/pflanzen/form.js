import { db } from "../firebase.js";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { ladePflanzenListe } from "./list.js";

const openBtn = document.getElementById("pflanze-hinzufuegen-btn");
const closeBtn = document.getElementById("close-form-btn");
const overlay = document.getElementById("pflanze-form-overlay");
const form = document.getElementById("pflanze-form");

const familieCombo = document.getElementById("familie-combo");
const familieDatalist = document.getElementById("familie-datalist");
const kategorieCombo = document.getElementById("kategorie-combo");
const kategorieDatalist = document.getElementById("kategorie-datalist");

function showWarn(msg) {
  let warn = document.getElementById("pflanze-warn");
  if (!warn) {
    warn = document.createElement("div");
    warn.id = "pflanze-warn";
    warn.style.color = "#a33";
    warn.style.margin = "0.7rem 0 0.2rem 0";
    form.parentNode.insertBefore(warn, form);
  }
  warn.textContent = msg;
}

async function ladeFamilienUndKategorien() {
  familieDatalist.innerHTML = "";
  const familienSnapshot = await getDocs(collection(db, "familien"));
  familienSnapshot.forEach(docu => {
    const opt = document.createElement("option");
    opt.value = docu.data().name;
    familieDatalist.appendChild(opt);
  });

  kategorieDatalist.innerHTML = "";
  const kategorienSnapshot = await getDocs(collection(db, "kategorien"));
  kategorienSnapshot.forEach(docu => {
    const opt = document.createElement("option");
    opt.value = docu.data().name;
    kategorieDatalist.appendChild(opt);
  });

  if (familieCombo) familieCombo.value = "";
  if (kategorieCombo) kategorieCombo.value = "";
}

if (openBtn && overlay) {
  openBtn.addEventListener("click", () => {
    overlay.style.display = "flex";
    showWarn("");
    ladeFamilienUndKategorien();
  });
}

if (closeBtn && overlay) {
  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    showWarn("");
  });
}

if (form && overlay) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    data.family = familieCombo.value.trim() || "Unbekannt";
    data.category = kategorieCombo.value.trim() || "Unbekannt";

    // Duplikat-Prüfung nach Name
    const q = query(collection(db, "pflanzen"), where("name", "==", data.name.trim()));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      showWarn("Diese Pflanze gibt es schon im Pool!");
      return;
    }
    await addDoc(collection(db, "pflanzen"), data);
    form.reset();
    overlay.style.display = "none";
    showWarn("");
    ladePflanzenListe();
  });
}
