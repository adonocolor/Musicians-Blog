function activeMenuItem() {
    let current = document.location.pathname.split("/");
    let items = document.getElementsByClassName("list-item");

    current = current[current.length - 1];

    for (let i = 0; i < items.length; i++) {
        let item = items[i].innerHTML;
        if (item.includes(current)) {
            items[i].classList.add("active")
        }
    }
}

document.addEventListener("DOMContentLoaded", activeMenuItem);