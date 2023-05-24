async function updateComment(id) {
  let node = document.querySelector(`.comment[data-id="${id}"]`)
  let button = node.querySelector('.update-comment-button')
  let commentUpdateForm = document.createElement('form')
  let commentTextInput = document.createElement('input')
  commentUpdateForm.append(commentTextInput)
  let commentText = node.querySelector('.commentText')
  commentTextInput.setAttribute('value', `${commentText.innerText}`)
  commentText.replaceWith(commentUpdateForm)
  let newButton = document.createElement('button')
  commentUpdateForm.setAttribute('onsubmit', `fetchComment(event, this, ${id})`)
  commentTextInput.setAttribute('name', 'commentText')
  newButton.setAttribute('type', 'submit')
  newButton.setAttribute('class', 'update-comment-button')
  newButton.innerText = 'Update'
  commentUpdateForm.append(newButton)
  button.remove()
}

async function fetchComment(e, form, id) {
  e.preventDefault()
  let commentText = form.querySelector('input[name="commentText"]')
  await fetch('/comment/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'commentText': commentText.value,
    })
  })
    .then(res=> res.text()).then(res => alert(res));

  location.reload()
}