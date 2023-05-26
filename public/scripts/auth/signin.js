async function signin(e, form) {
  e.preventDefault()
  let email = form.querySelector(".form-item[name='email']").value
  let password = form.querySelector(".form-item[name='password']").value
  await fetchThatShit(email, password)
  return false
}

async function fetchThatShit(email, password) {
  let obj = {
    'formFields': [{
      'id': 'email',
      'value': email,
    },
      {
        'id': 'password',
        'value': password,
      },]
  }

  await fetch('/auth/signin', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'rid': 'emailpassword',
      'api-key': 'G4VOGar7ZEQ0fj8ds-pp=gIufPd8Uw',
      'cdi-version' : '5.0.0',
    },
    body: JSON.stringify(obj),
  })
    .then(res => res.text()).then(res => alert(res));

  location.href = 'index'
}

