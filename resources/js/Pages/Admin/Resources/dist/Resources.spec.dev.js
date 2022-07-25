"use strict";

var _vue = require("@testing-library/vue");

var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));

var _vitest = require("vitest");

var _Resources = _interopRequireDefault(require("./Resources.vue"));

require("@testing-library/jest-dom");

var _axios = _interopRequireDefault(require("axios"));

var _vue2 = _interopRequireDefault(require("vue"));

var _vueSelect = require("vue-select");

var _ResourcesLoading = _interopRequireDefault(require("../../../Components/ResourcesLoading.vue"));

var _ResourcesEditModal = _interopRequireDefault(require("../../../Components/ResourcesEditModal.vue"));

var _vueAwesomePaginate = _interopRequireDefault(require("vue-awesome-paginate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vitest.vi.resetModules();

var originalWarn = window.console.warn;

window.console.warn = function (e) {
  return e.includes("If this is a native custom element") ? "" : originalWarn(e);
};

_vitest.vi.spyOn(_axios["default"], "get").mockImplementation(function (argument) {
  return new Promise(function (resolve) {
    if (argument === "/api/resource-types") {
      return resolve({
        data: {
          data: [{
            id: 1,
            type: "PDF"
          }, {
            id: 2,
            type: "HTML snippet"
          }]
        }
      });
    }

    if (argument.includes("/api/resources")) {
      resolve({
        data: {
          data: [{
            id: 1,
            title: "Test 1",
            description: "test",
            resource_type: {
              id: 1,
              type: "PDF"
            }
          }, {
            id: 2,
            title: "Test 2",
            description: "test",
            resource_type: {
              id: 1,
              type: "PDF"
            }
          }, {
            id: 3,
            title: "Test 3",
            description: "test",
            resource_type: {
              id: 1,
              type: "PDF"
            }
          }],
          meta: {
            total: 1
          }
        }
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
            type: "PDF"
          }
        }
      }
    });
  });
});

_vitest.vi.spyOn(_axios["default"], "delete").mockResolvedValue(true);

afterEach(function () {
  _vitest.vi.clearAllMocks();
});
var stubs = ["ResourcesLoading", "v-select", "vue-awesome-paginate"];
it("render the component", function () {
  (0, _vue.render)(_Resources["default"], {
    props: {
      isAdminPage: true
    },
    global: {
      stubs: stubs
    }
  });
  (0, _vitest.expect)(_vue.screen.getByText("Simple Resources Management")).toBeInTheDocument();
  (0, _vitest.expect)(_vue.screen.getByText("Search")).toBeInTheDocument();
  (0, _vitest.expect)(_vue.screen.getByText("Type Filter")).toBeInTheDocument();
  (0, _vitest.expect)(_vue.screen.getByText("Add")).toBeInTheDocument();
  (0, _vitest.expect)(_vue.screen.getByText("Title")).toBeInTheDocument();
  (0, _vitest.expect)(_vue.screen.getByText("Description")).toBeInTheDocument();
  (0, _vitest.expect)(_vue.screen.getByText("Type")).toBeInTheDocument();
});
it("list resources", function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          (0, _vue.render)(_Resources["default"], {
            global: {
              stubs: stubs
            }
          });
          (0, _vitest.expect)(_axios["default"].get).toBeCalledWith("/api/resources?page=1&search=&");
          (0, _vitest.expect)(_axios["default"].get).toBeCalledWith("/api/resource-types");
          (0, _vitest.expect)(_axios["default"].get).toBeCalledTimes(2);
          _context.next = 6;
          return regeneratorRuntime.awrap((0, _vue.waitFor)(function () {
            return (0, _vitest.expect)(_vue.screen.getByText("Test 1")).toBeInTheDocument();
          }));

        case 6:
          (0, _vitest.expect)(_vue.screen.getByText("Test 2")).toBeInTheDocument();
          (0, _vitest.expect)(_vue.screen.getByText("Test 3")).toBeInTheDocument();

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});
it("search resources", function _callee2() {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          (0, _vue.render)(_Resources["default"]);
          _context2.next = 3;
          return regeneratorRuntime.awrap(_vue.fireEvent.update(_vue.screen.getByTestId("search"), "Test 2"));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap((0, _vue.waitFor)(function () {
            return (0, _vitest.expect)(_axios["default"].get).toBeCalledWith("/api/resources?page=1&search=Test 2&");
          }));

        case 5:
          _context2.next = 7;
          return regeneratorRuntime.awrap((0, _vue.waitFor)(function () {
            return (0, _vitest.expect)(_vue.screen.getAllByText("PDF")).toBeTruthy();
          }));

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
});
it("open modal add resource", function _callee3() {
  var user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          user = _userEvent["default"].setup();
          (0, _vue.render)(_Resources["default"], {
            props: {
              isAdminPage: true
            },
            global: {
              stubs: stubs
            }
          });
          _context3.next = 4;
          return regeneratorRuntime.awrap(user.click(_vue.screen.getByText("Add")));

        case 4:
          _context3.t0 = _vitest.expect;
          _context3.next = 7;
          return regeneratorRuntime.awrap(_vue.screen.findByText("Add Resource"));

        case 7:
          _context3.t1 = _context3.sent;
          (0, _context3.t0)(_context3.t1);

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
});
it("open modal edit resource", function _callee4() {
  var user, buttonEdit;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          user = _userEvent["default"].setup();
          (0, _vue.render)(_Resources["default"], {
            props: {
              isAdminPage: true,
              stubs: stubs
            }
          });
          _context4.next = 4;
          return regeneratorRuntime.awrap((0, _vue.waitFor)(function () {
            return (0, _vitest.expect)(_axios["default"].get).toBeCalledTimes(2);
          }));

        case 4:
          _context4.next = 6;
          return regeneratorRuntime.awrap(_vue.screen.findByTestId("button-edit-1"));

        case 6:
          buttonEdit = _context4.sent;
          user.click(buttonEdit);
          _context4.t0 = _vitest.expect;
          _context4.next = 11;
          return regeneratorRuntime.awrap(_vue.screen.findByText(/Test 1/i));

        case 11:
          _context4.t1 = _context4.sent;
          (0, _context4.t0)(_context4.t1);
          _context4.t2 = _vitest.expect;
          _context4.next = 16;
          return regeneratorRuntime.awrap(_vue.screen.findByText(/Edit Resource/i));

        case 16:
          _context4.t3 = _context4.sent;
          (0, _context4.t2)(_context4.t3);

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  });
});
it("handle view resource", function _callee5() {
  var user, $swal, viewButtons, pdfButton, htmlButton, linkButton, linkButton2;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          user = _userEvent["default"].setup();

          _axios["default"].get.mockResolvedValueOnce({
            data: {
              data: [{
                id: 1,
                title: "Test 1",
                file: "https://localhost/pdf.pdf",
                resource_type: {
                  id: 1,
                  type: "PDF"
                }
              }, {
                id: 2,
                title: "Test 2",
                description: "Lorem ipsum dors met",
                html_snippet: "<b></b>",
                resource_type: {
                  id: 2,
                  type: "HTML snippet"
                }
              }, {
                id: 3,
                title: "Test 3",
                link: "https://remotecompany.com",
                open_new_tab: true,
                resource_type: {
                  id: 3,
                  type: "Link"
                }
              }, {
                id: 4,
                title: "Test 4",
                link: "https://remotecompany.com",
                open_new_tab: false,
                resource_type: {
                  id: 3,
                  type: "Link"
                }
              }]
            }
          });

          $swal = _vitest.vi.fn();
          (0, _vue.render)(_Resources["default"], {
            props: {
              isAdminPage: false
            },
            global: {
              mocks: {
                $swal: $swal
              },
              stubs: stubs
            }
          });
          global.open = _vitest.vi.fn();
          _context5.next = 7;
          return regeneratorRuntime.awrap(_vue.screen.findAllByText("View"));

        case 7:
          viewButtons = _context5.sent;
          (0, _vitest.expect)(viewButtons).toHaveLength(4);
          pdfButton = viewButtons[0];
          _context5.next = 12;
          return regeneratorRuntime.awrap(user.click(pdfButton));

        case 12:
          (0, _vitest.expect)(global.open).toBeCalledWith("https://localhost/pdf.pdf", "_blank");
          htmlButton = viewButtons[1];
          _context5.next = 16;
          return regeneratorRuntime.awrap(user.click(htmlButton));

        case 16:
          (0, _vitest.expect)($swal).toBeCalled();
          linkButton = viewButtons[2];
          _context5.next = 20;
          return regeneratorRuntime.awrap(user.click(linkButton));

        case 20:
          (0, _vitest.expect)(global.open).toBeCalledWith("https://remotecompany.com", "_blank");
          linkButton2 = viewButtons[3];
          _context5.next = 24;
          return regeneratorRuntime.awrap(user.click(linkButton2));

        case 24:
          (0, _vitest.expect)(global.open).toBeCalledWith("https://remotecompany.com", "_self");

        case 25:
        case "end":
          return _context5.stop();
      }
    }
  });
});
it("show html snippet", function _callee6() {
  var user, $swal;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          user = _userEvent["default"].setup();

          _axios["default"].get.mockResolvedValueOnce({
            data: {
              data: [{
                id: 2,
                title: "Test 2",
                description: "Lorem ipsum dors met",
                html_snippet: "<b></b>",
                resource_type: {
                  id: 2,
                  type: "HTML snippet"
                }
              }]
            }
          });

          $swal = _vitest.vi.fn().mockResolvedValueOnce({
            isConfirmed: false
          });
          document.execCommand = _vitest.vi.fn();
          (0, _vue.render)(_Resources["default"], {
            props: {
              isAdminPage: false
            },
            global: {
              mocks: {
                $swal: $swal
              },
              stubs: stubs
            }
          });
          _context6.t0 = regeneratorRuntime;
          _context6.t1 = user;
          _context6.next = 9;
          return regeneratorRuntime.awrap(_vue.screen.findByText("View"));

        case 9:
          _context6.t2 = _context6.sent;
          _context6.t3 = _context6.t1.click.call(_context6.t1, _context6.t2);
          _context6.next = 13;
          return _context6.t0.awrap.call(_context6.t0, _context6.t3);

        case 13:
          (0, _vitest.expect)($swal).toBeCalled();
          _context6.next = 16;
          return regeneratorRuntime.awrap((0, _vue.waitFor)(function () {
            return (0, _vitest.expect)(document.execCommand).toBeCalledWith("copy");
          }));

        case 16:
          (0, _vitest.expect)($swal).toBeCalledWith("Copied succesfully!");
          $swal.mockResolvedValueOnce({
            isConfirmed: true
          });
          _context6.t4 = regeneratorRuntime;
          _context6.t5 = user;
          _context6.next = 22;
          return regeneratorRuntime.awrap(_vue.screen.findByText("View"));

        case 22:
          _context6.t6 = _context6.sent;
          _context6.t7 = _context6.t5.click.call(_context6.t5, _context6.t6);
          _context6.next = 26;
          return _context6.t4.awrap.call(_context6.t4, _context6.t7);

        case 26:
          (0, _vitest.expect)($swal).toBeCalledTimes(3);

        case 27:
        case "end":
          return _context6.stop();
      }
    }
  });
});
it("delete resource", function _callee7() {
  var user, $swal, _render, rerender;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          user = _userEvent["default"].setup();

          _axios["default"].get.mockResolvedValue({
            data: {
              data: [{
                id: 2,
                title: "Test 2",
                description: "Lorem ipsum dors met",
                html_snippet: "<b></b>",
                resource_type: {
                  id: 2,
                  type: "HTML snippet"
                }
              }]
            }
          });

          $swal = _vitest.vi.fn().mockResolvedValueOnce({
            isConfirmed: true
          });
          document.execCommand = _vitest.vi.fn();
          _render = (0, _vue.render)(_Resources["default"], {
            props: {
              isAdminPage: true
            },
            global: {
              mocks: {
                $swal: $swal
              },
              stubs: stubs
            }
          }), rerender = _render.rerender;
          _context7.t0 = regeneratorRuntime;
          _context7.t1 = user;
          _context7.next = 9;
          return regeneratorRuntime.awrap(_vue.screen.findByText("Delete"));

        case 9:
          _context7.t2 = _context7.sent;
          _context7.t3 = _context7.t1.click.call(_context7.t1, _context7.t2);
          _context7.next = 13;
          return _context7.t0.awrap.call(_context7.t0, _context7.t3);

        case 13:
          (0, _vitest.expect)($swal).toBeCalled();
          $swal.mockResolvedValueOnce({
            isConfirmed: false
          });
          _context7.t4 = regeneratorRuntime;
          _context7.t5 = user;
          _context7.next = 19;
          return regeneratorRuntime.awrap(_vue.screen.findByText("Delete"));

        case 19:
          _context7.t6 = _context7.sent;
          _context7.t7 = _context7.t5.click.call(_context7.t5, _context7.t6);
          _context7.next = 23;
          return _context7.t4.awrap.call(_context7.t4, _context7.t7);

        case 23:
          _context7.next = 25;
          return regeneratorRuntime.awrap((0, _vue.waitFor)(function () {
            (0, _vitest.expect)(_axios["default"]["delete"]).toBeCalledTimes(1);
          }));

        case 25:
          (0, _vitest.expect)(_axios["default"]["delete"]).toBeCalledWith("/api/resources/2");
          (0, _vitest.expect)($swal).toBeCalledWith("Success!", "Resource removed with success.");
          (0, _vitest.expect)($swal).toBeCalledTimes(3);

        case 28:
        case "end":
          return _context7.stop();
      }
    }
  });
});