"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill/noConflict");

var _axios = _interopRequireDefault(require("axios"));

var _formData = _interopRequireDefault(require("form-data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PostAffiliatePro = /*#__PURE__*/function () {
  function PostAffiliatePro(urlServer, urlLogin, username, password) {
    _classCallCheck(this, PostAffiliatePro);

    this.urlServer = urlServer;
    this.urlLogin = urlLogin;
    this.username = username;
    this.password = password;
    this.cookies = null;
    this.session = null;
  }

  _createClass(PostAffiliatePro, [{
    key: "__getSession",
    value: function () {
      var _getSession = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var requestSession;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _axios["default"].get(this.urlLogin);

              case 2:
                requestSession = _context.sent;
                this.session = requestSession.headers["set-cookie"][0].split(";")[0].replace("A=", "");
                return _context.abrupt("return", this.session);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function __getSession() {
        return _getSession.apply(this, arguments);
      }

      return __getSession;
    }()
  }, {
    key: "__authentication",
    value: function () {
      var _authentication = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var bodyFormData, login;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                bodyFormData = new _formData["default"]();

                if (this.session) {
                  _context2.next = 4;
                  break;
                }

                _context2.next = 4;
                return this.__getSession();

              case 4:
                bodyFormData.append("D", JSON.stringify({
                  "C": "Gpf_Rpc_Server",
                  "M": "run",
                  "requests": [{
                    "C": "Gpf_Auth_Service",
                    "M": "authenticate",
                    "fields": [["name", "value"], ["username", this.username], ["password", this.password], ["rememberMe", "Y"], ["language", "pt-BR"]]
                  }],
                  "S": this.session
                }));
                _context2.next = 7;
                return (0, _axios["default"])({
                  method: "POST",
                  url: this.urlServer,
                  data: bodyFormData.getBuffer(),
                  headers: _objectSpread({}, bodyFormData.getHeaders())
                });

              case 7:
                login = _context2.sent;
                this.cookies = login.headers["set-cookie"].join(";");
                return _context2.abrupt("return", true);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function __authentication() {
        return _authentication.apply(this, arguments);
      }

      return __authentication;
    }()
  }, {
    key: "__getAPI",
    value: function () {
      var _getAPI = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
        var bodyFormData, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.cookies) {
                  _context3.next = 3;
                  break;
                }

                _context3.next = 3;
                return this.__authentication();

              case 3:
                data.S = this.session;
                bodyFormData = new _formData["default"]();
                bodyFormData.append("D", JSON.stringify(data));
                _context3.next = 8;
                return (0, _axios["default"])({
                  method: "POST",
                  url: this.urlServer,
                  data: bodyFormData.getBuffer(),
                  headers: _objectSpread({
                    "Cookie": "A=".concat(this.session, "; ").concat(this.cookies)
                  }, bodyFormData.getHeaders())
                });

              case 8:
                response = _context3.sent;
                return _context3.abrupt("return", response.data);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function __getAPI(_x) {
        return _getAPI.apply(this, arguments);
      }

      return __getAPI;
    }()
  }, {
    key: "__parseResult",
    value: function () {
      var _parseResult = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(result) {
        var rows, fields, returnData, returnFields, headers, key, tmpItem, keyHeader, _key, _tmpItem, _keyHeader;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(result.length > 0)) {
                  _context4.next = 9;
                  break;
                }

                rows = result[0].rows;
                fields = result[0].length > 0 ? result[0][0].fields : null;
                returnData = [], returnFields = [], headers = [];

                for (key in rows) {
                  if (key == 0) headers = rows[0];else {
                    tmpItem = {};

                    for (keyHeader in headers) {
                      tmpItem[headers[keyHeader]] = rows[key][keyHeader];
                    }

                    returnData.push(tmpItem);
                  }
                }

                if (fields) {
                  for (_key in fields) {
                    if (_key == 0) headers = fields[0];else {
                      _tmpItem = {};

                      for (_keyHeader in headers) {
                        _tmpItem[headers[_keyHeader]] = fields[_key][_keyHeader];
                      }

                      returnFields.push(_tmpItem);
                    }
                  }
                }

                return _context4.abrupt("return", {
                  data: returnData,
                  fields: returnFields
                });

              case 9:
                return _context4.abrupt("return", null);

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function __parseResult(_x2) {
        return _parseResult.apply(this, arguments);
      }

      return __parseResult;
    }()
  }, {
    key: "command",
    value: function () {
      var _command = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(data) {
        var result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.__getAPI(data);

              case 2:
                result = _context5.sent;
                if (result) result = this.__parseResult(result);
                return _context5.abrupt("return", result);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function command(_x3) {
        return _command.apply(this, arguments);
      }

      return command;
    }()
  }, {
    key: "campaigns",
    value: function () {
      var _campaigns = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var campaigns;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.command({
                  "C": "Gpf_Rpc_Server",
                  "M": "run",
                  "requests": [{
                    "C": "Pap_Affiliates_Promo_CampaignsGrid",
                    "M": "getRows",
                    "columns": [["id"], ["name"], ["description"], ["logourl"], ["banners"], ["longdescriptionexists"], ["commissionsdetails"], ["rstatus"], ["commissionsexist"]]
                  }]
                });

              case 2:
                campaigns = _context6.sent;
                return _context6.abrupt("return", campaigns.data);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function campaigns() {
        return _campaigns.apply(this, arguments);
      }

      return campaigns;
    }()
  }, {
    key: "promo",
    value: function () {
      var _promo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(categoryid, offset, limit) {
        var coupons;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.command({
                  "C": "Gpf_Rpc_Server",
                  "M": "run",
                  "requests": [{
                    "C": "Pap_Affiliates_Promo_BannersGrid",
                    "M": "getRows",
                    "offset": offset,
                    "limit": limit,
                    "filters": [["type", "IN", "A,E,I,T"], ["categoryid", "=", categoryid]],
                    "columns": [["id"], ["destinationurl"], ["name"], ["campaignid"], ["campaignname"], ["bannercode"], ["bannerdirectlinkcode"], ["bannerpreview"], ["rtype"], ["displaystats"], ["channelcode"], ["campaigndetails"]]
                  }]
                });

              case 2:
                coupons = _context7.sent;
                return _context7.abrupt("return", coupons.data);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function promo(_x4, _x5, _x6) {
        return _promo.apply(this, arguments);
      }

      return promo;
    }()
  }, {
    key: "report",
    value: function () {
      var _report = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(datestart, dateend, status) {
        var report;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.command({
                  "C": "Gpf_Rpc_Server",
                  "M": "run",
                  "requests": [{
                    "C": "Pap_Affiliates_Reports_TrendsReport",
                    "M": "loadData",
                    "isInitRequest": "N",
                    "filterType": "trends_report",
                    "filters": [["datetime", "D>=", datestart], ["datetime", "D<=", dateend], ["rpc", "=", "Y"], ["groupBy", "=", "day"], ["dataType1", "=", "saleCount"], ["dataType2", "=", "saleCommission"], ["rstatus", "IN", status]]
                  }]
                });

              case 2:
                report = _context8.sent;
                return _context8.abrupt("return", report.data);

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function report(_x7, _x8, _x9) {
        return _report.apply(this, arguments);
      }

      return report;
    }()
  }, {
    key: "deeplink",
    value: function () {
      var _deeplink = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(url, campaignid) {
        var deeplink;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.command({
                  "C": "Gpf_Rpc_Server",
                  "M": "run",
                  "requests": [{
                    "C": "Gpf_Rpc_Server",
                    "M": "run",
                    "requests": [{
                      "C": "Pap_Affiliates_Promo_DynamicLink",
                      "M": "getDeeplinkCode",
                      "fields": [["name", "value"], ["desturl", url], ["campaignId", campaignid]]
                    }]
                  }]
                });

              case 2:
                deeplink = _context9.sent;
                return _context9.abrupt("return", deeplink.fields[2].value);

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function deeplink(_x10, _x11) {
        return _deeplink.apply(this, arguments);
      }

      return deeplink;
    }()
  }]);

  return PostAffiliatePro;
}();

exports["default"] = PostAffiliatePro;
//# sourceMappingURL=index.js.map