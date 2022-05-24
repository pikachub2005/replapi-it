"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNestedField = void 0;
function isNestedField(object) {
    return (typeof object === "object" &&
        object.hasOwnProperty("operation") &&
        object.hasOwnProperty("variables") &&
        object.hasOwnProperty("fields"));
}
exports.isNestedField = isNestedField;
//# sourceMappingURL=NestedField.js.map