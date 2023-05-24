let response = fetch("/category", {
  method: "GET",
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json"
  }
})
  .then((res) => res)
  .then((data) => data.json());


async function getAllCategories() {
  let categoriesDiv = document.querySelector('#cat-names')
  if (categoriesDiv.firstElementChild) {
    await wrapCategories()
    return
  }
  const categoriesList = await response;
  for (const cat in categoriesList) {
    if (cat !== "time") {
      let d = document.createElement('div')
      d.setAttribute('class', 'category')
      d.setAttribute('data-id', categoriesList[cat].id)
      let el = document.createElement('p')
      el.setAttribute('class', 'category-name-item')
      el.innerText = categoriesList[cat].categoryName
      categoriesDiv.appendChild(el)

      let del = document.createElement('button')
      del.setAttribute('type', 'button')
      del.setAttribute('class', 'form-item')
      del.setAttribute('onclick', `deleteCategory(${categoriesList[cat].id})`)
      del.innerText = 'Delete'

      d.appendChild(el)
      d.appendChild(del)

      let upd = document.createElement('button')
      upd.setAttribute('type', 'button')
      upd.setAttribute('class', `update-category-button`)
      upd.setAttribute('onclick', `makeUpdateForm(${categoriesList[cat].id})`)
      upd.innerText = 'Update'



      d.appendChild(upd)
      categoriesDiv.appendChild(d)
    }
  }

  let button = document.querySelector('#get-cat')
  button.innerText = 'Hide'
}

async function wrapCategories() {
  let categoriesDiv = document.querySelector('#cat-names')
  while(categoriesDiv.firstElementChild) {
    categoriesDiv.firstElementChild.remove();
  }
  let button = document.querySelector('#get-cat')
  button.innerText = 'Check'
}

