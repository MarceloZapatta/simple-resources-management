import {
    render,
    screen,
    waitFor,
    fireEvent,
    findAllByText,
} from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";
import Resources from "./Resources.vue";
import "@testing-library/jest-dom";
import axios from "axios";
import Vue from "vue";
import { VueSelect } from "vue-select";
import ResourcesLoading from "../../../Components/ResourcesLoading.vue";
import ResourcesEditModal from "../../../Components/ResourcesEditModal.vue";
import VueAwesomePaginate from "vue-awesome-paginate";

vi.resetModules();

const originalWarn = window.console.warn;

window.console.warn = (e) => {
    return e.includes("If this is a native custom element")
        ? ""
        : originalWarn(e);
};

vi.spyOn(axios, "get").mockImplementation((argument) => {
    return new Promise((resolve) => {
        if (argument === "/api/resource-types") {
            return resolve({
                data: {
                    data: [
                        {
                            id: 1,
                            type: "PDF",
                        },
                        {
                            id: 2,
                            type: "HTML snippet",
                        },
                    ],
                },
            });
        }

        if (argument.includes("/api/resources")) {
            resolve({
                data: {
                    data: [
                        {
                            id: 1,
                            title: "Test 1",
                            description: "test",
                            resource_type: {
                                id: 1,
                                type: "PDF",
                            },
                        },
                        {
                            id: 2,
                            title: "Test 2",
                            description: "test",
                            resource_type: {
                                id: 1,
                                type: "PDF",
                            },
                        },
                        {
                            id: 3,
                            title: "Test 3",
                            description: "test",
                            resource_type: {
                                id: 1,
                                type: "PDF",
                            },
                        },
                    ],
                    meta: {
                        total: 1,
                    },
                },
            });
        }

        return resolve({
            data: {
                data: {
                    id: 1,
                    title: "Test 1",
                    description: "test",
                    resource_type: {
                        id: 1,
                        type: "PDF",
                    },
                },
            },
        });
    });
});

vi.spyOn(axios, "delete").mockResolvedValue(true);

afterEach(() => {
    vi.clearAllMocks();
});

const stubs = ["ResourcesLoading", "v-select", "vue-awesome-paginate"];

it("render the component", () => {
    render(Resources, {
        props: {
            isAdminPage: true,
        },
        global: {
            stubs,
        },
    });

    expect(screen.getByText("Simple Resources Management")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Type Filter")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
});

it("list resources", async () => {
    render(Resources, {
        global: {
            stubs,
        },
    });
    expect(axios.get).toBeCalledWith("/api/resources?page=1&search=&");
    expect(axios.get).toBeCalledWith("/api/resource-types");
    expect(axios.get).toBeCalledTimes(2);

    await waitFor(() => expect(screen.getByText("Test 1")).toBeInTheDocument());
    expect(screen.getByText("Test 2")).toBeInTheDocument();
    expect(screen.getByText("Test 3")).toBeInTheDocument();
});

it("search resources", async () => {
    render(Resources);

    await fireEvent.update(screen.getByTestId("search"), "Test 2");

    await waitFor(() =>
        expect(axios.get).toBeCalledWith("/api/resources?page=1&search=Test 2&")
    );

    await waitFor(() => expect(screen.getAllByText("PDF")).toBeTruthy());
});

it("open modal add resource", async () => {
    const user = userEvent.setup();
    render(Resources, {
        props: {
            isAdminPage: true,
        },
        global: {
            stubs,
        },
    });

    await user.click(screen.getByText("Add"));
    expect(await screen.findByText("Add Resource"));
});

it("open modal edit resource", async () => {
    const user = userEvent.setup();
    render(Resources, {
        props: {
            isAdminPage: true,
            stubs,
        },
    });

    await waitFor(() => expect(axios.get).toBeCalledTimes(2));

    const buttonEdit = await screen.findByTestId("button-edit-1");

    user.click(buttonEdit);

    expect(await screen.findByText(/Test 1/i)).toBeInTheDocument();
    expect(await screen.findByText(/Edit Resource/i)).toBeInTheDocument();

    const buttonCancel = await screen.findByText("Cancel");

    user.click(buttonCancel);
});

it("handle view resource", async () => {
    const user = userEvent.setup();
    axios.get.mockResolvedValueOnce({
        data: {
            data: [
                {
                    id: 1,
                    title: "Test 1",
                    file: "https://localhost/pdf.pdf",
                    resource_type: {
                        id: 1,
                        type: "PDF",
                    },
                },
                {
                    id: 2,
                    title: "Test 2",
                    description: "Lorem ipsum dors met",
                    html_snippet: "<b></b>",
                    resource_type: {
                        id: 2,
                        type: "HTML snippet",
                    },
                },
                {
                    id: 3,
                    title: "Test 3",
                    link: "https://remotecompany.com",
                    open_new_tab: true,
                    resource_type: {
                        id: 3,
                        type: "Link",
                    },
                },
                {
                    id: 4,
                    title: "Test 4",
                    link: "https://remotecompany.com",
                    open_new_tab: false,
                    resource_type: {
                        id: 3,
                        type: "Link",
                    },
                },
            ],
        },
    });

    const $swal = vi.fn();

    render(Resources, {
        props: {
            isAdminPage: false,
        },
        global: {
            mocks: {
                $swal,
            },
            stubs,
        },
    });

    global.open = vi.fn();

    const viewButtons = await screen.findAllByText("View");

    expect(viewButtons).toHaveLength(4);

    const pdfButton = viewButtons[0];
    await user.click(pdfButton);
    expect(global.open).toBeCalledWith("https://localhost/pdf.pdf", "_blank");

    const htmlButton = viewButtons[1];
    await user.click(htmlButton);
    expect($swal).toBeCalled();

    const linkButton = viewButtons[2];
    await user.click(linkButton);
    expect(global.open).toBeCalledWith("https://remotecompany.com", "_blank");

    const linkButton2 = viewButtons[3];
    await user.click(linkButton2);
    expect(global.open).toBeCalledWith("https://remotecompany.com", "_self");
});

it("show html snippet", async () => {
    const user = userEvent.setup();
    axios.get.mockResolvedValueOnce({
        data: {
            data: [
                {
                    id: 2,
                    title: "Test 2",
                    description: "Lorem ipsum dors met",
                    html_snippet: "<b></b>",
                    resource_type: {
                        id: 2,
                        type: "HTML snippet",
                    },
                },
            ],
        },
    });

    const $swal = vi.fn().mockResolvedValueOnce({
        isConfirmed: false,
    });

    document.execCommand = vi.fn();

    render(Resources, {
        props: {
            isAdminPage: false,
        },
        global: {
            mocks: {
                $swal,
            },
            stubs,
        },
    });

    await user.click(await screen.findByText("View"));

    expect($swal).toBeCalled();
    await waitFor(() => expect(document.execCommand).toBeCalledWith("copy"));
    expect($swal).toBeCalledWith("Copied succesfully!");

    $swal.mockResolvedValueOnce({
        isConfirmed: true,
    });

    await user.click(await screen.findByText("View"));
    expect($swal).toBeCalledTimes(3);
});

it("delete resource", async () => {
    const user = userEvent.setup();
    axios.get.mockResolvedValue({
        data: {
            data: [
                {
                    id: 2,
                    title: "Test 2",
                    description: "Lorem ipsum dors met",
                    html_snippet: "<b></b>",
                    resource_type: {
                        id: 2,
                        type: "HTML snippet",
                    },
                },
            ],
        },
    });

    const $swal = vi.fn().mockResolvedValueOnce({
        isConfirmed: true,
    });

    document.execCommand = vi.fn();

    const { rerender } = render(Resources, {
        props: {
            isAdminPage: true,
        },
        global: {
            mocks: {
                $swal,
            },
            stubs,
        },
    });

    await user.click(await screen.findByText("Delete"));

    expect($swal).toBeCalled();

    $swal.mockResolvedValueOnce({ isConfirmed: false });

    await user.click(await screen.findByText("Delete"));

    await waitFor(() => {
        expect(axios.delete).toBeCalledTimes(1);
    });

    expect(axios.delete).toBeCalledWith("/api/resources/2");

    expect($swal).toBeCalledWith("Success!", "Resource removed with success.");
    expect($swal).toBeCalledTimes(3);
});
