async function deleteCategory(id) {
  await fetch('/category/' + id, {
    method: "DELETE",
  })
    .then(res=> res.text()).then(res => alert('The category has been deleted!'));
  location.reload()
}

