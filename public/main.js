const submitButton = document.getElementById("submit-data")

// Add todo
submitButton.addEventListener("click", async function() {
   
    const name = document.getElementById("userInput").value
    const todo = document.getElementById("todoInput").value

    const userFormData = {
        name: name,
        todos: todo
    };

    const userData = await fetch("http://localhost:3000/add", {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(userFormData)
    })
    const userDataJson = await userData.json()
    console.log(userDataJson)
})


