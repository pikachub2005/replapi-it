import IQueryBuilderOptions from "../IQueryBuilderOptions";
import IMutationAdapter from "./IMutationAdapter";
export default class DefaultMutationAdapter implements IMutationAdapter {
    private variables;
    private fields;
    private operation;
    constructor(options: IQueryBuilderOptions | IQueryBuilderOptions[]);
    mutationBuilder(): {
        query: string;
        variables: {
            [key: string]: unknown;
        };
    };
    mutationsBuilder(mutations: IQueryBuilderOptions[]): {
        query: string;
        variables: {
            [key: string]: unknown;
        };
    };
    private queryDataArgumentAndTypeMap;
    private operationWrapperTemplate;
    private operationTemplate;
}
