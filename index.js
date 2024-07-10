document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('search');
    const genreFilter = document.getElementById('genre-filter');
    const sortSelect = document.getElementById('sort-select');
    const festivalList = document.getElementById('festival-list');

    let festivalsData = [];

    /**
     * Fetches festival data from the API.
     * @returns {Promise<Object[]>}
     */
    async function fetchFestivals() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            festivalsData = data.records.map(record => record.fields);
            return festivalsData;
        } catch (error) {
            console.error("Erreur lors de la récupération des festivals :", error);
            return [];
        }
    }

    /**
     * Displays a list of festivals in the DOM.
     * @param {Object[]} festivals
     */
    function displayFestivals(festivals) {
        festivalList.innerHTML = '';

        festivals.forEach(festival => {
            const card = document.createElement('div');
            card.className = 'festival-card';

            card.innerHTML = `
                <h2>${festival.nom_du_festival}</h2>
                <p><strong>Région :</strong> ${festival.region_principale_de_deroulement}</p>
                <p><strong>Département :</strong> ${festival.departement_principal_de_deroulement}</p>
                <p><strong>Commune :</strong> ${festival.commune_principale_de_deroulement}</p>
                <p><strong>Discipline dominante :</strong> ${festival.discipline_dominante}</p>
                ${festival.site_internet_du_festival ? `<p><a href="${festival.site_internet_du_festival}" target="_blank">Site du festival</a></p>` : ''}
            `;

            festivalList.appendChild(card);
        });
    }

    /**
     * Filters the festival list based on a search query and selected genre.
     * @param {Object[]} festivals
     * @param {string} query 
     * @param {string} selectedGenre
     * @returns {Object[]} 
     */
    function filterFestivals(festivals, query, selectedGenre) {
        return festivals.filter(festival => 
            (festival.nom_du_festival.toLowerCase().includes(query.toLowerCase()) ||
            festival.region_principale_de_deroulement.toLowerCase().includes(query.toLowerCase()) ||
            festival.departement_principal_de_deroulement.toLowerCase().includes(query.toLowerCase()) ||
            festival.commune_principale_de_deroulement.toLowerCase().includes(query.toLowerCase())) &&
            (selectedGenre === '' || festival.discipline_dominante.toLowerCase().includes(selectedGenre.toLowerCase()))
        );
    }

    /**
     * Sorts the festivals array by a given property in ascending or descending order.
     * @param {Object[]} festivals 
     * @param {string} sortBy 
     * @param {string} sortOrder 
     * @returns {Object[]}
     */
    function sortFestivalsBy(festivals, sortBy, sortOrder) {
        const sortedFestivals = [...festivals];
        sortedFestivals.sort((a, b) => {
            const itemA = a[sortBy].toLowerCase();
            const itemB = b[sortBy].toLowerCase();
            if (sortOrder === 'asc') {
                if (itemA < itemB) return -1;
                if (itemA > itemB) return 1;
                return 0;
            } else { // descending order
                if (itemA > itemB) return -1;
                if (itemA < itemB) return 1;
                return 0;
            }
        });
        return sortedFestivals;
    }


    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        const selectedGenre = genreFilter.value;
        const sortedBy = sortSelect.value.split('-')[0];
        const sortOrder = sortSelect.value.split('-')[1];
        
        fetchFestivals().then(festivals => {
            let filteredFestivals = filterFestivals(festivals, query, selectedGenre);
            if (sortedBy) {
                filteredFestivals = sortFestivalsBy(filteredFestivals, sortedBy, sortOrder);
            }
            displayFestivals(filteredFestivals);
        });
    });


    genreFilter.addEventListener('change', (e) => {
        const selectedGenre = e.target.value;
        const query = searchInput.value;
        const sortedBy = sortSelect.value.split('-')[0];
        const sortOrder = sortSelect.value.split('-')[1];
        
        fetchFestivals().then(festivals => {
            let filteredFestivals = filterFestivals(festivals, query, selectedGenre);
            if (sortedBy) {
                filteredFestivals = sortFestivalsBy(filteredFestivals, sortedBy, sortOrder);
            }
            displayFestivals(filteredFestivals);
        });
    });


    sortSelect.addEventListener('change', (e) => {
        const selectedGenre = genreFilter.value;
        const query = searchInput.value;
        const sortedBy = e.target.value.split('-')[0];
        const sortOrder = e.target.value.split('-')[1];
        
        fetchFestivals().then(festivals => {
            let filteredFestivals = filterFestivals(festivals, query, selectedGenre);
            if (sortedBy) {
                filteredFestivals = sortFestivalsBy(filteredFestivals, sortedBy, sortOrder);
            }
            displayFestivals(filteredFestivals);
        });
    });


    fetchFestivals().then(festivals => displayFestivals(festivals));
});
