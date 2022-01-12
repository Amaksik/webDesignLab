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
    

    try{
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
    
    alert(value);
    document.cookie = `test2=${value}`;

}


document.cookie = "user=John;"

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
  document.getElementById("boxSix").style.backgroundColor = colour;
}



function StartUp(){

  var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)test2\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  
  
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

const input = document.querySelector('textarea');
input.addEventListener('select', logSelection);