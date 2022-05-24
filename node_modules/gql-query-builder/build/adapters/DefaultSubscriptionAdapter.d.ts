import IQueryBuilderOptions from "../IQueryBuilderOptions";
import ISubscriptionAdapter from "./ISubscriptionAdapter";
export default class DefaultSubscriptionAdapter implements ISubscriptionAdapter {
    private variables;
    private fields;
    private operation;
    constructor(options: IQueryBuilderOptions | IQueryBuilderOptions[]);
    subscriptionBuilder(): {
        query: string;
        variables: {
            [key: string]: unknown;
        };
    };
    subscriptionsBuilder(subscriptions: IQueryBuilderOptions[]): {
        query: string;
        variables: {
            [key: string]: unknown;
        };
    };
    private queryDataNameAndArgumentMap;
    private queryDataArgumentAndTypeMap;
    private operationWrapperTemplate;
    private operationTemplate;
    private queryFieldsMap;
}
