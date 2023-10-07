const form =document.getElementById("signup");
form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    // Obtener los valores de los campos de entrada
    var username = document.getElementById("name").value;
    var email = document.getElementById("emails").value;
    var password = document.getElementById("pass").value;

    // Crear un objeto con los datos del formulario
    var formData = {
        usuario: username,
        Email: email,
        password: password
    };
    let resp;
    try {
        resp=await  fetch('http://localhost:3000/nuevo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
        alert("Usuario creado");
    } catch (error) {
        console.error('Error:', error);
    }
    console.log(resp);
    // Enviar la solicitud POST al servidor
});