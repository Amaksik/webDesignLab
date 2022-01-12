'use strict'
StartUp();
let radius = 23;

function switchText1(){
    let textSix = document.getElementById('textSix').innerHTML;
    let textOne = document.getElementById('textOne').innerHTML;

    

    document.getElementById('textSix').innerHTML = textOne;
    document.getElementById('textOne').innerHTML = textSix;

}

function calculateCircleAndShow(){
    
    let textFive = document.getElementById('textFive').innerText;

    let area = radius*radius* Math.PI;

    let textToAdd = `\n\n Radius is ${area}`

    document.getElementById('textFive').innerText = textFive + textToAdd;


}

function FindMax(){
    

    try
    {
      let intval = parseInt(  document.getElementById('lnumb').value ); 

      cookieWriter(maxDigit(intval));

        
    }
    catch{
        document.getElementById('lnumb').innerText = "";
        alert("not correct input");
    }

}

function maxDigit(n){
    n= 0 | n ;
    var max=-1, remainder=-1;
    do {
      remainder = n % 10;
      max = (max > remainder ) ? max : remainder ;
      n=(n-remainder)*1e-1;
    } while (n!=0);
    return max;
  }

function cookieWriter(value){
    
    alert("max digit is \n" + value);
    document.cookie = "test2="+value;

}


setTimeout(() => { alert("start"); }, 4000);

setTimeout(() => { switchText1(); }, 4000);

setTimeout(() => { calculateCircleAndShow(); }, 4000);

//task 4

function logSelection(event) {
  const log = document.getElementById('textSix');

  let colour = prompt("Please enter colour", "purple");
  if (colour == null || colour == "") {
    colour = "magenta";
  } 
  console.log(colour)
  window.localStorage.setItem('bgcolour', colour);
  document.getElementById("boxSix").style.backgroundColor = colour;
}



function StartUp(){

  var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)test2\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  
  var cookie = getCookie("test2");
  if(cookieValue !=="" &&cookieValue !== null){
    if (confirm(`saved max val is -> ${cookieValue} save it?`)) {
      //working with last value
      document.getElementById("formForNumber").style.visibility = "hidden";

    } else {
      //restart class
      document.getElementById("formForNumber").style.visibility = "visible";
      deleteAllCookies();
    }
  }

  let colour = window.localStorage.getItem('bgcolour');
  if (colour !== null && colour !== "") {
    document.getElementById("boxSix").style.backgroundColor = colour;
  }
  window.localStorage.removeItem("localTable");
  tableCreation();
}


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}


function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}


//Task5
function tableCreation(){
  let allImg = document.querySelectorAll("img");

  for (const img of allImg) {
      img.addEventListener("mouseout",function( event ) {
          let formId = 2;
          document.getElementById("tableData"+formId+"Form").style.display = "block";
          let buttonToAdd = document.getElementById("tableButton"+formId);
          buttonToAdd.addEventListener("click",function (){
              let inputForBlock = document.getElementById("tableData"+formId);
              if(inputForBlock.value !== ""){
                  let localTable = window.localStorage.getItem("localTable");
                  if(localTable === null){
                      let newTableObject = {};
                      let newBlockObject = {};
                      newBlockObject[0] = inputForBlock.value;
                      newTableObject["tableData"+formId] = newBlockObject;
                      window.localStorage.setItem("localTable", JSON.stringify(newTableObject));
                  }
                  else{
                      let parsedTable = JSON.parse(localTable);
                      if(parsedTable["tableData"+formId] !== undefined){
                          parsedTable["tableData"+formId][Object.keys(parsedTable["tableData"+formId]).length] = inputForBlock.value;
                          window.localStorage.setItem("localTable", JSON.stringify(parsedTable));
                      }
                      else{
                          let newBlockObject = {};
                          newBlockObject[0] = inputForBlock.value;
                          parsedTable["tableData"+formId] = newBlockObject;
                          window.localStorage.setItem("localTable", JSON.stringify(parsedTable));
                      }
                  }
                  let blockToAppend = document.getElementById("block"+formId);
                  let tableToAdd  = document.getElementById("table"+formId);
                  if(tableToAdd !== null){
                      blockToAppend.removeChild(tableToAdd);
                  }
                  tableToAdd = document.createElement("table");
                  tableToAdd.id = "table"+formId;
                  tableToAdd.setAttribute("border-spacing","0");
                  tableToAdd.setAttribute("border-collapse","collapse");
                  tableToAdd.setAttribute("cellspacing","0");
                  tableToAdd.setAttribute("style","margin-bottom:2rem;width:100%");
                  let dataForCurrentTable = JSON.parse(window.localStorage.getItem("localTable"))["tableData"+formId];
                  console.log(dataForCurrentTable);
                  if(Object.keys(dataForCurrentTable).length % 2 !== 0){
                      let tr = tableToAdd.insertRow();
                      for(let cell in dataForCurrentTable){
                          let td = tr.insertCell();
                          td.appendChild(document.createTextNode(dataForCurrentTable[cell]));
                          td.style.border = '1px solid black';
                      }
                  }else{
                      let tr1 = tableToAdd.insertRow();
                      let tr2 = tableToAdd.insertRow();
                      for(let cell in dataForCurrentTable){
                          if(cell % 2 === 0){
                              let td = tr1.insertCell();
                              td.appendChild(document.createTextNode(dataForCurrentTable[cell]));
                              td.style.border = '1px solid black';
                          }
                          else{
                              let td = tr2.insertCell();
                              td.appendChild(document.createTextNode(dataForCurrentTable[cell]));
                              td.style.border = '1px solid black';
                          }

                      }
                  }
                  blockToAppend.appendChild(tableToAdd);
              }

          });

      });

  }
}



const input = document.querySelector('textarea');
input.addEventListener('select', logSelection);