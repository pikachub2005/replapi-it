"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OperationType_1 = require("../OperationType");
var Utils_1 = require("../Utils");
var DefaultAppSyncQueryAdapter = /** @class */ (function () {
    function DefaultAppSyncQueryAdapter(options) {
        this.queryDataType = function (variable) {
            var type = "String";
            var value = typeof variable === "object" ? variable.value : variable;
            if (variable.type !== undefined) {
                type = variable.type;
            }
            else {
                switch (typeof value) {
                    case "object":
                        type = "Object";
                        break;
                    case "boolean":
                        type = "Boolean";
                        break;
                    case "number":
                        type = value % 1 === 0 ? "Int" : "Float";
                        break;
                }
            }
            if (typeof variable === "object" && variable.required) {
                type += "!";
            }
            return type;
        };
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
    DefaultAppSyncQueryAdapter.prototype.queryBuilder = function () {
        return this.operationWrapperTemplate(this.operationTemplate());
    };
    // if we have an array of options, call this
    DefaultAppSyncQueryAdapter.prototype.queriesBuilder = function (queries) {
        var _this = this;
        var content = function () {
            var tmpl = [];
            queries.forEach(function (query) {
                if (query) {
                    _this.operation = query.operation;
                    _this.fields = query.fields;
                    _this.variables = query.variables;
                    tmpl.push(_this.operationTemplate());
                }
            });
            return tmpl.join(" ");
        };
        return this.operationWrapperTemplate(content());
    };
    // Convert object to name and argument map. eg: (id: $id)
    DefaultAppSyncQueryAdapter.prototype.queryDataNameAndArgumentMap = function () {
        return this.variables && Object.keys(this.variables).length
            ? "(".concat(Object.keys(this.variables).reduce(function (dataString, key, i) {
                return "".concat(dataString).concat(i !== 0 ? ", " : "").concat(key, ": $").concat(key);
            }, ""), ")")
            : "";
    };
    // Convert object to argument and type map. eg: ($id: Int)
    DefaultAppSyncQueryAdapter.prototype.queryDataArgumentAndTypeMap = function () {
        var _this = this;
        return this.variables && Object.keys(this.variables).length
            ? "(".concat(Object.keys(this.variables).reduce(function (dataString, key, i) {
                return "".concat(dataString).concat(i !== 0 ? ", " : "", "$").concat(key, ": ").concat(_this.queryDataType(_this.variables[key]));
            }, ""), ")")
            : "";
    };
    DefaultAppSyncQueryAdapter.prototype.operationWrapperTemplate = function (content) {
        return {
            query: "".concat(OperationType_1.default.Query, " ").concat(this.operation
                .charAt(0)
                .toUpperCase()).concat(this.operation.slice(1), " ").concat(this.queryDataArgumentAndTypeMap(), " { ").concat(content, " }"),
            variables: Utils_1.default.queryVariablesMap(this.variables),
        };
    };
    // query
    DefaultAppSyncQueryAdapter.prototype.operationTemplate = function () {
        return "".concat(this.operation, " ").concat(this.queryDataNameAndArgumentMap(), " { nodes { ").concat(Utils_1.default.queryFieldsMap(this.fields), " } }");
    };
    return DefaultAppSyncQueryAdapter;
}());
exports.default = DefaultAppSyncQueryAdapter;
//# sourceMappingURL=DefaultAppSyncQueryAdapter.js.map