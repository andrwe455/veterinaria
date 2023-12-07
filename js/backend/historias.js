function guardarhistoria(){
    var formulario = document.getElementById("formulario-paciente");
    var formulario = document.getElementById("formulario-paciente");

			// Acceder a los valores de los campos usando el formulario.elements
    var mascota = formulario.elements["nombreMascota"].value;
    var especie = formulario.elements["especie"].value;
    var raza = formulario.elements["raza"].value;
    var sexo = formulario.elements["sexo"].value;
    var peso = formulario.elements["peso"].value;
    var fechaNacimiento = formulario.elements["fechaNacimiento"].value;

    var  nombrePropietario = formulario.elements["nombrePropietario"].value
    var  direccionPropietario = formulario.elements["direccionPropietario"].value;
    var  numeroPropietario = formulario.elements["numeroPropietario"].value;

    var  motivoConsulta = formulario.elements["motivoConsulta"].value;
    var  diagnosticoConsulta = formulario.elements["diagnosticoConsulta"].value;
    var  tratamientoConsulta = formulario.elements["tratamientoConsulta"].value;

    var sesion = sessionStorage.getItem("user");
    var veterinario = JSON.parse(sesion);
    var id = veterinario._id;
    
    var formData = {
        _id: id,
        Nombre_mascota: mascota,
        Nombre_Duenno: nombrePropietario,
        especie: especie,
        raza: raza,
        sexo: sexo,
        peso: peso,
        fechaNacimiento: fechaNacimiento,
        motivoConsulta: motivoConsulta,
        Diagnostico: diagnosticoConsulta,
        Tratamiento: tratamientoConsulta,
        veterinario: id
    };

    try {
        fetch('http://localhost:3000/crearhistoria', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(response => response.json()).then(data => {
            alert("Historia guardada con exito");
        }).catch(error => {
            console.error('Error:', error);
        });


        
    } catch (error) {
        console.error('Error:', error);
    }
}
