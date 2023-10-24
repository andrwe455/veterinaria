async function cargarHistorias() {

    const formDataArray = [];

    let resp;
    try {
        resp = await fetch('http://localhost:3000/mascotas', {
            method: 'GET'});

        if (resp.ok)
        {
            const data = await resp.json();
            if (data && data.length>0)
            {
                data.forEach(mascota => {
                    const formData = {
                        nombre: '',
                        Estado: '',
                        Encargado: '',
                        Fecha_Ingreso: '',
                        Fecha_Salida: '',
                        Duenno: ''
                    };
                    formData.nombre = mascota.nombre;
                    formData.Estado = mascota.Estado;
                    formData.Encargado = mascota.Encargado;
                    formData.Fecha_Ingreso = new Date(mascota.Fecha_Ingreso);
                    formData.Fecha_Salida = new Date(mascota.Fecha_Salida);
                    formData.Duenno = mascota.Duenno;
                    formDataArray.push(formData);
                });
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }

    const table = document.getElementById('tMascotas');

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    formDataArray.forEach(formData => {
        const newRow = table.insertRow(-1);
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        const cell6 = newRow.insertCell(5);
        const cell7 = newRow.insertCell(6);
        const cell8 = newRow.insertCell(7);

        cell1.innerHTML = formData.nombre;

        const Estado = document.createElement('span');
        Estado.textContent = formData.Estado;
        if (Estado.textContent === 'Salida')
        {
            Estado.className = 'badge bg-success';
        }
        else if (Estado.textContent === 'En consulta')
        {
            Estado.className='badge bg-primary';
        }
        else if (Estado.textContent === 'Hospitalización')
        {
            Estado.className = 'badge bg-danger';
        }
        cell4.appendChild( Estado);
        cell5.innerHTML = formData.Encargado;

        const opcionesDeFormato = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };
        cell2.innerHTML = formData.Fecha_Ingreso.toLocaleDateString('es-419', opcionesDeFormato);
        if (formData.Fecha_Salida != 'Invalid Date')
        {
            cell3.innerHTML = formData.Fecha_Salida.toLocaleDateString('es-419', opcionesDeFormato);
        }
        else
        {
            cell3.innerHTML = 'Pendiente';
        }
        const editarSpan = document.createElement('span');
        editarSpan.textContent = 'Editar';
        editarSpan.className = 'btn btn-secondary';


        const historiaButton = document.createElement('button');
        historiaButton.textContent = 'Historia';
        historiaButton.className = 'btn btn-info';

        const trashSpan = document.createElement('span');
        trashSpan.setAttribute('data-feather', 'trash-2');
        trashSpan.className = 'btn btn-secondary';

        cell6.appendChild(historiaButton);
        cell7.appendChild(editarSpan);
        cell8.appendChild(trashSpan);
        feather.replace();
    });
}


function abrirModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
}

function cerrarModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}
async function agregarDatos()  {
    const nombre = document.getElementById('nombre').value;
    const entrada = document.getElementById('fechaIngreso').value;
    const salida = document.getElementById('fechaSalida').value;
    const encargado = document.getElementById('encargado').value;
    const duenno = document.getElementById('duenno').value;
    const estado = document.getElementById('estado').value;

    const formData = {

        nombre: nombre,
        Estado: estado,
        Encargado: encargado,
        Fecha_Ingreso: entrada,
        Fecha_Salida: salida,
        Duenno: duenno,
        _id: duenno
    };

    let resp;

        fetch('http://localhost:3000/crearmascota', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(response => response.json())
            .then(data =>{
                cargarHistorias();
                cerrarModal();
            })
            .catch(error => console.log('Error:', error));
}

