const regeneratorRuntime=require('regenerator-runtime/runtime')
const tpl = document.querySelector("#tpl-hero");
const target = document.querySelector("#target");
const base64Header = "data:image/jpeg;base64";

const showList = async () => {
    const response = await fetch("https://character-database.becode.xyz/characters");
    
    let responseJson = await response.json()
    
    for(let element of responseJson){
        let tplImport = document.importNode(tpl.content, true)
        
        let name = tplImport.querySelector(".main__name")
        let shortDesc = tplImport.querySelector(".main__short-description")
        let image = tplImport.querySelector(".main__img__photo")
        
        name.textContent = element.name
        shortDesc.textContent = element.shortDescription

        image.src = `${base64Header},${element.image}`;
        
        target.appendChild(tplImport)
    }
    
};

showList()