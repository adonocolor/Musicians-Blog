async function signout() {

  await fetch('/auth/signout', {
    method: "POST",
    headers: {
      'rid': 'emailpassword',
      'api-key': 'G4VOGar7ZEQ0fj8ds-pp=gIufPd8Uw',
      'cdi-version' : '5.0.0',
    },
  })
    .then(res => res.text()).then(res => alert(res));
}