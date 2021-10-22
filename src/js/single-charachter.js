const updateBtn = document.getElementById("update");
const deleteBtn = document.getElementById("delete");

updateBtn.addEventListener("click", () => {
  console.log(
    "I am the UPDATE button do you whant me to help you update your charachter"
  );
});

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
 * Rendering the fetched data to the user
 */
const imageDisplay = document.querySelector("single__image");
const nameDisplay = document.querySelector("single__name");
const shortDiscription = document.querySelector("single__short-discription");
const detailedDiscription = document.querySelector(
  "single__detailed-discription"
);
const nextBtn = document.getElementById("next");
const base64Header = "data:image/jpeg;base64";
let id;
const renderCharacter = async () => {
  const characters = await fetchCharacters();
  for (let i = 0; i <= characters.length; i++);
  const currentCharacter = characters[i];
  let fetchedSrc = currentCharacter.image;
  let base64 = `${base64Header},${fetchedSrc}`;
  detailedDiscription.textContent = currentCharacter.description;
  shortDiscription.textContent = currentCharacter.shortDescription;
  nameDisplay.textContent = currentCharacter.name;
  imageDisplay.src = base64;
  id = currentCharacter.id;
};

nextBtn.addEventListener("click", () => {
  //This will be replaced with the "render character function"
  console.log("next character rendering");
});
