import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/vue";
import Teste from "./Teste.vue";
import "@testing-library/jest-dom";
import axios from "axios";

vi.spyOn(axios, "get").mockResolvedValue({
    data: {
        data: {
            id: 1,
            title: "teste",
            resource_type: {
                id: 1,
                type: "PDF",
            },
        },
    },
});

const resourceTypes = [
    {
        id: 1,
        type: "PDF",
    },
    {
        id: 2,
        type: "HTML snippet",
    },
    {
        id: 3,
        type: "Link",
    },
];

test("update a pdf resource", async () => {
    const user = userEvent.setup();

    render(Teste, {
        props: {
            isOpen: true,
            resourceTypes: resourceTypes,
            resourceId: 2,
        },
        global: {
            mocks: {
                $swal: vi.fn().mockResolvedValue(true),
            },
        },
    });

    const optionPDF = 1;
    const select = screen.getByTestId("select-type");
    await userEvent.selectOptions(select, String(optionPDF));
    expect(await screen.findByText("PDF")).toBeInTheDocument();
});
