
function PostAccordion(jsonResult)
{ 
const data = JSON.stringify(jsonResult);
let dataReceived = ""; 
var xhr = new XMLHttpRequest();
var url = "http://localhost:5000/postAccordions";
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(json.title + ", " + json.content);
    }
};
xhr.send(data);

console.log(`Received: ${dataReceived}`)   
}

function GetAccordion(title, content, number){
    var accordionItem = `<div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${number}" aria-expanded="true" aria-controls="collapse${number}">
        ${title}
      </button>
    </h2>
    <div id="collapse${number}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      ${content}
      </div>
    </div>
  </div>`;

  return accordionItem

}

function wrapAccordions(accordionItems){
    let AccordionText = `<div class="accordion" id="accordionExample">
            ${accordionItems}
        </div>`;

    return AccordionText;
}

    let amountOfBlocks = prompt("Input accordion count");
    var jsonResult = [];
    var accordionItems = "";
    var accordionItemsCount = 0;
    if(amountOfBlocks>0){
        for(let i=1; i<=amountOfBlocks; i++){
            alert(`Block ${i} input`)
            let title = prompt(`Whats the title of the block?`);
            let content = prompt(`Whats the content of the block?`);
            
            jsonResult.push({"title": title,
                            "content": content
                            });
        }

    
       PostAccordion(jsonResult);
    }
    else{
        alert("Your imput couldn't be specified as a number. Pleas try again after reloading this page.");
    }


document.getElementById('load-accordion').addEventListener('click', ev =>{
    let Accordions;

    fetch("http://localhost:5000/getAccordions")
    .then(value => value.json())
    .then(json => {
      Accordions = json
    }).catch (er =>
    {
      alert(er);
    }).then( ()=>{
      for(let i=1; i<=Accordions.length; i++)
      {
          accordionItems += GetAccordion(Accordions[i-1].title, Accordions[i-1].content, i)
          accordionItemsCount++;
          let box = document.getElementById('boxhf four');
      
          let wrappedAccordions = wrapAccordions(accordionItems);
          box.insertAdjacentHTML('beforeend', wrappedAccordions);
      }  
      
      var elms = document.querySelectorAll("[id='accordionExample']");

      for(var i = 0; i < elms.length - 1; i++) 
        elms[i].style.display='none';
      });
});