"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ResourcesService =
/*#__PURE__*/
function () {
  function ResourcesService() {
    _classCallCheck(this, ResourcesService);
  }

  _createClass(ResourcesService, null, [{
    key: "find",
    value: function find(resourceId) {
      return _axios["default"].get("/api/resources/".concat(resourceId));
    }
  }, {
    key: "update",
    value: function update(resource, file) {
      var formData = this.generateFormData(resource, file);
      return _axios["default"].put("/api/resources/".concat(resource.id), formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    }
  }, {
    key: "store",
    value: function store(resource, file) {
      var formData = this.generateFormData(resource, file);
      return _axios["default"].post("/api/resources", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    }
  }, {
    key: "generateFormData",
    value: function generateFormData(resource, file) {
      var formData = new FormData();
      formData.append("resource_type_id", resource.resource_type.id);

      if (resource.title) {
        formData.append("title", resource.title);
      }

      if (resource.link) {
        formData.append("link", resource.link);
      }

      if (resource.description) {
        formData.append("description", resource.description);
      }

      if (resource.html_snippet) {
        formData.append("html_snippet", resource.html_snippet);
      }

      if (resource.open_new_tab) {
        formData.append("open_new_tab", resource.open_new_tab || false);
      }

      if (file) {
        formData.append("file", file);
      }

      return formData;
    }
  }]);

  return ResourcesService;
}();

exports["default"] = ResourcesService;