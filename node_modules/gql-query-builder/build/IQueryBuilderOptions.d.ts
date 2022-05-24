import Fields from "./Fields";
import VariableOptions from "./VariableOptions";
interface IQueryBuilderOptions {
    operation: string;
    fields?: Fields;
    variables?: VariableOptions;
}
export default IQueryBuilderOptions;
