const regeneratorRuntime = require("regenerator-runtime/runtime");

const recievedName = document.getElementById("new-name");
const recievedShortDescription = document.getElementById("shortDescription");
const recievedDescription = document.getElementById("markdown");
const formContainer = document.getElementById("form-container");
const closeBtn = document.getElementById("close");
const cancelBtn = document.getElementById("x-short");
const imageUpload = document.getElementById("user-image"); // i intentionally have added two different close buttons on

let currentBase64;
let base64Split;
const imageToBase64 = (element) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    currentBase64 = reader.result;
    base64Split = currentBase64.split(",")[1]; //picking only the base 64 without the haders
  };
  reader.readAsDataURL(file);
};

const beCodeUrl = "https://character-database.becode.xyz/characters";
const targetId = localStorage["stored"];

const saveCharacter = async () => {
  let response = await fetch(`${beCodeUrl}/${targetId}`);
  let targetCharacter = await response.json();

  targetCharacter.id = targetId;
  if (imageUpload.files.length <= 0) {
    //this condition checks wheather the user uploaded and image or not
    //if the user didn't upload any file(imageUpload.length<=0) then the img src remains the same as the API
    targetCharacter.image = targetCharacter.image;
  } else {
    // but if the user uploaded an image(imageUpload.files.length > 0) then the generated base64 will be the new src
    targetCharacter.image = base64Split;
    console.log(base64Split);
  }

  if (recievedName.value === null || recievedName.valuee === "") {
    targetCharacter.name = targetCharacter.name;
  } else {
    targetCharacter.name = recievedName.value;
  }
  if (recievedDescription.value === null || recievedDescription.value === "") {
    targetCharacter.description = targetCharacter.description;
  } else {
    targetCharacter.description = recievedDescription.value;
  }

  if (
    recievedShortDescription.value === null ||
    recievedShortDescription.value === ""
  ) {
    targetCharacter.shortDescription = targetCharacter.shortDescription;
  } else {
    targetCharacter.shortDescription = recievedShortDescription.value;
  }
  fetch(`${beCodeUrl}/${targetId}`, {
    method: "put",
    body: JSON.stringify(targetCharacter),
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });
  console.log("character succesfully updated");

  window.addEventListener("mousemove", (e) => {
    window.location.href = "single-charachter.html"; //cool eventlistner it refreshes the page on `mousemove`
    console.log("mouse movement detected");
  });
};

//collecting modifications from the user

const editMode = async () => {
  formContainer.style.display = "block"; //displays the form container
  console.log("update clicked");
  let response = await fetch(`${beCodeUrl}/${targetId}`);
  let targetCharacter = await response.json();

  recievedName.value = targetCharacter.name;
  recievedShortDescription.textContent = targetCharacter.shortDescription;
  recievedDescription.textContent = targetCharacter.description;
};
//converting the userImage into base64 format so that we can use it as the src of the image later on

imageUpload.addEventListener("change", imageToBase64);

const updateCharacterBtn = document.querySelector(".update");
const saveChangesBtn = document.getElementById("submit");

saveChangesBtn.addEventListener("click", saveCharacter);
updateCharacterBtn.addEventListener("click", editMode);

// const formContainer=document.getElementById('form-container');

const cancelChanges = () => {
  console.log("changes canceled");
  formContainer.style.display = "none"; //hides the form container
  // !event.preventDefault();
};

closeBtn.addEventListener("click", cancelChanges);
cancelBtn.addEventListener("click", cancelChanges);
