const $response = document.querySelector("#response");
const $form_entry = document.querySelector("#form_entry");
const $name = document.querySelector("#name");
const $score = document.querySelector("#score");

$form_entry.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $name.value.toLowerCase().trim();
  const score = parseInt($score.value);
  $name.value = "";
  $score.value = "";
  // http://localhost:3000/write
  // https://nodejs-mysql-4537.herokuapp.com/write
  const url = "http://localhost:3000/write";
  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      name,
      score,
    }),
  })
    .then(async (response) => {
      const result = await response.json();
      $response.innerHTML = `<p>${result.msg}</p>`;
    })
    .catch((error) => console.log("error", error));
});
