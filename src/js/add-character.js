const regeneratorRuntime = require("regenerator-runtime/runtime");

import { imageToBase64} from "./update-character.js";
const imageUpload = document.getElementById("user-image");
const userName = document.getElementById("user-name");
const userShortDescription = document.getElementById("short-dsc");
const userDescription = document.getElementById("detailed-dsc");
const addNewBtn=document.getElementById("addnew");
addNewBtn.addEventListener('click',()=>{
    console.log('adding a new character button has been clicked')
});
let newCharacterObject = {};
document.getElementById("a").addEventListener("click", async () => {
  
    console.log('adding new character')
    if (
      userName.value === "" &&
      userShortDescription.value === "" &&
      userDescription.value === ""
    ) {
      console.log(
        "Nothing recieved \nTry to fill all the submission form fileds"
      );
    } else if (
      userName.value === "" ||
      userShortDescription.value === "" ||
      userDescription.value === ""
    ) {
      console.log(
        "Ooops! \nat list one of the submission form fileds is not completed "
      );
    } else {
      newCharacterObject.name = userName.value;
      newCharacterObject.shortDescription = userShortDescription.value;
      newCharacterObject.description = userDescription.value; 
      newCharacterObject.image=currentBase64;//base64Split
      fetch(beCodeUrl, {
        method: "post",
        body: JSON.stringify(newCharacterObject),
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      });
      
      const getAll = await fetch(beCodeUrl);
      const updatedList = await getAll.json();
      console.log(updatedList);
    }
  });





imageUpload.addEventListener("change", imageToBase64);

// let newCharacterObject = {
//     description: "",
//     image: "",
//     name: "",
//     shortDescription: ""
//   };