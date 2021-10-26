
 document.querySelector("#submit").addEventListener("click", async() => {
     const image = document.querySelector("#new-image")
    const name = document.querySelector("#new-name").value;
    const shortDescription = document.querySelector("#shortDescription").value;
    const description = document.querySelector("#markdown");
    if (name !== "" && shortDescription !== "" && description !== "") {
        const result = await fetch("https://character-database.becode.xyz/characters", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                shortDescription: shortDescription,
                description: description,
                image: image
            })
        });
    }
})
