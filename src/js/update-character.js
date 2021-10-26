const regeneratorRuntime = require("regenerator-runtime/runtime");

import {imageDisplay} from "./single-charachter.js";//the main image display are imported 

export const deleteCharacter = (target) => {
  let action = confirm(`are you sure you want to delete this charachter`);
  let didConfirm = true;
  //the confirmation interaction is not complete revise it
  if (!didConfirm) {
    console.log("action aborted nothing deleted");
  } else {
    console.log(`you have deleted ${characters.target} this charachter`);
  }
  console.log("character deleted");
};

export const openForm = () => {
  console.log("popout form opened");
};

export const cancelChanges = () => {
  console.log("changes canceled");
  !event.preventDefault();
};

const imageUpload = document.getElementById("user-image");
const actionDiv = document.getElementById("btn-section");
const tempoContainer = document.createElement("div");
const tempoImage = document.createElement("img");

let myCharacterObject = {
  description: "",
  image: "",
  name: "",
  shortDescription: "",
};
//collecting modifications from the user
const userName = document.getElementById("user-name");
const userShortDescription = document.getElementById("short-dsc");
const userDescription = document.getElementById("detailed-dsc");

//converting the userImage into base64 format so that we can use it as the src of the image later on

//since my previous function is adding the base64 header infront of each imgaes fetched from the API
//i will need to cut it out when i am using the below function to recive an edited object again.
//substring split(",")[0],[1] are good methods to do so.
export let currentBase64;
export let base64Split;
export const imageToBase64 = (element) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    currentBase64 = reader.result;
    imageDisplay.src = currentBase64;
    // tempoImage.src = currentBase64;
    // tempoContainer.append(tempoImage);
    // actionDiv.append(tempoContainer);
    // base64Split = currentBase64.split(",")[1]; //picking only the base 64 without the haders but this seems to be unnessesary it works well with out split
  };
  reader.readAsDataURL(file);
};

imageUpload.addEventListener("change", imageToBase64);

const saveChanges = () => {
  event.preventDefault(); //this prevents the page from automatically refreshing

  myCharacterObject.name = userName.value;
  myCharacterObject.image = currentBase64; //base64Split this must be chacked and replaced ig it has any sideeffect

  myCharacterObject.description = userDescription.value;
  myCharacterObject.shortDescription = userShortDescription.value;

  // app.put()
 const beCodeUrl=`https://character-database.becode.xyz/characters`;

//  fetch(`${beCodeUrl}/${character.id}`, {
//     method: "put",
//     body: JSON.stringify(myCharacterObject),
//     headers: {
//       "content-type": "application/json; charset=UTF-8",
//     }
//   console.log(myCharacterObject);

//   console.log("characters has beensuccesfully updated");
};

const saveChangesBtn = document.getElementById("save-changes");
saveChangesBtn.addEventListener("click", saveChanges);

