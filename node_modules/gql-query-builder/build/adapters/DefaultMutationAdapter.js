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
var DefaultMutationAdapter = /** @class */ (function () {
    function DefaultMutationAdapter(options) {
        if (Array.isArray(options)) {
            this.variables = Utils_1.default.resolveVariables(options);
        }
        else {
            this.variables = options.variables;
            this.fields = options.fields;
            this.operation = options.operation;
        }
    }
    DefaultMutationAdapter.prototype.mutationBuilder = function () {
        return this.operationWrapperTemplate(OperationType_1.default.Mutation, this.variables, this.operationTemplate(this.operation));
    };
    DefaultMutationAdapter.prototype.mutationsBuilder = function (mutations) {
        var _this = this;
        var content = mutations.map(function (opts) {
            _this.operation = opts.operation;
            _this.variables = opts.variables;
            _this.fields = opts.fields;
            return _this.operationTemplate(opts.operation);
        });
        return this.operationWrapperTemplate(OperationType_1.default.Mutation, Utils_1.default.resolveVariables(mutations), content.join("\n  "));
    };
    DefaultMutationAdapter.prototype.queryDataArgumentAndTypeMap = function (variablesUsed) {
        if (this.fields && typeof this.fields === "object") {
            variablesUsed = __assign(__assign({}, Utils_1.default.getNestedVariables(this.fields)), variablesUsed);
        }
        return variablesUsed && Object.keys(variablesUsed).length > 0
            ? "(".concat(Object.keys(variablesUsed).reduce(function (dataString, key, i) {
                return "".concat(dataString).concat(i !== 0 ? ", " : "", "$").concat(key, ": ").concat(Utils_1.default.queryDataType(variablesUsed[key]));
            }, ""), ")")
            : "";
    };
    // start of mutation building
    DefaultMutationAdapter.prototype.operationWrapperTemplate = function (type, variables, content) {
        return {
            query: "".concat(type, " ").concat(this.queryDataArgumentAndTypeMap(variables), " {\n  ").concat(content, "\n}"),
            variables: Utils_1.default.queryVariablesMap(variables, this.fields),
        };
    };
    DefaultMutationAdapter.prototype.operationTemplate = function (operation) {
        return "".concat(operation, " ").concat(Utils_1.default.queryDataNameAndArgumentMap(this.variables), " ").concat(this.fields && this.fields.length > 0
            ? "{\n    ".concat(Utils_1.default.queryFieldsMap(this.fields), "\n  }")
            : "");
    };
    return DefaultMutationAdapter;
}());
exports.default = DefaultMutationAdapter;
//# sourceMappingURL=DefaultMutationAdapter.js.map