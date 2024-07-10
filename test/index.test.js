
import { fetchFestivals, filterFestivals } from '../index';

describe('fetchFestivals function', () => {
    it('fetches festivals successfully', async () => {
        const festivals = await fetchFestivals();
        expect(festivals).toEqual([]);
    });

    it('handles fetch error gracefully', async () => {
        fetch.mockImplementationOnce(() => Promise.reject("Fetch error"));
        const festivals = await fetchFestivals();
        expect(festivals).toEqual([]);
    });
});

describe('filterFestivals function', () => {
    it('filters festivals based on query', () => {
        const festivals = [
            { nom_du_festival: "Festival A" },
            { nom_du_festival: "Festival B" }
        ];
        const filteredFestivals = filterFestivals(festivals, "A");
        expect(filteredFestivals.length).toBe(1);
        expect(filteredFestivals[0].nom_du_festival).toBe("Festival A");
    });

    it('returns empty array if no festivals match query', () => {
        const festivals = [
            { nom_du_festival: "Festival A" },
            { nom_du_festival: "Festival B" }
        ];
        const filteredFestivals = filterFestivals(festivals, "XYZ");
        expect(filteredFestivals.length).toBe(0);
    });

    it('ignores case sensitivity in query', () => {
        const festivals = [
            { nom_du_festival: "Festival A" },
            { nom_du_festival: "Festival B" }
        ];
        const filteredFestivals = filterFestivals(festivals, "a");
        expect(filteredFestivals.length).toBe(1);
        expect(filteredFestivals[0].nom_du_festival).toBe("Festival A");
    });
});
