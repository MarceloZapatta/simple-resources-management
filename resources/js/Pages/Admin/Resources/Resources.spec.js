const { render, screen } = require("@testing-library/vue")
import { expect } from 'vitest';
import Resources from './Resources.vue';
import '@testing-library/jest-dom'

describe("Resources.vue", () => {
    it("render the component", () => {
        render(Resources);

        expect(screen.getByText('Simple Resources Management')).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
        expect(screen.getByText('Filter Type')).toBeInTheDocument();
        expect(screen.getByText('Add')).toBeInTheDocument();
        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Type')).toBeInTheDocument();
    })
});
