// Carga inicial de datos desde una API
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => console.log('Datos cargados desde la API:', data))
        .catch(error => console.error('Error al cargar los datos:', error));
});

// Función para manejar clics en los botones
function handleClick(seccion) {
    alert(`Has seleccionado: ${seccion}`);
    console.log(`Navegando a la sección: ${seccion}`);
}



