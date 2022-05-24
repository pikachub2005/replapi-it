import Fields from "./Fields";
import IQueryBuilderOptions from "./IQueryBuilderOptions";
import NestedField from "./NestedField";
import VariableOptions from "./VariableOptions";
export default class Utils {
    static resolveVariables(operations: IQueryBuilderOptions[]): any;
    static queryDataNameAndArgumentMap(variables: VariableOptions): string;
    static queryFieldsMap(fields?: Fields): string;
    static queryNestedFieldMap(field: NestedField): string;
    static queryVariablesMap(variables: any, fields?: Fields): {
        [key: string]: unknown;
    };
    static getNestedVariables(fields: Fields): {};
    static queryDataType(variable: any): string;
}
