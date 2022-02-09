const $form = document.querySelector("#form-store");
const $result = document.querySelector("#result");

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  $result.innerHTML = "";
  const url = "http://localhost:3000/read";
  fetch(url, {
    method: "GET",
  })
    .then(async (response) => {
      const result = await response.json();
      if (response.status === 200) {
        for (let i = 0; i < result.query.length; ++i) {
          let p = document.createElement("p");
          p.innerHTML = `${result.query[i].name} : ${result.query[i].score}`;
          $result.appendChild(p);
        }
      } else {
        $result.innerHTML = `<p>${result.msg}</p>`;
      }
    })
    .catch((error) => console.log("error", error));
});
