const { render, screen, waitFor, fireEvent } = require("@testing-library/vue");
import { expect, vi } from "vitest";
import Resources from "./Resources.vue";
import "@testing-library/jest-dom";
import axios from "axios";
import Vue from "vue";
vi.resetModules();

vi.spyOn(axios, "get")
    .mockImplementation((argument) => {
        console.log(argument);
        return new Promise((resolve) => {
            if (argument === '/api/resource-types') {
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

            return resolve({
                data: {
                    data: [
                        {
                            id: 1,
                            title: "Test 1",
                            description: "test",
                            resource_type: {
                                type: "PDF",
                            },
                        },
                        {
                            id: 1,
                            title: "Test 2",
                            description: "test",
                            resource_type: {
                                type: "PDF",
                            },
                        },
                        {
                            id: 1,
                            title: "Test 3",
                            description: "test",
                            resource_type: {
                                type: "PDF",
                            },
                        },
                    ],
                    meta: {
                        total: 1,
                    },
                },
            });
        });
    });

afterEach(() => {
    vi.clearAllMocks();
});

it("render the component", () => {
    render(Resources);

    expect(screen.getByText("Simple Resources Management")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Filter Type")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
});

it("list resources", async () => {
    render(Resources);
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
