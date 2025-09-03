"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useRequireAuth;

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

var _UserContext = require("../context/UserContext");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useRequireAuth() {
  var _useUser = (0, _UserContext.useUser)(),
      user = _useUser.user,
      loading = _useUser.loading;

  var navigate = (0, _reactRouterDom.useNavigate)();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      ready = _useState2[0],
      setReady = _useState2[1];

  (0, _react.useEffect)(function () {
    if (!loading) {
      if (!user) {
        navigate("/logIn", {
          replace: true
        });
      } else {
        setReady(true);
      }
    }
  }, [user, loading, navigate]);
  if (loading || !ready) return null;
  return user;
}