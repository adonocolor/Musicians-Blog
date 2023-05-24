async function createPost(e, form) {
  e.preventDefault()

  let catObjs = []
  let cat_names = form.querySelector('#categories').value
  cat_names = cat_names.split(", ")
  for (let i = 0; i < cat_names.length; i++) {
    let category = {
      categoryName : cat_names[i]
    }
    catObjs.push(category)
  }

  let obj = {
    'postTitle' : form.querySelector('#postTitle').value,
    'postContent' : form.querySelector('#postContent').value,
    'categories' : catObjs,
  }

  await fetch('/post/', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
    })
    .then(res=> res.text()).then(res => alert(res));

  return false
}