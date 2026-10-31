const form = document.querySelector("#form"),
  value = document.querySelector("#value"),
  from = document.querySelector("#from"),
  to = document.querySelector("#to"),
  badge = document.querySelector("#badge"),
  answer = document.querySelector("#answer"),
  error = document.querySelector("#error");
const symbols = { C: "°C", F: "°F", K: "K" };
function celsius(n, u) {
  return u === "C" ? n : u === "F" ? ((n - 32) * 5) / 9 : n - 273.15;
}
function unit(n, u) {
  return u === "C" ? n : u === "F" ? (n * 9) / 5 + 32 : n + 273.15;
}
function convert(n, a, b) {
  if (a === "K" && n < 0) throw Error("Kelvin cannot be below 0 K.");
  let result = unit(celsius(n, a), b);
  if (b === "K" && result < -1e-9)
    throw Error(
      "This is below absolute zero and cannot be represented in Kelvin.",
    );
  return Math.abs(result) < 1e-10 ? 0 : Number(result.toFixed(4));
}
function show() {
  try {
    if (value.value.trim() === "")
      throw Error("Please enter a temperature value.");
    let result = convert(Number(value.value), from.value, to.value);
    answer.textContent = `${result} ${symbols[to.value]}`;
    error.textContent = "";
  } catch (e) {
    error.textContent = e.message;
    answer.textContent = "Please check your value.";
  }
}
function updateBadge() {
  badge.textContent = symbols[from.value];
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  show();
});
from.addEventListener("change", updateBadge);
document.querySelector("#swap").addEventListener("click", () => {
  let old = from.value;
  from.value = to.value;
  to.value = old;
  updateBadge();
  if (value.value.trim()) show();
});
document.querySelectorAll("[data-v]").forEach((btn) =>
  btn.addEventListener("click", () => {
    value.value = btn.dataset.v;
    from.value = btn.dataset.f;
    to.value = btn.dataset.t;
    updateBadge();
    show();
  }),
);
updateBadge();
