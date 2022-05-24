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
var NestedField_1 = require("./NestedField");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.resolveVariables = function (operations) {
        var ret = {};
        for (var _i = 0, operations_1 = operations; _i < operations_1.length; _i++) {
            var _a = operations_1[_i], variables = _a.variables, fields = _a.fields;
            ret = __assign(__assign(__assign({}, ret), variables), ((fields && Utils.getNestedVariables(fields)) || {}));
        }
        return ret;
    };
    // Convert object to name and argument map. eg: (id: $id)
    Utils.queryDataNameAndArgumentMap = function (variables) {
        return variables && Object.keys(variables).length
            ? "(".concat(Object.entries(variables).reduce(function (dataString, _a, i) {
                var key = _a[0], value = _a[1];
                return "".concat(dataString).concat(i !== 0 ? ", " : "").concat(value && value.name ? value.name : key, ": $").concat(key);
            }, ""), ")")
            : "";
    };
    Utils.queryFieldsMap = function (fields) {
        var _this = this;
        return fields
            ? fields
                .map(function (field) {
                if ((0, NestedField_1.isNestedField)(field)) {
                    return Utils.queryNestedFieldMap(field);
                }
                else if (typeof field === "object") {
                    var result_1 = "";
                    Object.entries(field).forEach(function (_a, index, array) {
                        var key = _a[0], values = _a[1];
                        result_1 += "".concat(key, " ").concat(values.length > 0
                            ? "{ " + _this.queryFieldsMap(values) + " }"
                            : "");
                        // If it's not the last item in array, join with comma
                        if (index < array.length - 1) {
                            result_1 += ", ";
                        }
                    });
                    return result_1;
                }
                else {
                    return "".concat(field);
                }
            })
                .join(", ")
            : "";
    };
    Utils.queryNestedFieldMap = function (field) {
        return "".concat(field.operation, " ").concat(this.queryDataNameAndArgumentMap(field.variables), " ").concat(field.fields.length > 0
            ? "{ " + this.queryFieldsMap(field.fields) + " }"
            : "");
    };
    // Variables map. eg: { "id": 1, "name": "Jon Doe" }
    Utils.queryVariablesMap = function (variables, fields) {
        var variablesMapped = {};
        var update = function (vars) {
            if (vars) {
                Object.keys(vars).map(function (key) {
                    variablesMapped[key] =
                        typeof vars[key] === "object" ? vars[key].value : vars[key];
                });
            }
        };
        update(variables);
        if (fields && typeof fields === "object") {
            update(Utils.getNestedVariables(fields));
        }
        return variablesMapped;
    };
    Utils.getNestedVariables = function (fields) {
        var variables = {};
        function getDeepestVariables(innerFields) {
            innerFields === null || innerFields === void 0 ? void 0 : innerFields.forEach(function (field) {
                if ((0, NestedField_1.isNestedField)(field)) {
                    variables = __assign(__assign(__assign({}, field.variables), variables), (field.fields && getDeepestVariables(field.fields)));
                }
                else {
                    if (typeof field === "object") {
                        for (var _i = 0, _a = Object.entries(field); _i < _a.length; _i++) {
                            var _b = _a[_i], value = _b[1];
                            getDeepestVariables(value);
                        }
                    }
                }
            });
            return variables;
        }
        getDeepestVariables(fields);
        return variables;
    };
    Utils.queryDataType = function (variable) {
        var type = "String";
        var value = typeof variable === "object" ? variable.value : variable;
        if ((variable === null || variable === void 0 ? void 0 : variable.type) != null) {
            type = variable.type;
        }
        else {
            // TODO: Should handle the undefined value (either in array value or single value)
            var candidateValue = Array.isArray(value) ? value[0] : value;
            switch (typeof candidateValue) {
                case "object":
                    type = "Object";
                    break;
                case "boolean":
                    type = "Boolean";
                    break;
                case "number":
                    type = candidateValue % 1 === 0 ? "Int" : "Float";
                    break;
            }
        }
        // set object based variable properties
        if (typeof variable === "object") {
            if (variable.list === true) {
                type = "[".concat(type, "]");
            }
            else if (Array.isArray(variable.list)) {
                type = "[".concat(type).concat(variable.list[0] ? "!" : "", "]");
            }
            if (variable.required) {
                type += "!";
            }
        }
        return type;
    };
    return Utils;
}());
exports.default = Utils;
//# sourceMappingURL=Utils.js.map