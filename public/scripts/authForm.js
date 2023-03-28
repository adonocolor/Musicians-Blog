auth = document.getElementById('authorization')
let username
let password

auth.addEventListener("submit", ev => {
  ev.preventDefault()

  username = document.getElementById('username')
  password = document.getElementById('password')

  localStorage.setItem('username', username.value)
  hideForm()
  showLog()

  username.value = ''
  password.value = ''
})

auth.addEventListener("reset", ev => {
  localStorage.removeItem('username')

  hideLog()
  showForm()
})

function hideForm() {
  let form = document.getElementById('auth-form')
  form.style.display = "none"
}

function showForm() {
  let form = document.getElementById('auth-form')
  form.style.display = "flex"
}

function showLog() {
  let username = localStorage.getItem('username')
  let signed = document.createElement("form")
  let signedComment = document.createTextNode(`you are signed as ${username}. Log out?`)
  let button = document.createElement("button")
  signed.setAttribute('id', 'auth-signed')
  button.setAttribute("type", "reset")
  button.setAttribute('class', 'auth-item')
  button.innerHTML = "Log out"
  signed.appendChild(signedComment)
  signed.appendChild(button)
  auth.appendChild(signed)
}

function hideLog() {
  let signed = document.getElementById('auth-signed')
  signed.remove()
}

function check() {
  if (localStorage.getItem('username') != null) {
    hideForm()
    showLog()
  }
}

document.addEventListener('DOMContentLoaded', check)