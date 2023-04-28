async function googleSignInClicked() {
  try {
    const authUrl =
      await supertokensThirdParty.getAuthorisationURLWithQueryParamsAndSetState(
        {
          providerId: 'google',

          authorisationURL:
            'https://ado-web-sem-6.onrender.com/user/callback/google',
        },
      );

    console.log(authUrl);

    window.location.assign(authUrl);
  } catch (err) {
    if (err.isSuperTokensGeneralError === true) {
      window.alert(err.message);
    } else {
      window.alert(
        'Oops! Something went wrong.\n' + err.message
          ? err.message
          : 'message is undefined',
      );
    }
  }
}

const user = JSON.parse(localStorage.getItem('user'));

if (user) {
  const nameElement = document.createElement('p');
  nameElement.textContent = `Logged in as ${user.username}`;
  document.body.appendChild(nameElement);

  const loginButton = document.querySelector('a[href="#login-form"]');
  loginButton.style.display = 'none';

  const logoutButton = document.createElement('a');
  logoutButton.href = '#';
  logoutButton.textContent = 'Logout';
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('user');
    location.reload();
  });
  document.body.appendChild(logoutButton);
}

async function doesSessionExist() {
  let isUserExisted = await supertokensSession.doesSessionExist();

  if (isUserExisted) {
    let userId = await supertokensSession.getUserId();
    let user = await supertokensThirdParty.getUserById(userId);
    console.log(user);
  }
}

async function logout() {
  await supertokensSession.signOut();

  alert('You have successfully logged out of your account.');

  window.location.reload();
}

doesSessionExist();
