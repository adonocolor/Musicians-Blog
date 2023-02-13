var list = document.querySelector('ul')
var todos;

function toLocal() {
   todos = list.innerHTML;
   localStorage.setItem('todos', todos);
}

list.addEventListener('click', function (e) {
   if (e.target.tagName === "LI") {
      e.target.classList.toggle('checked')
   } else if (e.target.tagName === "SPAN") {
      var div = e.target.parentNode;
      div.remove();
      toLocal();
   }
}, false);

function newElement() {
   var li = document.createElement('li');
   var inputValue = document.getElementById('toDoE1').value;
   var t = document.createTextNode(inputValue);
   li.appendChild(t);
   if (inputValue === "") {
      return;
   } else {
      document.getElementById('list').appendChild(li);
   }

   document.getElementById('toDoE1').value = "";
   var span = document.createElement('SPAN');
   var txt = document.createTextNode("Delete");
   span.className = "close";
   span.appendChild(txt);
   li.appendChild(span);
   toLocal();
}

if (localStorage.getItem('todos')) {
   list.innerHTML = localStorage.getItem('todos');
}