const $response = document.querySelector("#response");
const $form_entry = document.querySelector("#form_entry");
const $name = document.querySelector("#name");
const $score = document.querySelector("#score");

$form_entry.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $name.value.toLowerCase().trim();
  const score = parseInt($score.value.trim());
  $name.value = "";
  $score.value = "";
  const url = "http://ptsv2.com/t/ifcsm-1644177595/post";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, score }),
  })
    .then(async (response) => {
      const result = await response.json();
      if (response.status === 200) {
        $response.innerHTML = `<p>${result.msg}</p>`;
      } else {
        $response.innerHTML = `<p>${result.msg}</p>`;
      }
    })
    .catch((error) => console.log("error", error));
});
