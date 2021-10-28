const regeneratorRuntime = require("regenerator-runtime/runtime");

const recievedName = document.getElementById("new-name");
const recievedShortDescription = document.querySelector("#shortDescription");
const recievedDescription = document.querySelector("#markdown");
const imageUpload = document.getElementById("user-image");
const beCodeUrl = `https://character-database.becode.xyz/characters`;

let currentBase64;
let base64Split;
const imageToBase64 = (element) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    currentBase64 = reader.result;
    base64Split = currentBase64.split(",")[1]; //picking only the base 64 without the haders but this seems to be unnessesary it works well with out split
    console.log(base64Split);
  };
  reader.readAsDataURL(file);
};

let newCharacterObject = {};

document.querySelector("#submit").addEventListener("click", async () => {
  event.preventDefault();

  newCharacterObject.name = recievedName.value;
  newCharacterObject.shortDescription = recievedShortDescription.value;
  newCharacterObject.description = recievedDescription.value;
  newCharacterObject.image = base64Split; //currentBase64;

  fetch(beCodeUrl, {
    method: "post",
    body: JSON.stringify(newCharacterObject),
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });

  console.log(newCharacterObject);

  window.addEventListener("mousemove", (e) => {
    window.location.href = "index.html"; //cool eventlistner it refreshes the page on `mousemove`
    console.log("mouse movement detected");
  });
});

imageUpload.addEventListener("change", imageToBase64);
