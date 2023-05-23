import * as mod from "/sha512.min.js";

function makepss() {
  var text = sha512(document.getElementById("psw").value + document.getElementById("usr").value );
  var value = '';
  for (var i = 0; i < text.length; i++) {
    if (i % 8 == 0) {
      value = value + text[i];
    }
  }
  document.getElementById("pswd").innerHTML = value + "@A";
}

document.getElementById("makepsbtn")
  .addEventListener("click", makepss, false);

function copyText() {
  var copyText = document.getElementById("pswd").innerHTML;
  navigator.clipboard.writeText(copyText);
}

document.getElementById("copybtn")
  .addEventListener("click", copyText, false);