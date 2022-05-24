import adapters from "./adapters";
import IMutationAdapter from "./adapters/IMutationAdapter";
import ISubscriptionAdapter from "./adapters/ISubscriptionAdapter";
import IQueryBuilderOptions from "./IQueryBuilderOptions";
declare function queryOperation(options: IQueryBuilderOptions | IQueryBuilderOptions[], adapter?: any, config?: any): {
    variables: any;
    query: string;
};
declare function mutationOperation(options: IQueryBuilderOptions | IQueryBuilderOptions[], adapter?: IMutationAdapter): {
    variables: any;
    query: string;
};
declare function subscriptionOperation(options: IQueryBuilderOptions | IQueryBuilderOptions[], adapter?: ISubscriptionAdapter): {
    variables: any;
    query: string;
};
export { subscriptionOperation as subscription, mutationOperation as mutation, queryOperation as query, adapters, };
