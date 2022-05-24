import IQueryBuilderOptions from "../IQueryBuilderOptions";
import IQueryAdapter from "./IQueryAdapter";
export default class DefaultQueryAdapter implements IQueryAdapter {
    private variables;
    private fields;
    private operation;
    private config;
    constructor(options: IQueryBuilderOptions | IQueryBuilderOptions[], configuration?: {
        [key: string]: unknown;
    });
    queryBuilder(): {
        variables: {
            [p: string]: unknown;
        };
        query: string;
    };
    queriesBuilder(queries: IQueryBuilderOptions[]): {
        variables: {
            [p: string]: unknown;
        };
        query: string;
    };
    private queryDataArgumentAndTypeMap;
    private operationWrapperTemplate;
    private operationTemplate;
}
