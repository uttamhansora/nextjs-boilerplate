const BASE_URL = document
  .getElementById("mainifest-json")
  .getAttribute("data-backend-url");
const FRONTEND_URL = document
  .getElementById("mainifest-json")
  .getAttribute("data-frontend-url");
fetch(`${BASE_URL}mainifest`)
  .then((response) => response.json())
  .then((data) => {
    data.start_url = FRONTEND_URL;
    data.scope = FRONTEND_URL;
    const stringManifest = JSON.stringify(data);
    const blob = new Blob([stringManifest], { type: "application/json" });
    const manifestURL = URL.createObjectURL(blob);
    document.querySelector("#mainifest-json").setAttribute("href", manifestURL);
  });
