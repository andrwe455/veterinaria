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
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(response => response.json()).then(data => {
            const userdata = data.user;
            
            sessionStorage.setItem('user', JSON.stringify(userdata));
            
            if(userdata.role == "user")
            {
                window.location.href = "../Front/indexUser.html";
            }
            else if (userdata.role == "admin")
            {
                window.location.href = "../Front/indexAdmin.html";
            }
            else if (userdata.role == "doctor")
            {
                window.location.href = "../Front/doctor.html";
            }
        });

        alert("Usuario loggeado correctamente");
    } catch (error) {
        console.error('Error:', error);
    }
    alert(sessionStorage.getItem('user.username'));
    console.log(resp);
    return resp;
    // Enviar la solicitud POST al servidor
});

function logout(){
    sessionStorage.removeItem('user');
    window.location.href = "../index.html";
}