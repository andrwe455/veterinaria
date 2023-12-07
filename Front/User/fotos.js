document.addEventListener('DOMContentLoaded', () => {
    const imagenPerfil = document.getElementById('imagenPerfil');
   // Reemplaza con el ID real de la foto

    const user = JSON.parse(sessionStorage.getItem('user'));
    
    
    const fotoId = user._id;

    // Construir la URL del endpoint
    const url = `http://localhost:3000/fotoPerfil/${fotoId}`;

    // Realizar la solicitud FETCH para obtener la imagen
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar la imagen: ${response.status}`);
            }
            return response.blob();  // Convertir la respuesta a un objeto Blob
        })
        .then(blob => {
            // Crear una URL del objeto Blob y asignarla a la propiedad src de la etiqueta img
            alert("hola");
            const imageUrl = URL.createObjectURL(blob);
            imagenPerfil.src = imageUrl;
            imagenPerfil.alt = 'Foto de perfil';

        })
        .catch(error => {
            console.error('Error:', error);
            // Puedes manejar el error aquí (por ejemplo, mostrar un mensaje de error en la interfaz)
        });
});