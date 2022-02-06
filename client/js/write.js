const $definition = document.querySelector("#definition");
const $form_word = document.querySelector("#form_word");
const $word = document.querySelector("#word");

$form_word.addEventListener("submit", (e) => {
  e.preventDefault();
  const word = $word.value.toLowerCase().trim();
  $word.value = "";
  const url = `http://localhost:3000`;
  fetch(url, {
    method: "GET",
  })
    .then(async (response) => {
      const result = await response.json();
      if (response.status === 200) {
        const final_response = `<p>Request #${result.requestNumber}</p><p>${word} : ${result[word]}</p>`;
        $definition.innerHTML = final_response;
      } else {
        $definition.innerHTML = `<p>Request #${result.requestNumber},</p><p>${result.msg}</p>`;
      }
    })
    .catch((error) => console.log("error", error));
});
