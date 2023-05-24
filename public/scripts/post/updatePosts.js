function updatePostsButton() {
  let posts = document.querySelectorAll('.post')

  for (let i = 0; i < posts.length; i++) {
    let button = document.createElement('button')
    button.innerText = 'Update'
    button.setAttribute('type', 'button')
    button.setAttribute('onclick', `updatePostForm(${posts.item(i).getAttribute('data-id')})`)
    posts.item(i).append(button)
  }
}

async function updatePostForm(id) {
  let post = document.querySelector(`[data-id="${id}"]`);
  let updateForm  = document.createElement('form')
  let postTitleInput = document.createElement('input')
  postTitleInput.setAttribute('placeholder', 'Post Title')
  postTitleInput.setAttribute('id', 'post-title')
  postTitleInput.setAttribute('value', `${post.querySelector('.post-title').innerText}`)
  let postContentInput = document.createElement('input')
  postContentInput.setAttribute('placeholder', 'Post Contents')
  postContentInput.setAttribute('id', 'post-content')
  postContentInput.setAttribute('value', `${post.querySelector('.post-content').innerText}`)
  let updateButton = document.createElement('button')
  let p = document.createElement('p')
  p.innerText = 'Categories:'
  let categoriesInput = document.createElement('input')
  categoriesInput.setAttribute('id', 'categories')
  updateButton.innerText = 'Update'
  updateButton.setAttribute('type', 'submit')
  categoriesInput.setAttribute('placeholder', 'Categories')
  updateForm.append(postTitleInput)
  updateForm.append(post.querySelector('.post-date'))
  updateForm.append(postContentInput)
  updateForm.append(p)
  updateForm.append(categoriesInput)
  updateForm.append(updateButton)


  let categories = post.querySelectorAll('.category-name')
  console.log(categories.item(0).innerText)
  let stringCat = ''


  for (let i = 0; i < categories.length; i++) {
    if (i + 1 === categories.length) {
      stringCat += categories.item(i).innerText
      break
    }
    stringCat += categories.item(i).innerText + ', '
  }

  categoriesInput.setAttribute('value', stringCat)
  console.log(stringCat)

  updateForm.setAttribute('onsubmit', `updatePost(event, this, ${id})`)

  while(post.firstChild) {
    post.removeChild(post.firstChild);
  }


  post.append(updateForm)
}

async function updatePost(e, form, id) {
  e.preventDefault()

  let catObjs = []
  let cat_names = form.querySelector('#categories').value
  console.log(cat_names)

  cat_names = cat_names.split(", ")

  for (let i = 0; i < cat_names.length; i++) {
    let category = {
      categoryName : cat_names[i]
    }
    catObjs.push(category)
  }

  let obj = {
    'postTitle' : form.querySelector('#post-title').value,
    'postContent' : form.querySelector('#post-content').value,
    'categories' : catObjs,
  }

  console.log(obj)

  await fetch('/post/' + id, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then(res=> res.text()).then(res => alert(res));

  console.log(JSON.stringify(obj))


  location.reload()
}
