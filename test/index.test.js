const { fetchFestivals, filterFestivals } = require('../index'); // Assurez-vous du chemin d'importation correct

describe('fetchFestivals function', () => {
    // Mock fetch function
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ results: [] }),
        })
    );

    it('fetches festivals successfully', async () => {
        const festivals = await fetchFestivals();
        expect(festivals).toEqual([]);
    });

    it('handles fetch error gracefully', async () => {
        // Mock fetch function to throw an error
        fetch.mockImplementationOnce(() => Promise.reject("Fetch error"));

        const festivals = await fetchFestivals();
        expect(festivals).toEqual([]);
    });
});

describe('filterFestivals function', () => {
    const festivals = [
        { nom_du_festival: "Festival A", region_principale_de_deroulement: "Region A", departement_principal_de_deroulement: "Département A", commune_principale_de_deroulement: "Commune A", discipline_dominante: "Discipline A" },
        { nom_du_festival: "Festival B", region_principale_de_deroulement: "Region B", departement_principal_de_deroulement: "Département B", commune_principale_de_deroulement: "Commune B", discipline_dominante: "Discipline B" }
    ];

    it('filters festivals based on query', () => {
        const filteredFestivals = filterFestivals(festivals, "A");
        expect(filteredFestivals.length).toBe(1);
        expect(filteredFestivals[0].nom_du_festival).toBe("Festival A");
    });

    it('returns empty array if no festivals match query', () => {
        const filteredFestivals = filterFestivals(festivals, "XYZ");
        expect(filteredFestivals.length).toBe(0);
    });

    it('ignores case sensitivity in query', () => {
        const filteredFestivals = filterFestivals(festivals, "a");
        expect(filteredFestivals.length).toBe(1);
        expect(filteredFestivals[0].nom_du_festival).toBe("Festival A");
    });
});
