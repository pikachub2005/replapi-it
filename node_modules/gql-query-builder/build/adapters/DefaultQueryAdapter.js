"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var OperationType_1 = require("../OperationType");
var Utils_1 = require("../Utils");
var DefaultQueryAdapter = /** @class */ (function () {
    function DefaultQueryAdapter(options, configuration) {
        var _this = this;
        // Default configs
        this.config = {
            operationName: "",
        };
        if (configuration) {
            Object.entries(configuration).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                _this.config[key] = value;
            });
        }
        if (Array.isArray(options)) {
            this.variables = Utils_1.default.resolveVariables(options);
        }
        else {
            this.variables = options.variables;
            this.fields = options.fields || [];
            this.operation = options.operation;
        }
    }
    // kicks off building for a single query
    DefaultQueryAdapter.prototype.queryBuilder = function () {
        return this.operationWrapperTemplate(this.operationTemplate(this.variables));
    };
    // if we have an array of options, call this
    DefaultQueryAdapter.prototype.queriesBuilder = function (queries) {
        var _this = this;
        var content = function () {
            var tmpl = [];
            queries.forEach(function (query) {
                if (query) {
                    _this.operation = query.operation;
                    _this.fields = query.fields;
                    tmpl.push(_this.operationTemplate(query.variables));
                }
            });
            return tmpl.join(" ");
        };
        return this.operationWrapperTemplate(content());
    };
    // Convert object to argument and type map. eg: ($id: Int)
    DefaultQueryAdapter.prototype.queryDataArgumentAndTypeMap = function () {
        var variablesUsed = this.variables;
        if (this.fields && typeof this.fields === "object") {
            variablesUsed = __assign(__assign({}, Utils_1.default.getNestedVariables(this.fields)), variablesUsed);
        }
        return variablesUsed && Object.keys(variablesUsed).length > 0
            ? "(".concat(Object.keys(variablesUsed).reduce(function (dataString, key, i) {
                return "".concat(dataString).concat(i !== 0 ? ", " : "", "$").concat(key, ": ").concat(Utils_1.default.queryDataType(variablesUsed[key]));
            }, ""), ")")
            : "";
    };
    DefaultQueryAdapter.prototype.operationWrapperTemplate = function (content) {
        var query = "".concat(OperationType_1.default.Query, " ").concat(this.queryDataArgumentAndTypeMap(), " { ").concat(content, " }");
        query = query.replace("query", "query".concat(this.config.operationName !== "" ? " " + this.config.operationName : ""));
        return {
            query: query,
            variables: Utils_1.default.queryVariablesMap(this.variables, this.fields),
        };
    };
    // query
    DefaultQueryAdapter.prototype.operationTemplate = function (variables) {
        return "".concat(this.operation, " ").concat(variables ? Utils_1.default.queryDataNameAndArgumentMap(variables) : "", " ").concat(this.fields && this.fields.length > 0
            ? "{ " + Utils_1.default.queryFieldsMap(this.fields) + " }"
            : "");
    };
    return DefaultQueryAdapter;
}());
exports.default = DefaultQueryAdapter;
//# sourceMappingURL=DefaultQueryAdapter.js.map