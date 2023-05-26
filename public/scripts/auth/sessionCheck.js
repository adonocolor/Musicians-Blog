window.onload = async () =>  {
  let cookie = cookieResult('st-access-token')
  if (cookie !== undefined) {
    document.querySelector('#authorization').innerHTML = `
    <p>Congrats! You are logged in!</p>
    <button id="sign-out" class="auth-item" type="button" onclick="signout()">Sign out</button>
    `
    location.reload()
  }
}

function cookieResult(cookieName) {
  let cookie = {};
  document.cookie.split(';').forEach(function(e) {
    let [key,value] = e.split('=');
    cookie[key.trim()] = value;
  })
  return cookie[cookieName];
}