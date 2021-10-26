const regeneratorRuntime=require('regenerator-runtime/runtime')
const updateBtn = document.getElementById("update");
const deleteBtn = document.getElementById("delete");
import{ deleteCharacter, openForm } from './update-character.js';

updateBtn.addEventListener("click",openForm);

deleteBtn.addEventListener("click",deleteCharacter);

/**
 * Fetching data from the api
 */
const beCodeUrl = "https://character-database.becode.xyz/characters";
const fetchCharacters = async () => {
  try {
    const res = await fetch(beCodeUrl);
    if (res.status === 200) {
      const characters = res.json();

      return characters;
    }
  } catch (err) {
    console.error(err);
  }
};
/**
 * may be i should rather create the HTML templet dynamically
 * Rendering the fetched data to the user on-load
 */
export const imageDisplay = document.getElementById("single-image");
const nameDisplay = document.getElementById("name");
const shortDiscription = document.getElementById("short");
const detailedDiscription = document.getElementById("detailed");
const nextBtn = document.getElementById("next");
const base64Header = "data:image/jpeg;base64";
let id;
let counter = 0;
const renderCharacter = async () => {
  const characters = await fetchCharacters();
  //   for (let i = 0; i <= characters.length; i++);
  counter++;
  const currentCharacter = characters[counter];
  console.log(currentCharacter);
  let fetchedSrc = currentCharacter.image;
  let base64 = `${base64Header},${fetchedSrc}`;
  detailedDiscription.innerHTML = currentCharacter.description;
  detailedDiscription.classList.add("single__detailed-discription");
  shortDiscription.textContent = currentCharacter.shortDescription;
  nameDisplay.textContent = currentCharacter.name;
  console.log(imageDisplay.src);
  imageDisplay.src = base64;
  id = counter; // or currentCharacter.id;
  console.log(id);
};

nextBtn.addEventListener("click", renderCharacter);
