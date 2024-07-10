/*
Copyright fr000gs
Licensed under GNU AGPL 3.0
Intended for personal use
*/
import * as mod_sha512 from "./sha512.min.js";

const $passwordOutput = document.getElementById("password-output");
const $usernameInput = document.getElementById("username-input");
const $passwordInput = document.getElementById("password-input");
const $showPasswordCheckbox = document.getElementById("show-password-checkbox");
const $confirmPasswordInput = document.getElementById("confirm-password-input");
const $confirmPasswordCheckbox = document.getElementById("confirm-password-checkbox");

let isConfirmPasswordEnabled = false;

function togglePasswordVisibility() {
  const type = $passwordInput.type === "password" ? "text" : "password";
  $passwordInput.type = $confirmPasswordInput.type = type;
}

$showPasswordCheckbox.onclick = togglePasswordVisibility;

function toggleConfirmPassword() {
  isConfirmPasswordEnabled = !isConfirmPasswordEnabled;
}

$confirmPasswordCheckbox.onclick = toggleConfirmPassword;

function isPasswordConfirmed() {
  return !isConfirmPasswordEnabled || $confirmPasswordInput.value === $passwordInput.value;
}

function generatePassword() {
  if (!isPasswordConfirmed()) {
    alert('Please confirm your password.');
    return;
  }

  const hashed = sha512($passwordInput.value + $usernameInput.value);
  let generatedPassword = '';
  for (let i = 0; i < hashed.length; i += 8) {
    generatedPassword += hashed.charAt(i);
  }
  $passwordOutput.innerHTML = generatedPassword + "@A";
}

document.getElementById("generate-password-btn").addEventListener("click", generatePassword);

function copyPassword() {
  navigator.clipboard.writeText($passwordOutput.innerHTML);
}

document.getElementById("copy-password-btn").addEventListener("click", copyPassword);

$passwordInput.addEventListener("keydown", (event) => {
  if (!event.isComposing && event.keyCode === 13) {
    generatePassword();
    copyPassword();
  }
});

$usernameInput.addEventListener("keydown", (event) => {
  if (!event.isComposing && event.keyCode === 13) {
    generatePassword();
    copyPassword();
  }
});
