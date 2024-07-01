/*
Copyright fr000gs
Licensed under GNU AGPL 3.0
Made for my personal use
*/
import * as mod from "./sha512.min.js";

const $pswd = document.getElementById("pswd");
const $usr = document.getElementById("usr");
const $psw = document.getElementById("psw");

var confirm_password = false;

function hanelkpress() {
    makepss();
    copyPassword();
}


function handleKeyPress(e){
 var key=e.keyCode || e.which;
  if (key==13){
     makepss();
     copyPassword();
  }
}

function showpsw(){
  var x = document.getElementById("psw");
  var y = document.getElementById("conf_psw");
  if (x.type === "password") {
    x.type = y.type = "text";
  } else {
    x.type = y.type = "password";
  }
} 

function confirm_toggle(){
  if (confirm_password === true) {
    confirm_password = false;
  } else {
    confirm_password = true;
  }
}

function makepss() {
  var text = sha512($psw.value + $usr.value);
  var value = '';
  for (var i = 0; i < text.length; i++) {
    if (i % 8 == 0) {
      value = value + text[i];
    }
  }
  $pswd.innerHTML = value + "@A";
}

document.getElementById("makepsbtn")
  .addEventListener("click", makepss, false);

function copyPassword() {
  var copyText = $pswd.innerHTML;
  navigator.clipboard.writeText(copyText);
}

document.getElementById("copybtn")
  .addEventListener("click", copyPassword, false);

$psw.addEventListener("keydown", (event) => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  handleKeyPress(event);
});
