"use strict";
const byId = (id) => document.getElementById(id);
const models = ["Typhoon OCR 2 2B", "OpenThai Text", "OpenThai Markdown"];

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function disclosure(title, content) {
  const details = element("details");
  details.append(element("summary", title), element("pre", content));
  return details;
}

function render(item) {
  for (const button of byId("cases").children) {
    button.setAttribute("aria-pressed", String(button.dataset.case === item.id));
  }
  byId("reference").textContent = item.reference;
  byId("case-title").textContent = item.title;
  byId("description").textContent = item.description;
  byId("source-image").src = "assets/" + item.id + ".webp";
  byId("source-image").alt = "ภาพต้นฉบับ " + item.title;
  byId("full-image").href = "assets/" + item.page + ".webp";
  byId("official").href = item.official;

  const head = element("thead");
  const headers = element("tr");
  for (const label of item.headers) {
    const header = element("th", label);
    header.scope = "col";
    headers.append(header);
  }
  head.append(headers);
  const body = element("tbody");
  for (const [label, original, result, status] of item.rows) {
    const row = element("tr");
    row.append(element("td", label), element("td", original), element("td", result, status));
    body.append(row);
  }
  byId("comparison-table").replaceChildren(head, body);

  byId("models").replaceChildren(...models.map((model, index) => {
    const card = element("article", undefined, "model");
    const result = comparisonData.pages[item.page][index];
    const [note, excerpt] = item.notes[index];
    card.append(element("h3", model), element("p", note), element("pre", excerpt, "excerpt"),
      disclosure("Prompt / วิธีเรียก", comparisonData.prompts[index]),
      disclosure("ผล OCR เต็มหน้า", result));
    return card;
  }));
}

function activeCase() {
  const item = comparisonData.cases.find((entry) => "#" + entry.id === location.hash);
  render(item || comparisonData.cases[0]);
}

for (const item of comparisonData.cases) {
  const button = element("button", item.tab);
  button.type = "button";
  button.dataset.case = item.id;
  button.addEventListener("click", () => {
    history.replaceState(null, "", "#" + item.id);
    render(item);
  });
  byId("cases").append(button);
}
byId("questions").textContent = comparisonData.questions;
window.addEventListener("hashchange", activeCase);
activeCase();
