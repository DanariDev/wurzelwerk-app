// universal-modal.js

export function openUniversalModal({
  title = "Bearbeiten",
  fields = [], // Array mit {name, label, type, value, placeholder, required}
  onSubmit,
  submitText = "Speichern",
}) {
  const overlay = document.getElementById("universal-modal");
  const content = document.getElementById("universal-modal-content");

  // Dynamisches Formular bauen
  let formHtml = `<button class="close-btn" id="close-universal-modal-btn">✖</button>
    <h2>${title}</h2>
    <form id="universal-modal-form">`;

  fields.forEach((f) => {
    if (f.type === "list") {
      formHtml += `
          <label>${f.label}</label>
          <div class="list-input-group" data-field="${f.name}">
            ${(f.value && f.value.length ? f.value : [""])
              .map(
                (item, idx) => `
              <div class="list-input-row">
                <input type="text" value="${item}" class="list-input" data-index="${idx}" />
                <button type="button" class="list-remove-btn" data-index="${idx}">✖</button>
              </div>
            `
              )
              .join("")}
            <button type="button" class="list-add-btn" data-field="${
              f.name
            }">+ Hinzufügen</button>
          </div>
        `;
    } else if (f.type === "textarea") {
      formHtml += `
          <label for="modal-field-${f.name}">${f.label}</label>
          <textarea id="modal-field-${f.name}" name="${f.name}" placeholder="${
        f.placeholder || ""
      }" rows="3">${f.value || ""}</textarea>
        `;
    } else {
      formHtml += `
          <label for="modal-field-${f.name}">${f.label}</label>
          <input id="modal-field-${f.name}" name="${f.name}" type="${
        f.type || "text"
      }" value="${f.value || ""}" placeholder="${f.placeholder || ""}" ${
        f.required ? "required" : ""
      }>
        `;
    }
  });

  formHtml += `<button type="submit">${submitText}</button></form>`;
  content.innerHTML = formHtml;
  // + Hinzufügen-Button: neues Feld erzeugen
  content.querySelectorAll(".list-add-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.closest(".list-input-group");
      const row = document.createElement("div");
      row.className = "list-input-row";
      row.innerHTML = `
      <input type="text" class="list-input" value="" />
      <button type="button" class="list-remove-btn">✖</button>
    `;
      group.insertBefore(row, btn);
      row
        .querySelector(".list-remove-btn")
        .addEventListener("click", () => row.remove());
    });
  });
  // ✖ Entfernen-Button (für bestehende Zeilen)
  content.querySelectorAll(".list-remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".list-input-row").remove();
    });
  });

  overlay.style.display = "flex";

  // Schließen
  document.getElementById("close-universal-modal-btn").onclick = () => {
    overlay.style.display = "none";
  };

  // Senden
  document.getElementById("universal-modal-form").onsubmit = (e) => {
    e.preventDefault();
    const data = {};
    fields.forEach((f) => {
      if (f.type === "list") {
        data[f.name] = Array.from(
          document.querySelectorAll(
            `.list-input-group[data-field="${f.name}"] .list-input`
          )
        )
          .map((input) => input.value.trim())
          .filter(Boolean);
      } else if (f.type === "textarea") {
        data[f.name] = document
          .getElementById("modal-field-" + f.name)
          .value.trim();
      } else {
        data[f.name] = document
          .getElementById("modal-field-" + f.name)
          .value.trim();
      }
    });

    onSubmit && onSubmit(data);
    overlay.style.display = "none";
  };
}
