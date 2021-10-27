const regeneratorRuntime=require('regenerator-runtime/runtime')
const tpl = document.querySelector("#tpl-hero");
const target = document.querySelector("#target");
const base64Header = "data:image/jpeg;base64";

const showList = async () => {
    const response = await fetch("https://character-database.becode.xyz/characters");
    
    let responseJson = await response.json()
    
    for(let element of responseJson){
        //make a copy of the template card
        let tplImport = document.importNode(tpl.content, true)
        
        //select element from the html to be copied
        let name = tplImport.querySelector(".main__name")
        let shortDesc = tplImport.querySelector(".main__short-description")
        let image = tplImport.querySelector(".main__img__photo")
        let btnSingle = tplImport.querySelector("#main__singlePage");

        //store the character id to be pulled in the single character page
        btnSingle.addEventListener("click",()=>{
            localStorage["stored"] = element.id;
        })
        
        //link the html element to the api element
        name.textContent = element.name
        shortDesc.textContent = element.shortDescription
        image.src = `${base64Header},${element.image}`;
        
        //add copy of tpl to the ol
        target.appendChild(tplImport)
    }
    
};

showList()