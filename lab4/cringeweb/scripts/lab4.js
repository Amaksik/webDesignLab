var info = {
    speed : 350
};

 $.ajax({
   url: 'https://localhost:5001/getInfo',
   type: 'GET',
   data: {},
   success: function (result) {
       info.speed = result.square_speed;
   }
 });

//#region VARIABLES

  var ball = document.getElementById("square");
  var container = document.getElementById("anim");
  
  var width = ball.offsetWidth;
  var height = ball.offsetHeight; 
  var cW = container.offsetWidth;
  var cH = container.offsetHeight;
  var x = 0;
  var y = 0;
  var step = 1;
  var dx = step;
  var dy = -step;

    var requestId;
    var toStop = false;
    var log = '';

  var PLAY = document.getElementById('playButton');
  var CLOSE = document.getElementById('closeButton');
  var START = document.getElementById('startButton');
  var STOP = document.getElementById('stopButton');
  var RELOAD = document.getElementById('reloadButton');  

//#endregion VARIABLES
   
    START.addEventListener('click', function(e){
      logText("pressed start button");
      toStop = false;
      START.style.display = 'none';
      STOP.style.display = 'block';
      ball.style.display = 'block';
      movement();
});
    STOP.addEventListener('click', function(e){
      logText("pressed stop button");
      stop();
      STOP.style.display = 'none';
      START.style.display = 'block';
});
    RELOAD.addEventListener('click', function(e){
      logText("pressed reload button");
      toStop = false;
      START.style.display = 'block';
      STOP.style.display = 'none';
      RELOAD.style.display = 'none';

       x = 0;
      y = 0;
});
    PLAY.addEventListener('click', function(e){
    logText("pressed play button");
    var work = document.getElementById('work');
    if(work.style.display == 'none' || work.style.display == ''){
        work.style.visibility = "visible";
        work.style.display = 'block';
    }
});
    CLOSE.addEventListener('click', function(e){
    logText("pressed close button");
    var work = document.getElementById('work');
    if(work.style.display == 'block'){
        work.style.display = 'none';
    }

    let element = document.createElement('p');
    element.innerText = log;
    document.getElementById('log').appendChild(element)
});

  function movement() {
    if(!toStop){
      requestId = requestAnimationFrame(moveball);
    }else{
      ball.style.display = 'none';
    }

     function moveball(timestamp) {
      if (x <= -10){
        dx = 1;
        x = cH;
        stop();
        ball.style.display = 'none';
        START.style.display = 'none';
        STOP.style.display = 'none';
        RELOAD.style.display = 'block';
        logText("got out of the box");
      } else if (x + width >= cW){
        dx = -1;
        x = cW - height ;
        logText("hit right edge");
      }
      if (y <= 1){
        dy= 1;
        y = y;
        logText("hit top edge");
      } else if (y + height >= 1 + cH){
        dy = -1;
        y = 1 + cH - height
        logText("hit bottom edge");
      }

       dt = 0.016;
      
      x += dt * info['speed'] * dx;
      y += dt * info['speed']  * dy;

       ball.style.transform = "translate(" + x + "px, " + y + "px)";

       if(!toStop){
        requestId = requestAnimationFrame(moveball);
      }else{
        ball.style.display = 'none';
      }
    }
  }
  function stop() {
    window.cancelAnimationFrame(requestId);
    requestId = undefined;
    toStop = true;
  }
  function logText(element){
    ul = document.getElementById('operations');
    var li = document.createElement('li');
    li.setAttribute('class','item');
    
     ul.appendChild(li);
    currentdate = new Date(); 
    var datetime = "[" + currentdate.getDate() + "-"
            + (currentdate.getMonth()+1)  + "-" 
            + currentdate.getFullYear() + "-"  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds()+"]";
    li.innerHTML += datetime + " " + element;
    log+='\n ' + datetime + ' ' + element;
    localStorage.setItem(datetime,element);
  }
