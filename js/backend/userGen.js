
const formularioFoto = document.getElementById('profileForm');

formularioFoto.addEventListener('submit', (e) => {
    e.preventDefault();

    const fotoPerfilInput = document.getElementById('profilePicture');
    const archivo = fotoPerfilInput.files[0];

    const user = JSON.parse(sessionStorage.getItem('user'));
    const fotoId = user._id;
    
    var formData = new FormData();
    formData.append('_id', fotoId);
    formData.append('fotoPerfil', archivo);

    fetch(`http://localhost:3000/fotoPerfil/${fotoId}`).then(response => {
        if (!response.ok) {
            throw new Error(`Error al cargar la imagen: ${response.status}`);
        }
        return response.blob();  // Convertir la respuesta a un objeto Blob
    }).then(data => {
        fetch(`http://localhost:3000/fotoPerfil/${fotoId}`, {
            method: 'PUT',
            body: formData
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar la imagen: ${response.status}`);
            }
            return response.blob();  // Convertir la respuesta a un objeto Blob
        }).then(blob => {
            // Crear una URL del objeto Blob y asignarla a la propiedad src de la etiqueta img
            alert("hola");
            const imageUrl = URL.createObjectURL(blob);
            imagenPerfil.src = imageUrl;
            imagenPerfil.alt = 'Foto de perfil';

        }).catch(error => {
            console.error('Error:', error);
            // Puedes manejar el error aquí (por ejemplo, mostrar un mensaje de error en la interfaz)
        });
    }).catch(error => {
        console.error('Error:', error);
        // Puedes manejar el error aquí (por ejemplo, mostrar un mensaje de error en la interfaz)
        fetch('http://localhost:3000/fotoPerfil', {
        method: 'POST',
        body: formData
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data && data.status === 'success') {
                alert('Foto subida correctamente');
            } else {
                alert('Error al subir la foto');
            }
        })
        .catch(err => {
            console.error('Error en la solicitud:', err);
        });
    });
    
});