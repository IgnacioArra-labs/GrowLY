document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.querySelector('#fruitsVegetablesTable tbody');
    const searchInput = document.querySelector('#searchInput');

    function populateTable(data) {
        tableBody.innerHTML = '';
        data.forEach(item => {
            const row = tableBody.insertRow();
            row.innerHTML = `<td>${item.emoji}</td><td>${item.name}</td><td>${item.variety}</td><td>${item.city}</td><td class="price">${item.price}</td>`;
        });
    }

    function filterData(query) {
        const filteredData = data.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );
        populateTable(filteredData);
    }

    // Obtener datos iniciales desde la API
    async function fetchData() {
        const response = await fetch('http://localhost:5000/api/fruits_vegetables'); // URL de la API
        const data = await response.json();
        populateTable(data);
    }

    fetchData();

    searchInput.addEventListener('input', function () {
        filterData(this.value);
    });

    // Actualizar precio a través de la API
    tableBody.addEventListener('click', function (event) {
        if (event.target.classList.contains('price')) {
            const newName = event.target.parentNode.querySelector('td:nth-child(2)').textContent;
            const newPrice = prompt(`Nuevo precio para ${newName}:`);
            if (newPrice !== null) {
                updatePrice(newName, newPrice);
            }
        }
    });

    async function updatePrice(name, newPrice) {
        const response = await fetch('http://localhost:5000/api/update_price', { // URL de la API
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, new_price: newPrice }),
        });

        const result = await response.json();
        console.log(result);

        // Actualizar la tabla después de la actualización de precio
        fetchData();
    }
});
