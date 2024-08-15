function ListaTenis(id) {
    window.location.href = `Tenis.html?id=${id}`;
}

function displayTenis(data) {
    $("#box__tenis").html(''); // Limpia el contenido actual
    data.forEach(teni => {
        const teniCard = `
            <a class="link__teni" href="Tenis.html?id=${teni._id}">
                <div class="item__tenis">
                    <div class="box__centrarTenis">
                        <img class="img__tenis" src="${teni.image1}" alt="${teni.name}">
                    </div>
                    <p class="texto__descripcionTenis">
                        ${teni.categories}<br>
                        ${teni.name}<br><br>
                        <span class="texto__precio">${teni.price}</span>
                    </p>
                </div>
            </a>`;
        $('#box__tenis').append(teniCard);
    });
}

function displayCategories() {
    let select = $('#filter');
    let categories = [];

    // Obtener categorías únicas
    tenis.forEach(teni => {
        if (!categories.includes(teni.categories)) {
            categories.push(teni.categories);
            select.append(`<option value="${teni.categories}">${teni.categories}</option>`);
        }
    });
}

$(document).ready(function() {
    displayTenis(tenis); // Mostrar todos los tenis al cargar la página
    displayCategories(); // Mostrar las categorías en el select

    // Filtrar los tenis al cambiar la categoría en el select
    $("#filter").change(function() {
        let category = $(this).val();
        let filteredTenis;
        if (category === 'all') {
            filteredTenis = tenis; // Mostrar todos los tenis si la categoría es 'all'
        } else {
            filteredTenis = tenis.filter(function(teni) {
                return teni.categories === category; // Filtrar por la categoría seleccionada
            });
        }
        displayTenis(filteredTenis); // Mostrar los tenis filtrados
    });
});

document.getElementById('menuButton').addEventListener('click', function () {
    document.getElementById('Menu').classList.toggle('open');
});

document.getElementById('closeButton').addEventListener('click', function () {
    document.getElementById('Menu').classList.remove('open');
});