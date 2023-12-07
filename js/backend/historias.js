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

    var  motivoConsulta = formulario.elements["motivoConsulta"].value;
    var  diagnosticoConsulta = formulario.elements["diagnosticoConsulta"].value;
    var  tratamientoConsulta = formulario.elements["tratamientoConsulta"].value;

    var sesion = sessionStorage.getItem("user");
    var veterinario = JSON.parse(sesion);
    var id = veterinario._id;
    
    var formData = {
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

    cargarHistorias();
}

async function cargarHistorias ()
{
    const formDataArray = [];
    const idarray   =   [];

    let resp;
    try {
        resp = await fetch('http://localhost:3000/historias', {
            method: 'GET'});

        if (resp.ok)
        {
            const data = await resp.json();
            if (data && data.length>0)
            {
                data.forEach(mascota => {
                    const formData = {
                        Nombre_Mascota: '',
                        especie: '',
                        raza: '',
                        sexo: '',
                        peso: '',
                    };
                    formData.Nombre_Mascota = mascota.Nombre_mascota;
                    formData.especie = mascota.especie;
                    formData.raza = mascota.raza;
                    formData.sexo = mascota.sexo;
                    formData.peso = mascota.peso;
                    formDataArray.push(formData);

                    const id = mascota._id;
                    idarray.push(id);
                });

            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
    const table = document.getElementById('Tablahistorias');
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    var i = 0;
    formDataArray.forEach(formData => {
        const newRow = table.insertRow(-1);
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        const cell6 = newRow.insertCell(5);
        

        cell1.innerHTML = formData.Nombre_Mascota;
        cell2.innerHTML = formData.especie;
        cell3.innerHTML = formData.raza;
        cell4.innerHTML = formData.sexo;
        cell5.innerHTML = formData.peso;
        cell6.innerHTML = `<button id="pdf${i}" class="fas fa-file-pdf" onclick="generarpdf('${idarray[i]}')">Ver</button>`;
        i++;      
    });
}

async function generarpdf(nombre){
    
    const formdata = {
        '_id': nombre
    }
    fetch('http://localhost:3000/crearPdf', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata)
    }).then(res =>{
        if(!res.ok){
            throw Error(res.status);
        }
        return res.blob();
    }).then(blob =>{
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'prueba.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }).catch(error => {
        console.log(error);
    })
}