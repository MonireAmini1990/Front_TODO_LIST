"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.setTokenGetter = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getToken = function getToken() {
  return regeneratorRuntime.async(function getToken$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", null);

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

var setTokenGetter = function setTokenGetter(getter) {
  getToken = getter;
};

exports.setTokenGetter = setTokenGetter;

var api = _axios["default"].create({
  baseURL: "http://localhost:3000/api"
});

api.interceptors.request.use(function _callee(config) {
  var token;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(getToken());

        case 2:
          token = _context2.sent;

          if (token) {
            config.headers.Authorization = "Bearer ".concat(token);
          }

          return _context2.abrupt("return", config);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}, function (error) {
  return Promise.reject(error);
});
var _default = api;
exports["default"] = _default;