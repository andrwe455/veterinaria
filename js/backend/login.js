const lform =document.getElementById("loginForm");
lform.addEventListener("submit", async function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    // Obtener los valores de los campos de entrada
    var email = document.getElementById("email").value;
    var password = document.getElementById("pswd").value;

    // Crear un objeto con los datos del formulario
    var formData = {
        Email: email,
        password: password
    };
    let resp;
    try {
        resp=await  fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (resp.status==200) {
            window.location.href = "../../Website/Admin/index.html";
        }
        alert("Usuario loggeado correctamente");
    } catch (error) {
        console.error('Error:', error);
    }
    console.log(resp);
    return resp;
    // Enviar la solicitud POST al servidor
});