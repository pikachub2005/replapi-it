import IQueryBuilderOptions from "../IQueryBuilderOptions";
export default interface IMutationAdapter {
    subscriptionBuilder: () => {
        variables: any;
        query: string;
    };
    subscriptionsBuilder: (options: IQueryBuilderOptions[]) => {
        variables: any;
        query: string;
    };
}
