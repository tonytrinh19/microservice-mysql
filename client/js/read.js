const $form = document.querySelector("#form-store");
const $form_word = document.querySelector("#word");
const $form_definition = document.querySelector("#definition");
const $result = document.querySelector("#result");

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const word = $form_word.value.toLowerCase().trim();
  const definition = $form_definition.value.trim();
  $form_word.value = "";
  $form_definition.value = "";
  const url = "http://localhost:3000";
  fetch(url, {
    method: "POST",
    body: JSON.stringify({ word, definition }),
  })
    .then(async (response) => {
      const result = await response.json();
      if (response.status === 201) {
        $result.innerHTML = `<p>Request #${result.requestNumber}</p><p>New entry recorded:</p>
        <p>"${word} : ${definition}"</p>`;
      } else {
        $result.innerHTML = `<p>${result.msg}</p>`;
      }
    })
    .catch((error) => console.log("error", error));
});
