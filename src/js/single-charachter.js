const regeneratorRuntime=require('regenerator-runtime/runtime')
const updateBtn = document.getElementById("update");
const deleteBtn = document.getElementById("delete");
const tplSingle = document.querySelector("#tpl-single");
const trgSingle = document.querySelector("#single-target")
const characterId = localStorage["stored"];

//Import Character from the main page
const loadCharacters = async() => {
  let response = await fetch("https://character-database.becode.xyz/characters/"+characterId);
  let character = await response.json();

  let charImport = document.importNode(tplSingle.content, true)
  charImport.querySelector('#single-image').src = "data:image/png;base64," + character.image;
  charImport.querySelector('.single__name').textContent = character.name;
  charImport.querySelector('.single__short-discription').textContent = character.shortDescription;
  charImport.querySelector('.single__detailed-discription').textContent = character.description;

  trgSingle.appendChild(charImport) 
}
loadCharacters()

//Update Character
updateBtn.addEventListener("click", () => {
  console.log(
    "I am the UPDATE button do you whant me to help you update your charachter"
  );
});

//Delete Character
deleteBtn.addEventListener("click", () => {
  let action = confirm(`are you sure you want to delete this charachter`);
  let didConfirm = true;
  //the confirmation interaction is not complete revise it
  if (!didConfirm) {
    console.log("action aborted nothing deleted");
  } else {
    console.log("you have deleted this charachter");
  }
});

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
const imageDisplay = document.getElementById("single-image");
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
  detailedDiscription.textContent = currentCharacter.description;
  detailedDiscription.classList.add("single__detailed-discription");
  shortDiscription.textContent = currentCharacter.shortDescription;
  nameDisplay.textContent = currentCharacter.name;
  console.log(imageDisplay.src);
  imageDisplay.src = base64;
  id = counter; // or currentCharacter.id;
  console.log(id);
};

nextBtn.addEventListener("click", renderCharacter);
