/*
Copyright fr000gs
Licensed under GNU AGPL 3.0
Made for my personal use
*/
import * as mod from "./sha512.min.js";

const $pswd = document.getElementById("pswd");
const $usr = document.getElementById("usr");
const $psw = document.getElementById("psw");
const $show_psw = document.getElementById("show_psw");
const $conf_psw = document.getElementById("conf_psw");
const $conf_psw_enable = document.getElementById("conf_psw_enable");

var confirm_password = false;

function handleKeyPress(e){
 var key=e.keyCode || e.which;
  if (key==13){
     makepss();
     copyPassword();
  }
}

function showpsw(){
  if ($psw.type === "password") {
    $psw.type = $conf_psw.type = "text";
  } else {
    $psw.type = $conf_psw.type = "password";
  }
}
$show_psw.onclick = showpsw;

function confirm_toggle(){
  if (confirm_password === true) {
    confirm_password = false;
  } else {
    confirm_password = true;
  }
}

$conf_psw_enable.onclick = confirm_toggle;

function check_confirm() {
  if (confirm_password === true) {
    if ($conf_psw.value == $psw.value) {
      return true;
    }
    else {
      return false;
    }
  }
  else {
    return true;
  }
}

function makepss() {
  if (check_confirm() === false) {
    alert('confirm password');
    return;
  }
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
