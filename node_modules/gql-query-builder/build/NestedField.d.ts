import IQueryBuilderOptions from "./IQueryBuilderOptions";
import Fields from "./Fields";
declare type NestedField = {
    operation: string;
    variables: IQueryBuilderOptions[];
    fields: Fields;
};
export default NestedField;
export declare function isNestedField(object: any): object is NestedField;
