async function createCategory(e, form) {
  e.preventDefault()
  await fetch('/category/', {
    method: "POST",
    body: new URLSearchParams(new FormData(form))})
    .then(res=> res.text()).then(res => alert(res));

  return false
}