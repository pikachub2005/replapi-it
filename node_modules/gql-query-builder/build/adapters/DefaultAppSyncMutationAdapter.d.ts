import IQueryBuilderOptions from "../IQueryBuilderOptions";
import IMutationAdapter from "./IMutationAdapter";
export default class DefaultAppSyncMutationAdapter implements IMutationAdapter {
    private variables;
    private fields;
    private operation;
    constructor(options: IQueryBuilderOptions | IQueryBuilderOptions[]);
    mutationBuilder(): any;
    mutationsBuilder(mutations: IQueryBuilderOptions[]): any;
    private queryDataNameAndArgumentMap;
    private queryDataArgumentAndTypeMap;
    private operationWrapperTemplate;
    private operationTemplate;
    private queryFieldsMap;
}
