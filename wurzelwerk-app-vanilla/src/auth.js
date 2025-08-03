// src/auth.js

import app, { db } from "./firebase.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { setDoc, doc, getDocs, collection, query, where } from "firebase/firestore";
export const ADMIN_UID = "NZy9PFROtzWn4w92smklEIQFzmA3";

const auth = getAuth(app);

// E-Mail zum Benutzernamen finden
async function getEmailForUsername(username) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    return snapshot.docs[0].data().email || null;
  }
  return null;
}

// Registrierung
export async function registerUser(username, password, email = "") {
  if (!email) {
    email = `${username}@noemail.com`; // Fallback
  }
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await setDoc(doc(db, "users", user.uid), {
    username,
    email: email === `${username}@noemail.com` ? "" : email,
    createdAt: Date.now()
  });
  return user;
}

// Login
export async function loginUser(username, password) {
  const email = await getEmailForUsername(username);
  if (!email) throw new Error("Benutzername nicht gefunden.");
  return signInWithEmailAndPassword(auth, email, password);
}

// Logout
export async function logoutUser() {
  await signOut(auth);
}

// Overlay und App-Content holen
const authOverlay = document.getElementById("auth-overlay");
const appContent = document.getElementById("app-content");
const loginArea = document.getElementById("login-area");
const registerArea = document.getElementById("register-area");

// Login/Register-UI
if (document.getElementById("show-register-btn")) {
  document.getElementById("show-register-btn").onclick = () => {
    loginArea.style.display = "none";
    registerArea.style.display = "block";
  };
}
if (document.getElementById("show-login-btn")) {
  document.getElementById("show-login-btn").onclick = () => {
    registerArea.style.display = "none";
    loginArea.style.display = "block";
  };
}

if (document.getElementById("login-form")) {
  document.getElementById("login-form").onsubmit = async (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;
    const errorBox = document.getElementById("login-error");
    errorBox.textContent = "";
    try {
      await loginUser(username, password);
    } catch (err) {
      errorBox.textContent = "Fehler beim Login: " + err.message;
    }
  };
}

if (document.getElementById("register-form")) {
  document.getElementById("register-form").onsubmit = async (e) => {
    e.preventDefault();
    const username = document.getElementById("register-username").value.trim();
    const password = document.getElementById("register-password").value;
    const email = document.getElementById("register-email").value.trim();
    const errorBox = document.getElementById("register-error");
    errorBox.textContent = "";
    try {
      await registerUser(username, password, email);
      errorBox.textContent = "Account erstellt! Jetzt anmelden.";
    } catch (err) {
      errorBox.textContent = "Fehler bei der Registrierung: " + err.message;
    }
  };
}

// Logout global
window.logoutUser = logoutUser;

// Auth-Status überwachen und App-Content steuern!
export function onUserChanged(callback) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      authOverlay.style.display = "flex";
      appContent.style.display = "none";
      callback(null);
    } else {
      authOverlay.style.display = "none";
      appContent.style.display = "block";
      callback(user);
    }
  });
}
