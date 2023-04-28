async function handleGoogleCallback() {
  try {
    const response = await supertokensThirdParty.signInAndUp();

    if (response.status === 'OK') {
      console.log(response.user);
      if (response.createdNewUser) {
        // sign up successful
      } else {
        // sign in successful
      }

      console.log('handleGoogleCallback go to index page');
      window.location.assign('/');
    } else {
      window.alert(
        'No email provided by social login. Please use another form of login',
      );
      window.location.assign('/');
    }
  } catch (err) {
    if (err.isSuperTokensGeneralError === true) {
      console.log(err.message);
    } else {
      console.log('Oops! Something went wrong.');
    }
  }
}

handleGoogleCallback();
