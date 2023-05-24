async function updateCategory(e, form, id) {
  e.preventDefault()
  let catName = form.querySelector('.form-item-button')
  console.log(catName.value)
  await fetch('/category/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'categoryName': catName.value,
    })
  })
    .then(res=> res.text()).then(res => alert(res));

  location.reload()
}

function makeUpdateForm(id) {
  let node = document.querySelector(`[data-id="${id}"]`);
  let name = node.querySelector('.category-name-item')
  let f = document.createElement('form')
  let input = document.createElement('input')
  f.append(input)
  input.setAttribute('class', 'form-item-button')
  input.setAttribute('type', 'text')
  input.setAttribute('name', 'сategoryName')
  input.setAttribute('value', name.innerText)
  let update_btn = node.querySelector('.update-category-button')
  update_btn.remove()

  let button = document.createElement('button')
  button.setAttribute('type', 'submit')
  button.setAttribute('class', 'update-category-button')
  button.innerText = 'Update'
  f.append(button)
  f.setAttribute('onsubmit', `updateCategory(event, this, ${id})`)
  name.replaceWith(f)
}

