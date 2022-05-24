import IQueryBuilderOptions from "../IQueryBuilderOptions";
import IQueryAdapter from "./IQueryAdapter";
export default class DefaultAppSyncQueryAdapter implements IQueryAdapter {
    private variables;
    private fields;
    private operation;
    constructor(options: IQueryBuilderOptions | IQueryBuilderOptions[]);
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
    queryDataNameAndArgumentMap(): string;
    private queryDataArgumentAndTypeMap;
    private queryDataType;
    private operationWrapperTemplate;
    private operationTemplate;
}
