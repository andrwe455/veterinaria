function agregarDatos() {

    const nombre = document.getElementById('nombre').value;
    const entrada = document.getElementById('entrada').value;
    const salida = document.getElementById('salida').value;


    const formData = {
        nombre: nombre,
        entrada: entrada,
        salida: salida
    };

    const table = document.getElementById('dataTable');
    const newRow = table.insertRow(-1);


    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);

    cell1.innerHTML = nombre;
    cell2.innerHTML = entrada;
    cell3.innerHTML = salida;
}