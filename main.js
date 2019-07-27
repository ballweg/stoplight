
// utlilty ajax function
//
function ajax(url){
  var httpRequest;
  document.getElementById("go").addEventListener('click', makeRequest(url));

  function makeRequest(url) {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      console.error('Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = logResponse;
    httpRequest.open('POST', url);
    httpRequest.send();
  }

  function logResponse() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        console.log(httpRequest.responseText);
      } else {
        console.error('There was a problem with the request.');
      }
    }
  }
}

// Update UI to match light setup.
function updateUI(redOn, yelOn, grnOn){
  var r  = 'ff0000';    // red
  var y  = 'ffcc5c';    // yellow
  var g  = '00bb22';    // green
  var x  = '000000';    // off/black

  var redCirc = document.getElementById("stop");
  var yelCirc = document.getElementById("yellow");
  var grnCirc = document.getElementById("go");

  if(redOn){
    redCirc.style.background = "#"+r;
  } else {
    redCirc.style.background = "#"+x;
  }
  if(yelOn){
    yelCirc.style.background = "#"+y;
  } else {
    yelCirc.style.background = "#"+x;
  }
  if(grnOn){
    grnCirc.style.background = "#"+g;
  } else {
    grnCirc.style.background = "#"+x;
  }
}

// define light colors
// return a string that can be sent to the api
//
function setColors(redOn, yelOn, grnOn, lamps){
  var r  = '330000';    // red
  var y  = 'cc5500';    // yellow
  var g  = '003300';    // green
  var x  = '000000';    // off/black

  var colors = '';
  // Red
//   for (var i = 0; i < lamps; i++) {
    if(redOn){
      colors += r;
    } else {
      colors += x;
    }
//   }

  // Yellow
//   for (var i = 0; i < lamps; i++) {
    if(yelOn){
      colors += y;
    } else {
      colors += x;
    }
//   }

  // Green
//   for (var i = 0; i < lamps; i++) {
    if(grnOn){
      colors += g;
    } else {
      colors += x;
    }
//   }
  console.log('writing ' + colors);
  updateUI(redOn, yelOn, grnOn);
  return colors;
}

// set the lights to defined colors
// call api
//
function setLight(state){
  var lamps = 3;
  var token = "?access_token=" + getToken();
  var api   = "https://us.wio.seeed.io/v1/node/GroveLedWs2812D1/segment/0/";
  switch (state) {
    case 'green':
      var colors = setColors(false, false, true, lamps);
      break;
    case 'red':
      var colors = setColors(true, false, false, lamps);
      break;
    case 'yellow':
      var colors = setColors(false, true, false, lamps);
      break;
    default:
      var colors = setColors(false, false, false, lamps);
  }
  ajax(api+colors+token);
  console.log(api+colors+token);
}

// set the auth token in local storage
// allows me to come back and use easily and not post token outside here.
function setToken(){
  var token = document.getElementById("token").value;
  localStorage.setItem('token', token);
}

// gets the token from local storage, puts it in UI, returns to methods
//
function getToken(){
  var token = localStorage.getItem('token', token);
  if (token != ''){
    document.getElementById("token").value = token;
  }
  return token;
}
