import {
    findByTestId,
    findByText,
    getByDisplayValue,
    render,
    act,
    screen,
    waitFor,
    cleanup,
} from "@testing-library/vue";
import ResourcesEditModal from "./ResourcesEditModal.vue";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import VueSweetalert2 from "vue-sweetalert2";
import { vi } from "vitest";

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

vi.spyOn(axios, "post").mockResolvedValue({
    messsage: "Success!",
});

vi.spyOn(axios, "put").mockResolvedValue({
    messsage: "Success!",
});

vi.mock("FormData", () => {
    append: vi.fn();
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

afterEach(() => {
    vi.clearAllMocks();
    cleanup();
});

describe("Resources Edit Modal", () => {
    it("render the component", async () => {
        render(ResourcesEditModal, {
            props: { isOpen: true },
        });

        expect(await screen.findByText("Add Resource")).toBeInTheDocument();
        expect(await screen.findByText("Add")).toBeInTheDocument();
        expect(await screen.findByText("Cancel")).toBeInTheDocument();
    });

    it("modal not open", () => {
        render(ResourcesEditModal, {
            props: {
                isOpen: false,
                resourceTypes: resourceTypes,
            },
        });

        expect(screen.queryByText("Add Resource")).not.toBeInTheDocument();
    });

    it("render component to edit", async () => {
        render(ResourcesEditModal, {
            props: {
                isOpen: true,
                resourceTypes: resourceTypes,
                resourceId: 1,
            },
        });

        expect(await screen.findByText("Edit Resource")).toBeInTheDocument();
        expect(await screen.findByText("Edit")).toBeInTheDocument();
    });

    it("show fields for type", async () => {
        const user = userEvent.setup();
        render(ResourcesEditModal, {
            props: {
                isOpen: true,
                resourceTypes: resourceTypes,
                resourceId: false,
            },
        });

        expect(await screen.findByText("PDF")).toBeInTheDocument();

        const select = await screen.findByTestId("select-type");

        await userEvent.selectOptions(select, "1");

        expect(await screen.findByText("Title")).toBeInTheDocument();
        expect(await screen.findByText("File upload")).toBeInTheDocument();

        await userEvent.selectOptions(select, "2");
        expect(
            await screen.findByText("Snippet description")
        ).toBeInTheDocument();
        expect(await screen.findByText("HTML Snippet")).toBeInTheDocument();

        await userEvent.selectOptions(select, "3");
        expect(await screen.findByLabelText("Link")).toBeInTheDocument();
    });

    it("add a pdf resource", async () => {
        const user = userEvent.setup();
        render(ResourcesEditModal, {
            props: {
                isOpen: true,
                resourceTypes: resourceTypes,
                resourceId: false,
            },
            global: {
                mocks: {
                    $swal: vi.fn().mockResolvedValue(true),
                },
            },
        });

        expect(await screen.findByText("PDF")).toBeInTheDocument();

        const select = await screen.findByTestId("select-type");

        const optionPDF = 1;
        await userEvent.selectOptions(select, String(optionPDF));

        const file = new File(["there"], "there.pdf", {
            type: "application/pdf",
        });

        expect(await screen.findByText("File upload")).toBeInTheDocument();

        await userEvent.type(
            await screen.findByTestId("input-title"),
            "Test title"
        );

        expect(await screen.findByTestId("input-title")).toHaveValue(
            "Test title"
        );

        const inputFile = await screen.findByTestId("input-file");
        await userEvent.upload(inputFile, file);

        expect(inputFile.files).toHaveLength(1);
        expect(inputFile.files[0]).toBe(file);

        await userEvent.click(await screen.findByTestId("button-submit"));

        const formData = new FormData();
        formData.append("resource_type_id", optionPDF);
        formData.append("title", "Test title");
        formData.append("file", file);

        await waitFor(() =>
            expect(axios.post).toBeCalledWith("/api/resources", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
        );
    });

    it("update a pdf resource", async () => {
        const user = userEvent.setup();

        render(ResourcesEditModal, {
            props: {
                isOpen: true,
                resourceTypes: resourceTypes,
                resourceId: 1,
            },
            global: {
                mocks: {
                    $swal: vi.fn().mockResolvedValue(true),
                },
            },
            data() {
                return {
                    isLoading: false,
                    resource: {
                        id: 1,
                        title: "teste",
                        resource_type: {
                            id: 1,
                            type: "PDF",
                        },
                    },
                    file: null,
                    errors: {},
                };
            },
        });

        expect(await screen.findByText("File upload")).toBeInTheDocument();
        expect(axios.get).toBeCalledTimes(1);

        const file = new File(["there"], "there.pdf", {
            type: "application/pdf",
        });

        const inputTitle = screen.getByTestId("input-title");
        expect(inputTitle).toHaveValue("teste");

        userEvent.type(inputTitle, " Changed");
        expect(
            await screen.findByDisplayValue("teste Changed")
        ).toBeInTheDocument();

        const inputFile = screen.getByTestId("input-file");

        userEvent.upload(inputFile, file);

        const inputFiles = await screen.findByTestId("input-file");
        await waitFor(() => expect(inputFiles.files).toHaveLength(1));
        expect(screen.getByTestId("input-file").files[0]).toBe(file);

        await userEvent.click(screen.getByTestId("button-submit"));

        const formData = new FormData();
        const optionPDF = 1;
        formData.append("resource_type_id", optionPDF);
        formData.append("title", "teste Changed");
        formData.append("file", file);

        await waitFor(() =>
            expect(axios.put).toBeCalledWith(`/api/resources/1`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
        );
    });

    it("update a pdf resource with no file", async () => {
        const user = userEvent.setup();

        render(ResourcesEditModal, {
            props: {
                isOpen: true,
                resourceTypes: resourceTypes,
                resourceId: 1,
            },
            global: {
                mocks: {
                    $swal: vi.fn().mockResolvedValue(true),
                },
            },
        });

        expect(await screen.findByText("File upload")).toBeInTheDocument();
        const inputTitle = screen.getByTestId("input-title");
        expect(inputTitle).toHaveValue("teste Changed");

        userEvent.type(inputTitle, " Changed");
        expect(
            await screen.findByDisplayValue("teste Changed Changed")
        ).toBeInTheDocument();

        await userEvent.click(screen.getByTestId("button-submit"));

        const formData = new FormData();
        const optionPDF = 1;
        formData.append("resource_type_id", optionPDF);
        formData.append("title", "teste Changed Changed");

        await waitFor(() =>
            expect(axios.put).toBeCalledWith(`/api/resources/1`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
        );
    });

    it("add a html resource", async () => {
        const user = userEvent.setup();
        const { getByTestId, getByText, rerender } = render(
            ResourcesEditModal,
            {
                props: {
                    isOpen: true,
                    resourceTypes: resourceTypes,
                    resourceId: false,
                },
                global: {
                    mocks: {
                        $swal: vi.fn().mockResolvedValue(true),
                    },
                },
            }
        );

        const select = getByTestId("select-type");

        userEvent.selectOptions(select, "2");

        await waitFor(() =>
            expect(getByTestId("textarea-html-snippet")).toBeInTheDocument()
        );

        await userEvent.type(getByTestId("input-title"), "Test title");
        await userEvent.type(
            getByTestId("textarea-description"),
            "Lorem ipsum dors met"
        );
        await userEvent.type(
            getByTestId("textarea-html-snippet"),
            "<html></html>"
        );

        userEvent.click(getByTestId("button-submit"));

        const formData = new FormData();
        const resourceTypeIdHTML = 2;
        formData.append("resource_type_id", resourceTypeIdHTML);
        formData.append("title", "Test title");
        formData.append("description", "Lorem ipsum dors met");
        formData.append("html_snippet", "<html></html>");

        await waitFor(() =>
            expect(axios.post).toBeCalledWith("/api/resources", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
        );
    });

    it("update html resource", async () => {
        const user = userEvent.setup();

        axios.get.mockResolvedValueOnce({
            data: {
                data: {
                    id: 1,
                    title: "HTML Test",
                    description: "Lorem ipsum",
                    html_snippet: "<b></b>",
                    resource_type: {
                        id: 2,
                        type: "HTML snippet",
                    },
                },
            },
        });

        render(ResourcesEditModal, {
            props: {
                isOpen: true,
                resourceTypes: resourceTypes,
                resourceId: 1,
            },
            global: {
                mocks: {
                    $swal: vi.fn().mockResolvedValue(true),
                },
            },
        });

        const select = await screen.findByTestId("select-type");

        await userEvent.selectOptions(select, "2");
        expect(await screen.findByText("HTML snippet")).toBeInTheDocument();

        await userEvent.type(
            await screen.findByTestId("input-title"),
            " Changed"
        );
        expect(await screen.findByTestId("input-title")).toHaveValue(
            "HTML Test Changed"
        );

        await userEvent.type(
            await screen.findByTestId("textarea-description"),
            " changed"
        );
        expect(await screen.findByTestId("textarea-description")).toHaveValue(
            "Lorem ipsum changed"
        );

        await userEvent.type(
            await screen.findByTestId("textarea-html-snippet"),
            "<p></p>"
        );
        expect(await screen.findByTestId("textarea-html-snippet")).toHaveValue(
            "<b></b><p></p>"
        );

        await userEvent.click(screen.getByTestId("button-submit"));

        const formData = new FormData();
        const optionHTML = 2;
        formData.append("resource_type_id", optionHTML);
        formData.append("title", "HTML Test Changed");
        formData.append("description", "Lorem ipsum changed");
        formData.append("html_snippet", "<b></b><p></p>");

        await waitFor(() =>
            expect(axios.put).toBeCalledWith(`/api/resources/1`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
        );
    });

    it("add a link resource", async () => {
        const user = userEvent.setup();
        render(ResourcesEditModal, {
            props: {
                isOpen: true,
                resourceTypes: resourceTypes,
                resourceId: false,
            },
            global: {
                mocks: {
                    $swal: vi.fn().mockResolvedValue(true),
                },
            },
        });

        const select = screen.getByTestId("select-type");

        userEvent.selectOptions(select, "3");

        expect(await screen.findByTestId("input-link")).toBeInTheDocument();

        await userEvent.type(screen.getByTestId("input-title"), "Test title");
        expect(
            await screen.findByDisplayValue("Test title")
        ).toBeInTheDocument();

        await userEvent.type(
            screen.getByTestId("input-link"),
            "https://www.remotecompany.com"
        );
        expect(
            await screen.findByDisplayValue("https://www.remotecompany.com")
        ).toBeInTheDocument();

        userEvent.click(screen.getByTestId("button-submit"));

        const formData = new FormData();
        const resourceTypeIdLink = 3;
        formData.append("resource_type_id", resourceTypeIdLink);
        formData.append("title", "Test title");
        formData.append("link", "https://www.remotecompany.com");

        await waitFor(() =>
            expect(axios.post).toBeCalledWith("/api/resources", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
        );
    });

    it("update a link resource", async () => {
        const user = userEvent.setup();

        axios.get.mockResolvedValueOnce({
            data: {
                data: {
                    id: 1,
                    title: "Test title",
                    link: "https://www.remotecompany.com",
                    resource_type: {
                        id: 3,
                        type: "Link",
                    },
                },
            },
        });

        render(ResourcesEditModal, {
            props: {
                isOpen: true,
                resourceTypes: resourceTypes,
                resourceId: 1,
            },
            global: {
                mocks: {
                    $swal: vi.fn().mockResolvedValue(true),
                },
            },
        });

        expect(await screen.findByTestId("input-link")).toBeInTheDocument();

        await userEvent.type(screen.getByTestId("input-title"), " Changed");
        expect(
            await screen.findByDisplayValue("Test title Changed")
        ).toBeInTheDocument();

        await userEvent.type(screen.getByTestId("input-link"), ".br");
        expect(
            await screen.findByDisplayValue("https://www.remotecompany.com.br")
        ).toBeInTheDocument();

        await userEvent.click(screen.getByTestId("button-submit"));

        const formData = new FormData();
        const resourceTypeIdLink = 3;
        formData.append("resource_type_id", resourceTypeIdLink);
        formData.append("title", "Test title Changed");
        formData.append("link", "https://www.remotecompany.com.br");

        await waitFor(() =>
            expect(axios.put).toBeCalledWith(`/api/resources/1`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
        );
    });

    it("display errors store", async () => {
        const user = userEvent.setup();
        axios.post.mockRejectedValueOnce({
            response: {
                status: 422,
                data: {
                    errors: {
                        resource_type_id: [
                            "The selected resource type id is invalid.",
                        ],
                        title: ["The title field is required."],
                    },
                },
            },
        });

        render(ResourcesEditModal, {
            props: {
                isOpen: true,
                resourceTypes: resourceTypes,
                resourceId: false,
            },
            global: {
                mocks: {
                    $swal: vi.fn().mockResolvedValue(true),
                },
            },
        });

        await userEvent.click(screen.getByTestId("button-submit"));

        expect(
            await screen.findByText("The selected resource type id is invalid.")
        ).toBeInTheDocument();
        expect(
            await screen.findByText("The title field is required.")
        ).toBeInTheDocument();
    });

    it("display errors update", async () => {
        const user = userEvent.setup();
        axios.put.mockRejectedValueOnce({
            response: {
                status: 422,
                data: {
                    errors: {
                        resource_type_id: [
                            "The selected resource type id is invalid.",
                        ],
                        title: ["The title field is required."],
                    },
                },
            },
        });

        render(ResourcesEditModal, {
            props: {
                isOpen: true,
                resourceTypes: resourceTypes,
                resourceId: 1,
            },
            global: {
                mocks: {
                    $swal: vi.fn().mockResolvedValue(true),
                },
            },
        });

        expect(await screen.findByText("File upload")).toBeInTheDocument();

        await userEvent.click(screen.getByTestId("button-submit"));

        await waitFor(() => expect(axios.put).toBeCalledTimes(1));

        expect(
            await screen.findByText("The selected resource type id is invalid.")
        ).toBeInTheDocument();
        expect(
            await screen.findByText("The title field is required.")
        ).toBeInTheDocument();
    });

    it("close modal", async () => {
        const user = userEvent.setup();

        const { emitted } = render(ResourcesEditModal, {
            props: {
                isOpen: true,
                resourceTypes: resourceTypes,
                resourceId: false,
            },
        });

        await userEvent.click(screen.getByTestId("button-cancel"));

        expect(emitted().onClose).toBeTruthy();
    });

    it ("unhandled response", async () => {

        const user = userEvent.setup();
        axios.post.mockRejectedValueOnce({
            response: {
                status: 500,
                data: {
                    errors: "some random error",
                },
            },
        });

        const $swal = vi.fn();

        render(ResourcesEditModal, {
            props: {
                isOpen: true,
                resourceTypes: resourceTypes,
                resourceId: false,
            },
            global: {
                mocks: {
                    $swal,
                },
            },
        });

        await userEvent.click(screen.getByTestId("button-submit"));

        expect($swal).toBeCalledWith("An error ocurred!", "Please try again later.")
    })
});
