"use strict";

var _vue = require("@testing-library/vue");

var _ResourcesEditModal = _interopRequireDefault(require("./ResourcesEditModal.vue"));

require("@testing-library/jest-dom");

var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));

var _axios = _interopRequireDefault(require("axios"));

var _vueSweetalert = _interopRequireDefault(require("vue-sweetalert2"));

var _vitest = require("vitest");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vitest.vi.spyOn(_axios["default"], "get").mockResolvedValue({
  data: {
    data: {
      id: 1,
      title: "teste",
      resource_type: {
        id: 1,
        type: "PDF"
      }
    }
  }
});

_vitest.vi.spyOn(_axios["default"], "post").mockResolvedValue({
  messsage: "Success!"
});

_vitest.vi.spyOn(_axios["default"], "put").mockResolvedValue({
  messsage: "Success!"
});

_vitest.vi.mock("FormData", function () {
  append: _vitest.vi.fn();
});

var resourceTypes = [{
  id: 1,
  type: "PDF"
}, {
  id: 2,
  type: "HTML snippet"
}, {
  id: 3,
  type: "Link"
}];
afterEach(function () {
  _vitest.vi.clearAllMocks();

  (0, _vue.cleanup)();
});
describe("Resources Edit Modal", function () {
  it("render the component", function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _vue.render)(_ResourcesEditModal["default"], {
              props: {
                isOpen: true
              }
            });
            _context.t0 = expect;
            _context.next = 4;
            return regeneratorRuntime.awrap(_vue.screen.findByText("Add Resource"));

          case 4:
            _context.t1 = _context.sent;
            (0, _context.t0)(_context.t1).toBeInTheDocument();
            _context.t2 = expect;
            _context.next = 9;
            return regeneratorRuntime.awrap(_vue.screen.findByText("Add"));

          case 9:
            _context.t3 = _context.sent;
            (0, _context.t2)(_context.t3).toBeInTheDocument();
            _context.t4 = expect;
            _context.next = 14;
            return regeneratorRuntime.awrap(_vue.screen.findByText("Cancel"));

          case 14:
            _context.t5 = _context.sent;
            (0, _context.t4)(_context.t5).toBeInTheDocument();

          case 16:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  it("modal not open", function () {
    (0, _vue.render)(_ResourcesEditModal["default"], {
      props: {
        isOpen: false,
        resourceTypes: resourceTypes
      }
    });
    expect(_vue.screen.queryByText("Add Resource")).not.toBeInTheDocument();
  });
  it("render component to edit", function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            (0, _vue.render)(_ResourcesEditModal["default"], {
              props: {
                isOpen: true,
                resourceTypes: resourceTypes,
                resourceId: 1
              }
            });
            _context2.t0 = expect;
            _context2.next = 4;
            return regeneratorRuntime.awrap(_vue.screen.findByText("Edit Resource"));

          case 4:
            _context2.t1 = _context2.sent;
            (0, _context2.t0)(_context2.t1).toBeInTheDocument();
            _context2.t2 = expect;
            _context2.next = 9;
            return regeneratorRuntime.awrap(_vue.screen.findByText("Edit"));

          case 9:
            _context2.t3 = _context2.sent;
            (0, _context2.t2)(_context2.t3).toBeInTheDocument();

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
  it("show fields for type", function _callee3() {
    var user, select;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            user = _userEvent["default"].setup();
            (0, _vue.render)(_ResourcesEditModal["default"], {
              props: {
                isOpen: true,
                resourceTypes: resourceTypes,
                resourceId: false
              }
            });
            _context3.t0 = expect;
            _context3.next = 5;
            return regeneratorRuntime.awrap(_vue.screen.findByText("PDF"));

          case 5:
            _context3.t1 = _context3.sent;
            (0, _context3.t0)(_context3.t1).toBeInTheDocument();
            _context3.next = 9;
            return regeneratorRuntime.awrap(_vue.screen.findByTestId("select-type"));

          case 9:
            select = _context3.sent;
            _context3.next = 12;
            return regeneratorRuntime.awrap(_userEvent["default"].selectOptions(select, "1"));

          case 12:
            _context3.t2 = expect;
            _context3.next = 15;
            return regeneratorRuntime.awrap(_vue.screen.findByText("Title"));

          case 15:
            _context3.t3 = _context3.sent;
            (0, _context3.t2)(_context3.t3).toBeInTheDocument();
            _context3.t4 = expect;
            _context3.next = 20;
            return regeneratorRuntime.awrap(_vue.screen.findByText("File upload"));

          case 20:
            _context3.t5 = _context3.sent;
            (0, _context3.t4)(_context3.t5).toBeInTheDocument();
            _context3.next = 24;
            return regeneratorRuntime.awrap(_userEvent["default"].selectOptions(select, "2"));

          case 24:
            _context3.t6 = expect;
            _context3.next = 27;
            return regeneratorRuntime.awrap(_vue.screen.findByText("Snippet description"));

          case 27:
            _context3.t7 = _context3.sent;
            (0, _context3.t6)(_context3.t7).toBeInTheDocument();
            _context3.t8 = expect;
            _context3.next = 32;
            return regeneratorRuntime.awrap(_vue.screen.findByText("HTML Snippet"));

          case 32:
            _context3.t9 = _context3.sent;
            (0, _context3.t8)(_context3.t9).toBeInTheDocument();
            _context3.next = 36;
            return regeneratorRuntime.awrap(_userEvent["default"].selectOptions(select, "3"));

          case 36:
            _context3.t10 = expect;
            _context3.next = 39;
            return regeneratorRuntime.awrap(_vue.screen.findByLabelText("Link"));

          case 39:
            _context3.t11 = _context3.sent;
            (0, _context3.t10)(_context3.t11).toBeInTheDocument();

          case 41:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  it("add a pdf resource", function _callee4() {
    var user, select, optionPDF, file, inputFile, formData;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            user = _userEvent["default"].setup();
            (0, _vue.render)(_ResourcesEditModal["default"], {
              props: {
                isOpen: true,
                resourceTypes: resourceTypes,
                resourceId: false
              },
              global: {
                mocks: {
                  $swal: _vitest.vi.fn().mockResolvedValue(true)
                }
              }
            });
            _context4.t0 = expect;
            _context4.next = 5;
            return regeneratorRuntime.awrap(_vue.screen.findByText("PDF"));

          case 5:
            _context4.t1 = _context4.sent;
            (0, _context4.t0)(_context4.t1).toBeInTheDocument();
            _context4.next = 9;
            return regeneratorRuntime.awrap(_vue.screen.findByTestId("select-type"));

          case 9:
            select = _context4.sent;
            optionPDF = 1;
            _context4.next = 13;
            return regeneratorRuntime.awrap(_userEvent["default"].selectOptions(select, String(optionPDF)));

          case 13:
            file = new File(["there"], "there.pdf", {
              type: "application/pdf"
            });
            _context4.t2 = expect;
            _context4.next = 17;
            return regeneratorRuntime.awrap(_vue.screen.findByText("File upload"));

          case 17:
            _context4.t3 = _context4.sent;
            (0, _context4.t2)(_context4.t3).toBeInTheDocument();
            _context4.t4 = regeneratorRuntime;
            _context4.t5 = _userEvent["default"];
            _context4.next = 23;
            return regeneratorRuntime.awrap(_vue.screen.findByTestId("input-title"));

          case 23:
            _context4.t6 = _context4.sent;
            _context4.t7 = _context4.t5.type.call(_context4.t5, _context4.t6, "Test title");
            _context4.next = 27;
            return _context4.t4.awrap.call(_context4.t4, _context4.t7);

          case 27:
            _context4.t8 = expect;
            _context4.next = 30;
            return regeneratorRuntime.awrap(_vue.screen.findByTestId("input-title"));

          case 30:
            _context4.t9 = _context4.sent;
            (0, _context4.t8)(_context4.t9).toHaveValue("Test title");
            _context4.next = 34;
            return regeneratorRuntime.awrap(_vue.screen.findByTestId("input-file"));

          case 34:
            inputFile = _context4.sent;
            _context4.next = 37;
            return regeneratorRuntime.awrap(_userEvent["default"].upload(inputFile, file));

          case 37:
            expect(inputFile.files).toHaveLength(1);
            expect(inputFile.files[0]).toBe(file);
            _context4.t10 = regeneratorRuntime;
            _context4.t11 = _userEvent["default"];
            _context4.next = 43;
            return regeneratorRuntime.awrap(_vue.screen.findByTestId("button-submit"));

          case 43:
            _context4.t12 = _context4.sent;
            _context4.t13 = _context4.t11.click.call(_context4.t11, _context4.t12);
            _context4.next = 47;
            return _context4.t10.awrap.call(_context4.t10, _context4.t13);

          case 47:
            formData = new FormData();
            formData.append("resource_type_id", optionPDF);
            formData.append("title", "Test title");
            formData.append("file", file);
            _context4.next = 53;
            return regeneratorRuntime.awrap((0, _vue.waitFor)(function () {
              return expect(_axios["default"].post).toBeCalledWith("/api/resources", formData, {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              });
            }));

          case 53:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
  it("update a pdf resource", function _callee5() {
    var user, file, inputTitle, inputFile, inputFiles, formData, optionPDF;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            user = _userEvent["default"].setup();
            (0, _vue.render)(_ResourcesEditModal["default"], {
              props: {
                isOpen: true,
                resourceTypes: resourceTypes,
                resourceId: 1
              },
              global: {
                mocks: {
                  $swal: _vitest.vi.fn().mockResolvedValue(true)
                }
              },
              data: function data() {
                return {
                  isLoading: false,
                  resource: {
                    id: 1,
                    title: "teste",
                    resource_type: {
                      id: 1,
                      type: "PDF"
                    }
                  },
                  file: null,
                  errors: {}
                };
              }
            });
            _context5.t0 = expect;
            _context5.next = 5;
            return regeneratorRuntime.awrap(_vue.screen.findByText("File upload"));

          case 5:
            _context5.t1 = _context5.sent;
            (0, _context5.t0)(_context5.t1).toBeInTheDocument();
            expect(_axios["default"].get).toBeCalledTimes(1);
            file = new File(["there"], "there.pdf", {
              type: "application/pdf"
            });
            inputTitle = _vue.screen.getByTestId("input-title");
            expect(inputTitle).toHaveValue("teste");

            _userEvent["default"].type(inputTitle, " Changed");

            _context5.t2 = expect;
            _context5.next = 15;
            return regeneratorRuntime.awrap(_vue.screen.findByDisplayValue("teste Changed"));

          case 15:
            _context5.t3 = _context5.sent;
            (0, _context5.t2)(_context5.t3).toBeInTheDocument();
            inputFile = _vue.screen.getByTestId("input-file");

            _userEvent["default"].upload(inputFile, file);

            _context5.next = 21;
            return regeneratorRuntime.awrap(_vue.screen.findByTestId("input-file"));

          case 21:
            inputFiles = _context5.sent;
            _context5.next = 24;
            return regeneratorRuntime.awrap((0, _vue.waitFor)(function () {
              return expect(inputFiles.files).toHaveLength(1);
            }));

          case 24:
            expect(_vue.screen.getByTestId("input-file").files[0]).toBe(file);
            _context5.next = 27;
            return regeneratorRuntime.awrap(_userEvent["default"].click(_vue.screen.getByTestId("button-submit")));

          case 27:
            formData = new FormData();
            optionPDF = 1;
            formData.append("resource_type_id", optionPDF);
            formData.append("title", "teste Changed");
            formData.append("file", file);
            _context5.next = 34;
            return regeneratorRuntime.awrap((0, _vue.waitFor)(function () {
              return expect(_axios["default"].put).toBeCalledWith("/api/resources/1", formData, {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              });
            }));

          case 34:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
  it("update a pdf resource with no file", function _callee6() {
    var user, inputTitle, formData, optionPDF;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            user = _userEvent["default"].setup();
            (0, _vue.render)(_ResourcesEditModal["default"], {
              props: {
                isOpen: true,
                resourceTypes: resourceTypes,
                resourceId: 1
              },
              global: {
                mocks: {
                  $swal: _vitest.vi.fn().mockResolvedValue(true)
                }
              }
            });
            _context6.t0 = expect;
            _context6.next = 5;
            return regeneratorRuntime.awrap(_vue.screen.findByText("File upload"));

          case 5:
            _context6.t1 = _context6.sent;
            (0, _context6.t0)(_context6.t1).toBeInTheDocument();
            inputTitle = _vue.screen.getByTestId("input-title");
            expect(inputTitle).toHaveValue("teste Changed");

            _userEvent["default"].type(inputTitle, " Changed");

            _context6.t2 = expect;
            _context6.next = 13;
            return regeneratorRuntime.awrap(_vue.screen.findByDisplayValue("teste Changed Changed"));

          case 13:
            _context6.t3 = _context6.sent;
            (0, _context6.t2)(_context6.t3).toBeInTheDocument();
            _context6.next = 17;
            return regeneratorRuntime.awrap(_userEvent["default"].click(_vue.screen.getByTestId("button-submit")));

          case 17:
            formData = new FormData();
            optionPDF = 1;
            formData.append("resource_type_id", optionPDF);
            formData.append("title", "teste Changed Changed");
            _context6.next = 23;
            return regeneratorRuntime.awrap((0, _vue.waitFor)(function () {
              return expect(_axios["default"].put).toBeCalledWith("/api/resources/1", formData, {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              });
            }));

          case 23:
          case "end":
            return _context6.stop();
        }
      }
    });
  });
  it("add a html resource", function _callee7() {
    var user, _render, getByTestId, getByText, rerender, select, formData, resourceTypeIdHTML;

    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            user = _userEvent["default"].setup();
            _render = (0, _vue.render)(_ResourcesEditModal["default"], {
              props: {
                isOpen: true,
                resourceTypes: resourceTypes,
                resourceId: false
              },
              global: {
                mocks: {
                  $swal: _vitest.vi.fn().mockResolvedValue(true)
                }
              }
            }), getByTestId = _render.getByTestId, getByText = _render.getByText, rerender = _render.rerender;
            select = getByTestId("select-type");

            _userEvent["default"].selectOptions(select, "2");

            _context7.next = 6;
            return regeneratorRuntime.awrap((0, _vue.waitFor)(function () {
              return expect(getByTestId("textarea-html-snippet")).toBeInTheDocument();
            }));

          case 6:
            _context7.next = 8;
            return regeneratorRuntime.awrap(_userEvent["default"].type(getByTestId("input-title"), "Test title"));

          case 8:
            _context7.next = 10;
            return regeneratorRuntime.awrap(_userEvent["default"].type(getByTestId("textarea-description"), "Lorem ipsum dors met"));

          case 10:
            _context7.next = 12;
            return regeneratorRuntime.awrap(_userEvent["default"].type(getByTestId("textarea-html-snippet"), "<html></html>"));

          case 12:
            _userEvent["default"].click(getByTestId("button-submit"));

            formData = new FormData();
            resourceTypeIdHTML = 2;
            formData.append("resource_type_id", resourceTypeIdHTML);
            formData.append("title", "Test title");
            formData.append("description", "Lorem ipsum dors met");
            formData.append("html_snippet", "<html></html>");
            _context7.next = 21;
            return regeneratorRuntime.awrap((0, _vue.waitFor)(function () {
              return expect(_axios["default"].post).toBeCalledWith("/api/resources", formData, {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              });
            }));

          case 21:
          case "end":
            return _context7.stop();
        }
      }
    });
  });
  it("update html resource", function _callee8() {
    var user, select, formData, optionHTML;
    return regeneratorRuntime.async(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            user = _userEvent["default"].setup();

            _axios["default"].get.mockResolvedValueOnce({
              data: {
                data: {
                  id: 1,
                  title: "HTML Test",
                  description: "Lorem ipsum",
                  html_snippet: "<b></b>",
                  resource_type: {
                    id: 2,
                    type: "HTML snippet"
                  }
                }
              }
            });

            (0, _vue.render)(_ResourcesEditModal["default"], {
              props: {
                isOpen: true,
                resourceTypes: resourceTypes,
                resourceId: 1
              },
              global: {
                mocks: {
                  $swal: _vitest.vi.fn().mockResolvedValue(true)
                }
              }
            });
            _context8.next = 5;
            return regeneratorRuntime.awrap(_vue.screen.findByTestId("select-type"));

          case 5:
            select = _context8.sent;
            _context8.next = 8;
            return regeneratorRuntime.awrap(_userEvent["default"].selectOptions(select, "2"));

          case 8:
            _context8.t0 = expect;
            _context8.next = 11;
            return regeneratorRuntime.awrap(_vue.screen.findByText("HTML snippet"));

          case 11:
            _context8.t1 = _context8.sent;
            (0, _context8.t0)(_context8.t1).toBeInTheDocument();
            _context8.t2 = regeneratorRuntime;
            _context8.t3 = _userEvent["default"];
            _context8.next = 17;
            return regeneratorRuntime.awrap(_vue.screen.findByTestId("input-title"));

          case 17:
            _context8.t4 = _context8.sent;
            _context8.t5 = _context8.t3.type.call(_context8.t3, _context8.t4, " Changed");
            _context8.next = 21;
            return _context8.t2.awrap.call(_context8.t2, _context8.t5);

          case 21:
            _context8.t6 = expect;
            _context8.next = 24;
            return regeneratorRuntime.awrap(_vue.screen.findByTestId("input-title"));

          case 24:
            _context8.t7 = _context8.sent;
            (0, _context8.t6)(_context8.t7).toHaveValue("HTML Test Changed");
            _context8.t8 = regeneratorRuntime;
            _context8.t9 = _userEvent["default"];
            _context8.next = 30;
            return regeneratorRuntime.awrap(_vue.screen.findByTestId("textarea-description"));

          case 30:
            _context8.t10 = _context8.sent;
            _context8.t11 = _context8.t9.type.call(_context8.t9, _context8.t10, " changed");
            _context8.next = 34;
            return _context8.t8.awrap.call(_context8.t8, _context8.t11);

          case 34:
            _context8.t12 = expect;
            _context8.next = 37;
            return regeneratorRuntime.awrap(_vue.screen.findByTestId("textarea-description"));

          case 37:
            _context8.t13 = _context8.sent;
            (0, _context8.t12)(_context8.t13).toHaveValue("Lorem ipsum changed");
            _context8.t14 = regeneratorRuntime;
            _context8.t15 = _userEvent["default"];
            _context8.next = 43;
            return regeneratorRuntime.awrap(_vue.screen.findByTestId("textarea-html-snippet"));

          case 43:
            _context8.t16 = _context8.sent;
            _context8.t17 = _context8.t15.type.call(_context8.t15, _context8.t16, "<p></p>");
            _context8.next = 47;
            return _context8.t14.awrap.call(_context8.t14, _context8.t17);

          case 47:
            _context8.t18 = expect;
            _context8.next = 50;
            return regeneratorRuntime.awrap(_vue.screen.findByTestId("textarea-html-snippet"));

          case 50:
            _context8.t19 = _context8.sent;
            (0, _context8.t18)(_context8.t19).toHaveValue("<b></b><p></p>");
            _context8.next = 54;
            return regeneratorRuntime.awrap(_userEvent["default"].click(_vue.screen.getByTestId("button-submit")));

          case 54:
            formData = new FormData();
            optionHTML = 2;
            formData.append("resource_type_id", optionHTML);
            formData.append("title", "HTML Test Changed");
            formData.append("description", "Lorem ipsum changed");
            formData.append("html_snippet", "<b></b><p></p>");
            _context8.next = 62;
            return regeneratorRuntime.awrap((0, _vue.waitFor)(function () {
              return expect(_axios["default"].put).toBeCalledWith("/api/resources/1", formData, {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              });
            }));

          case 62:
          case "end":
            return _context8.stop();
        }
      }
    });
  });
  it("add a link resource", function _callee9() {
    var user, select, formData, resourceTypeIdLink;
    return regeneratorRuntime.async(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            user = _userEvent["default"].setup();
            (0, _vue.render)(_ResourcesEditModal["default"], {
              props: {
                isOpen: true,
                resourceTypes: resourceTypes,
                resourceId: false
              },
              global: {
                mocks: {
                  $swal: _vitest.vi.fn().mockResolvedValue(true)
                }
              }
            });
            select = _vue.screen.getByTestId("select-type");

            _userEvent["default"].selectOptions(select, "3");

            _context9.t0 = expect;
            _context9.next = 7;
            return regeneratorRuntime.awrap(_vue.screen.findByTestId("input-link"));

          case 7:
            _context9.t1 = _context9.sent;
            (0, _context9.t0)(_context9.t1).toBeInTheDocument();
            _context9.next = 11;
            return regeneratorRuntime.awrap(_userEvent["default"].type(_vue.screen.getByTestId("input-title"), "Test title"));

          case 11:
            _context9.t2 = expect;
            _context9.next = 14;
            return regeneratorRuntime.awrap(_vue.screen.findByDisplayValue("Test title"));

          case 14:
            _context9.t3 = _context9.sent;
            (0, _context9.t2)(_context9.t3).toBeInTheDocument();
            _context9.next = 18;
            return regeneratorRuntime.awrap(_userEvent["default"].type(_vue.screen.getByTestId("input-link"), "https://www.remotecompany.com"));

          case 18:
            _context9.t4 = expect;
            _context9.next = 21;
            return regeneratorRuntime.awrap(_vue.screen.findByDisplayValue("https://www.remotecompany.com"));

          case 21:
            _context9.t5 = _context9.sent;
            (0, _context9.t4)(_context9.t5).toBeInTheDocument();

            _userEvent["default"].click(_vue.screen.getByTestId("button-submit"));

            formData = new FormData();
            resourceTypeIdLink = 3;
            formData.append("resource_type_id", resourceTypeIdLink);
            formData.append("title", "Test title");
            formData.append("link", "https://www.remotecompany.com");
            _context9.next = 31;
            return regeneratorRuntime.awrap((0, _vue.waitFor)(function () {
              return expect(_axios["default"].post).toBeCalledWith("/api/resources", formData, {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              });
            }));

          case 31:
          case "end":
            return _context9.stop();
        }
      }
    });
  });
  it("update a link resource", function _callee10() {
    var user, formData, resourceTypeIdLink;
    return regeneratorRuntime.async(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            user = _userEvent["default"].setup();

            _axios["default"].get.mockResolvedValueOnce({
              data: {
                data: {
                  id: 1,
                  title: "Test title",
                  link: "https://www.remotecompany.com",
                  resource_type: {
                    id: 3,
                    type: "Link"
                  }
                }
              }
            });

            (0, _vue.render)(_ResourcesEditModal["default"], {
              props: {
                isOpen: true,
                resourceTypes: resourceTypes,
                resourceId: 1
              },
              global: {
                mocks: {
                  $swal: _vitest.vi.fn().mockResolvedValue(true)
                }
              }
            });
            _context10.t0 = expect;
            _context10.next = 6;
            return regeneratorRuntime.awrap(_vue.screen.findByTestId("input-link"));

          case 6:
            _context10.t1 = _context10.sent;
            (0, _context10.t0)(_context10.t1).toBeInTheDocument();
            _context10.next = 10;
            return regeneratorRuntime.awrap(_userEvent["default"].type(_vue.screen.getByTestId("input-title"), " Changed"));

          case 10:
            _context10.t2 = expect;
            _context10.next = 13;
            return regeneratorRuntime.awrap(_vue.screen.findByDisplayValue("Test title Changed"));

          case 13:
            _context10.t3 = _context10.sent;
            (0, _context10.t2)(_context10.t3).toBeInTheDocument();
            _context10.next = 17;
            return regeneratorRuntime.awrap(_userEvent["default"].type(_vue.screen.getByTestId("input-link"), ".br"));

          case 17:
            _context10.t4 = expect;
            _context10.next = 20;
            return regeneratorRuntime.awrap(_vue.screen.findByDisplayValue("https://www.remotecompany.com.br"));

          case 20:
            _context10.t5 = _context10.sent;
            (0, _context10.t4)(_context10.t5).toBeInTheDocument();
            _context10.next = 24;
            return regeneratorRuntime.awrap(_userEvent["default"].click(_vue.screen.getByTestId("button-submit")));

          case 24:
            formData = new FormData();
            resourceTypeIdLink = 3;
            formData.append("resource_type_id", resourceTypeIdLink);
            formData.append("title", "Test title Changed");
            formData.append("link", "https://www.remotecompany.com.br");
            _context10.next = 31;
            return regeneratorRuntime.awrap((0, _vue.waitFor)(function () {
              return expect(_axios["default"].put).toBeCalledWith("/api/resources/1", formData, {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              });
            }));

          case 31:
          case "end":
            return _context10.stop();
        }
      }
    });
  });
  it("display errors store", function _callee11() {
    var user;
    return regeneratorRuntime.async(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            user = _userEvent["default"].setup();

            _axios["default"].post.mockRejectedValueOnce({
              response: {
                status: 422,
                data: {
                  errors: {
                    resource_type_id: ["The selected resource type id is invalid."],
                    title: ["The title field is required."]
                  }
                }
              }
            });

            (0, _vue.render)(_ResourcesEditModal["default"], {
              props: {
                isOpen: true,
                resourceTypes: resourceTypes,
                resourceId: false
              },
              global: {
                mocks: {
                  $swal: _vitest.vi.fn().mockResolvedValue(true)
                }
              }
            });
            _context11.next = 5;
            return regeneratorRuntime.awrap(_userEvent["default"].click(_vue.screen.getByTestId("button-submit")));

          case 5:
            _context11.t0 = expect;
            _context11.next = 8;
            return regeneratorRuntime.awrap(_vue.screen.findByText("The selected resource type id is invalid."));

          case 8:
            _context11.t1 = _context11.sent;
            (0, _context11.t0)(_context11.t1).toBeInTheDocument();
            _context11.t2 = expect;
            _context11.next = 13;
            return regeneratorRuntime.awrap(_vue.screen.findByText("The title field is required."));

          case 13:
            _context11.t3 = _context11.sent;
            (0, _context11.t2)(_context11.t3).toBeInTheDocument();

          case 15:
          case "end":
            return _context11.stop();
        }
      }
    });
  });
  it("display errors update", function _callee12() {
    var user;
    return regeneratorRuntime.async(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            user = _userEvent["default"].setup();

            _axios["default"].put.mockRejectedValueOnce({
              response: {
                status: 422,
                data: {
                  errors: {
                    resource_type_id: ["The selected resource type id is invalid."],
                    title: ["The title field is required."]
                  }
                }
              }
            });

            (0, _vue.render)(_ResourcesEditModal["default"], {
              props: {
                isOpen: true,
                resourceTypes: resourceTypes,
                resourceId: 1
              },
              global: {
                mocks: {
                  $swal: _vitest.vi.fn().mockResolvedValue(true)
                }
              }
            });
            _context12.t0 = expect;
            _context12.next = 6;
            return regeneratorRuntime.awrap(_vue.screen.findByText("File upload"));

          case 6:
            _context12.t1 = _context12.sent;
            (0, _context12.t0)(_context12.t1).toBeInTheDocument();
            _context12.next = 10;
            return regeneratorRuntime.awrap(_userEvent["default"].click(_vue.screen.getByTestId("button-submit")));

          case 10:
            _context12.next = 12;
            return regeneratorRuntime.awrap((0, _vue.waitFor)(function () {
              return expect(_axios["default"].put).toBeCalledTimes(1);
            }));

          case 12:
            _context12.t2 = expect;
            _context12.next = 15;
            return regeneratorRuntime.awrap(_vue.screen.findByText("The selected resource type id is invalid."));

          case 15:
            _context12.t3 = _context12.sent;
            (0, _context12.t2)(_context12.t3).toBeInTheDocument();
            _context12.t4 = expect;
            _context12.next = 20;
            return regeneratorRuntime.awrap(_vue.screen.findByText("The title field is required."));

          case 20:
            _context12.t5 = _context12.sent;
            (0, _context12.t4)(_context12.t5).toBeInTheDocument();

          case 22:
          case "end":
            return _context12.stop();
        }
      }
    });
  });
  it("close modal", function _callee13() {
    var user, _render2, emitted;

    return regeneratorRuntime.async(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            user = _userEvent["default"].setup();
            _render2 = (0, _vue.render)(_ResourcesEditModal["default"], {
              props: {
                isOpen: true,
                resourceTypes: resourceTypes,
                resourceId: false
              }
            }), emitted = _render2.emitted;
            _context13.next = 4;
            return regeneratorRuntime.awrap(_userEvent["default"].click(_vue.screen.getByTestId("button-cancel")));

          case 4:
            expect(emitted().onClose).toBeTruthy();

          case 5:
          case "end":
            return _context13.stop();
        }
      }
    });
  });
  it("unhandled response", function _callee14() {
    var user, $swal;
    return regeneratorRuntime.async(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            user = _userEvent["default"].setup();

            _axios["default"].post.mockRejectedValueOnce({
              response: {
                status: 500,
                data: {
                  errors: "some random error"
                }
              }
            });

            $swal = _vitest.vi.fn();
            (0, _vue.render)(_ResourcesEditModal["default"], {
              props: {
                isOpen: true,
                resourceTypes: resourceTypes,
                resourceId: false
              },
              global: {
                mocks: {
                  $swal: $swal
                }
              }
            });
            _context14.next = 6;
            return regeneratorRuntime.awrap(_userEvent["default"].click(_vue.screen.getByTestId("button-submit")));

          case 6:
            expect($swal).toBeCalledWith("An error ocurred!", "Please try again later.");

          case 7:
          case "end":
            return _context14.stop();
        }
      }
    });
  });
});