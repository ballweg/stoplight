function setLight(state){
  console.log('firing setLight');
  if(state == 'go'){
    console.log('go sub ' + state);
    // whatever XHR to set to go.
  }
  if(state == 'stop'){
    console.log('stop sub ' + state);
    // whatever XHR to do stop
  }
  if(state == 'off'){
    console.log('off sub ' + state);
    // you get the idea, off.
  }
}
