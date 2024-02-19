import '@testing-library/jest-dom'
import { act, render, screen, waitFor } from '@testing-library/react'
import Dashboard from '@/app/page'
import { configuration } from '@/config/configuration';
import Widget from '@/components/dashboard/Widget';
import * as axios from "axios";

// Mock out all top level functions, such as get, put, delete and post:
jest.mock("axios");

describe('Dashboard', () => {
    const client = 'pokemon';
    const config = configuration[client];

    it('renders the client name', () => {
        render(<Dashboard />)
        const heading = screen.getByText(client)
        expect(heading).toBeInTheDocument()
    })

    it('renders the columns headers properly', () => {
        render(<Dashboard />)
        const titles = screen.getAllByTestId('column-title')

        expect(config.columns.length).toBe(titles.length);
    })

    it('renders the correct number of widgets based on client', async () => {
        axios.get.mockRejectedValue();
        act(() => {
            render(<Dashboard />)
        });

        await waitFor(() => screen.getAllByText('Did not load properly...')); // fail intentionally

        const widgets = screen.getAllByTestId('widget');

        expect(widgets.length).toBe(5);
    })

    it('should show proper widget content when type is not supported', () => {
        render(<Widget type="notnumberorlist" />)
        const widget = screen.getByText('type "notnumberorlist" is not supported')

        expect(widget).toBeInTheDocument()
    })

    it('should render list widget content successfully', async () => {
        axios.get.mockResolvedValue({
            data: { results: [{ name: "black" }] }
        });
        act(() => {
            render(<Widget type="list" title="title" subtitle="subtitle" api="https://test.com/api" />)
        });

        const title = screen.getByText('title')
        const subtitle = screen.getByText('title')
        expect(title).toBeInTheDocument()
        expect(subtitle).toBeInTheDocument()

        await waitFor(() => screen.getByText('black'));
        const content = screen.getByText('black')
        expect(content).toBeInTheDocument()
    })

    it('should render number widget content successfully', async () => {
        axios.get.mockResolvedValue({
            data: { pokemon_species_details: Array(5) }
        });
        act(() => {
            render(<Widget type="number" title="title" subtitle="subtitle" api="https://test.com/api" />)
        });

        const title = screen.getByText('title')
        const subtitle = screen.getByText('title')
        expect(title).toBeInTheDocument()
        expect(subtitle).toBeInTheDocument()

        await waitFor(() => screen.getByText('5'));
        const content = screen.getByText('5')
        expect(content).toBeInTheDocument()
    })

    it('should handle widget content properly when API call failed', async () => {
        axios.get.mockRejectedValue();
        act(() => {
            render(<Widget type="number" title="title" subtitle="subtitle" api="https://test.com/api" />)
        });

        const title = screen.getByText('title')
        const subtitle = screen.getByText('title')
        expect(title).toBeInTheDocument()
        expect(subtitle).toBeInTheDocument()

        await waitFor(() => screen.getByText('Did not load properly...'));
        const content = screen.getByText('Did not load properly...')
        expect(content).toBeInTheDocument()
    })
})