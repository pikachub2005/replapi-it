"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OperationType_1 = require("../OperationType");
var Utils_1 = require("../Utils");
var DefaultSubscriptionAdapter = /** @class */ (function () {
    function DefaultSubscriptionAdapter(options) {
        if (Array.isArray(options)) {
            this.variables = Utils_1.default.resolveVariables(options);
        }
        else {
            this.variables = options.variables;
            this.fields = options.fields;
            this.operation = options.operation;
        }
    }
    DefaultSubscriptionAdapter.prototype.subscriptionBuilder = function () {
        return this.operationWrapperTemplate(OperationType_1.default.Subscription, this.variables, this.operationTemplate(this.operation));
    };
    DefaultSubscriptionAdapter.prototype.subscriptionsBuilder = function (subscriptions) {
        var _this = this;
        var content = subscriptions.map(function (opts) {
            _this.operation = opts.operation;
            _this.variables = opts.variables;
            _this.fields = opts.fields;
            return _this.operationTemplate(opts.operation);
        });
        return this.operationWrapperTemplate(OperationType_1.default.Subscription, Utils_1.default.resolveVariables(subscriptions), content.join("\n  "));
    };
    // Convert object to name and argument map. eg: (id: $id)
    DefaultSubscriptionAdapter.prototype.queryDataNameAndArgumentMap = function () {
        return this.variables && Object.keys(this.variables).length
            ? "(".concat(Object.keys(this.variables).reduce(function (dataString, key, i) {
                return "".concat(dataString).concat(i !== 0 ? ", " : "").concat(key, ": $").concat(key);
            }, ""), ")")
            : "";
    };
    DefaultSubscriptionAdapter.prototype.queryDataArgumentAndTypeMap = function (variables) {
        return Object.keys(variables).length
            ? "(".concat(Object.keys(variables).reduce(function (dataString, key, i) {
                return "".concat(dataString).concat(i !== 0 ? ", " : "", "$").concat(key, ": ").concat(Utils_1.default.queryDataType(variables[key]));
            }, ""), ")")
            : "";
    };
    // start of subscription building
    DefaultSubscriptionAdapter.prototype.operationWrapperTemplate = function (type, variables, content) {
        return {
            query: "".concat(type, " ").concat(this.queryDataArgumentAndTypeMap(variables), " {\n  ").concat(content, "\n}"),
            variables: Utils_1.default.queryVariablesMap(variables),
        };
    };
    DefaultSubscriptionAdapter.prototype.operationTemplate = function (operation) {
        return "".concat(operation, " ").concat(this.queryDataNameAndArgumentMap(), " {\n    ").concat(this.queryFieldsMap(this.fields), "\n  }");
    };
    // Fields selection map. eg: { id, name }
    DefaultSubscriptionAdapter.prototype.queryFieldsMap = function (fields) {
        var _this = this;
        return fields
            ? fields
                .map(function (field) {
                return typeof field === "object"
                    ? "".concat(Object.keys(field)[0], " { ").concat(_this.queryFieldsMap(Object.values(field)[0]), " }")
                    : "".concat(field);
            })
                .join(", ")
            : "";
    };
    return DefaultSubscriptionAdapter;
}());
exports.default = DefaultSubscriptionAdapter;
//# sourceMappingURL=DefaultSubscriptionAdapter.js.map