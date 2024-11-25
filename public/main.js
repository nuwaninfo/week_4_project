const submitButton = document.getElementById("submit-data")
const showMessageSpan = document.getElementById("showMessage")
const searchInput = document.getElementById("searchInput")
const searchButton = document.getElementById("search")
const showTodosDiv = document.getElementById("showTodos")

// Add todo
submitButton.addEventListener("click", async function() {
   
    const name = document.getElementById("userInput").value
    const todo = document.getElementById("todoInput").value

    const userFormData = {
        name: name,
        todo: todo
    };

    const userData = await fetch("http://localhost:3000/add", {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(userFormData)
    })
    const userDataJson = await userData.json()
  
    showMessageSpan.innerHTML = '';
    let newP = document.createElement("p")
    newP.id = 'showMesgP';
    newP.textContent = userDataJson.message;
    showMessageSpan.appendChild(newP)
})

// Search event handler
searchButton.addEventListener("click", async function() {

    const name = searchInput.value.trim();

    const response = await fetch(`http://localhost:3000/todos/${name}`)
    const todosJson = await response.json()

    const ul = document.createElement("ul");

    if (todosJson.data && todosJson.data.todos) {
    todosJson.data.todos.forEach(todo => {
        const li = document.createElement("li");
        li.textContent = todo; 
        ul.appendChild(li);  
        console.log(todo)
    })
    showTodosDiv.appendChild(ul);
    } else {
        showTodosDiv.innerText = todosJson.message
    }
})

function addTodos() {

}
