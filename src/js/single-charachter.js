const regeneratorRuntime=require('regenerator-runtime/runtime')
const updateBtn = document.querySelector("#update");
const tplSingle = document.querySelector("#tpl-single");
const trgSingle = document.querySelector("#single-target")
const characterId = localStorage["stored"];

//Import Character from the main page
const loadCharacters = async() => {
  let response = await fetch("https://character-database.becode.xyz/characters/"+characterId);
  let character = await response.json();

  let charImport = document.importNode(tplSingle.content, true)
  charImport.querySelector('#single-image').src = "data:image/png;base64," + character.image;
<<<<<<< HEAD
  charImport.querySelector('.single__name').innerHTML = character.name;
  charImport.querySelector('.single__short-discription').innerHTML = character.shortDescription;
  charImport.querySelector('.single__detailed-discription').textContent = character.description;
=======
  charImport.querySelector('.single__name').textContent = character.name;
  charImport.querySelector('.single__short-discription').textContent = character.shortDescription;
  charImport.querySelector('.single__detailed-discription').innerHTML = character.description;
>>>>>>> cc4100650e131e00cd93338a36091b815ff9a55b

  trgSingle.appendChild(charImport) 
}
loadCharacters()

//Update Character
/* updateBtn.addEventListener("click", () => {
  console.log(
    "I am the UPDATE button do you want me to help you update your character"
  );
});
 */
//Delete Character
document.getElementById('delete').addEventListener("click", async () => {
  console.log('hello')
  let action = confirm('are you sure you want to delete this character');

  if (action != true) {
    console.log("action aborted nothing deleted");
  } else {
    const result = await fetch(`https://character-database.becode.xyz/characters/${characterId}`, {
            method: 'DELETE',
        });
        window.location.href = "index.html"
        console.log("Deleted")
  }
});


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
