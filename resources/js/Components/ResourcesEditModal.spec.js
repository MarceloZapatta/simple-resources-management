import {
    findByTestId,
    findByText,
    getByDisplayValue,
    render,
    screen,
    waitFor,
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
});

it("render the component", async () => {
    const { getByText, queryByText, rerender } = render(ResourcesEditModal, {
        props: { isOpen: true },
    });

    getByText("Add Resource");
    getByText("Add");
    getByText("Cancel");

    await rerender({
        isOpen: false,
    });

    expect(queryByText("Add Resource")).not.toBeInTheDocument();

    await rerender({
        isOpen: true,
        resourceId: 1,
    });

    getByText("Edit Resource");
    getByText("Edit");
});

it("show fields for type", async () => {
    const user = userEvent.setup();
    const { getByTestId, getByText } = render(ResourcesEditModal, {
        props: {
            isOpen: true,
            resourceTypes: resourceTypes,
            resourceId: false,
        },
    });

    await waitFor(() => getByText("PDF"));

    const select = getByTestId("select-type");

    userEvent.selectOptions(select, "1");

    getByText("Title");
    await waitFor(() => getByText("File upload"));

    userEvent.selectOptions(select, "2");
    await waitFor(() => getByText("Snippet description"));
    getByText("HTML Snippet");

    userEvent.selectOptions(select, "3");
    await waitFor(() => getByText("Link"));
});

it("add a pdf resource", async () => {
    const user = userEvent.setup();
    const { getByTestId, getByText, rerender } = render(ResourcesEditModal, {
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

    await waitFor(() => getByText("PDF"));

    const select = getByTestId("select-type");

    const optionPDF = 1;
    userEvent.selectOptions(select, "1");

    const file = new File(["there"], "there.pdf", { type: "application/pdf" });

    expect(await screen.findByText("File upload")).toBeInTheDocument();

    await userEvent.type(getByTestId("input-title"), "Test title");

    await waitFor(() =>
        expect(getByTestId("input-title")).toHaveValue("Test title")
    );

    const inputFile = await screen.findByTestId("input-file");
    await userEvent.upload(inputFile, file);

    expect(inputFile.files).toHaveLength(1);
    expect(inputFile.files[0]).toBe(file);

    userEvent.click(screen.getByTestId("button-submit"));

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

it("add a html resource", async () => {
    const user = userEvent.setup();
    const { getByTestId, getByText, rerender } = render(ResourcesEditModal, {
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
    await userEvent.type(getByTestId("textarea-html-snippet"), "<html></html>");

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

it("add a link resource", async () => {
    const user = userEvent.setup();
    const { getByTestId, getByText, rerender } = render(ResourcesEditModal, {
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

    const select = getByTestId("select-type");

    userEvent.selectOptions(select, "3");

    await waitFor(() => expect(getByTestId("input-link")).toBeInTheDocument());

    await userEvent.type(getByTestId("input-title"), "Test title");
    await userEvent.type(getByTestId("input-link"), "https://google.com");
    await userEvent.click(getByTestId("checkbox-open-new-tab"));

    userEvent.click(getByTestId("button-submit"));

    const formData = new FormData();
    const resourceTypeIdLink = 3;
    formData.append("resource_type_id", resourceTypeIdLink);
    formData.append("title", "Test title");
    formData.append("link", "https://google.com");
    formData.append("open_new_tab", true);

    await waitFor(() =>
        expect(axios.post).toBeCalledWith("/api/resources", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
    );
});
