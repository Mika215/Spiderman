const regeneratorRuntime = require("regenerator-runtime/runtime");
// import {imageDisplay} from "./single-charachter.js"; //the main image display are imported
// const recievedImage = document.getElementById("user-image");
const recievedName = document.getElementById("new-name");
const recievedShortDescription = document.getElementById("shortDescription");
const recievedDescription = document.getElementById("markdown");

const imageUpload = document.getElementById("user-image");

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


const beCodeUrl = "https://character-database.becode.xyz/characters";
const targetId = localStorage["stored"];

const saveCharacter = async() => {
  
  let response = await fetch(`${beCodeUrl}/${targetId}`);
  let targetCharacter = await response.json();

  targetCharacter.id = targetId;
  if (imageUpload.image === null || imageUpload.image === "" || imageUpload.image === undefined) {
    targetCharacter.image = targetCharacter.image;
  } else {

    //something not working around here
    targetCharacter.image = currentBase64;
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
  console.log('well done Wahooo!')
 
};

//collecting modifications from the user

const editMode = async () => {
  let response = await fetch(`${beCodeUrl}/${targetId}`);
  let targetCharacter = await response.json();

  recievedName.value = targetCharacter.name;

  recievedShortDescription.textContent = targetCharacter.shortDescription;
  recievedDescription.textContent = targetCharacter.description;
  console.log("Now you can edit the content");

};
//converting the userImage into base64 format so that we can use it as the src of the image later on


imageUpload.addEventListener("change", imageToBase64);

const updateCharacterBtn = document.getElementById("show");
const saveChangesBtn = document.getElementById("submit");

saveChangesBtn.addEventListener("click", saveCharacter);
updateCharacterBtn.addEventListener("click", editMode);

export const updateCharacterForm = () => {
  console.log("update character form opened");
};
// const formContainer=document.getElementById('form-container');

export const cancelChanges = () => {
  console.log("changes canceled");
  !event.preventDefault();
};
