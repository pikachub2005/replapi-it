"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adapters = exports.query = exports.mutation = exports.subscription = void 0;
var adapters_1 = require("./adapters");
exports.adapters = adapters_1.default;
var DefaultMutationAdapter_1 = require("./adapters/DefaultMutationAdapter");
var DefaultQueryAdapter_1 = require("./adapters/DefaultQueryAdapter");
var DefaultSubscriptionAdapter_1 = require("./adapters/DefaultSubscriptionAdapter");
function queryOperation(options, adapter, config) {
    var defaultAdapter;
    if (Array.isArray(options)) {
        if (adapter) {
            var customAdapter = new adapter(options, config);
            return customAdapter.queriesBuilder(options);
        }
        defaultAdapter = new DefaultQueryAdapter_1.default(options, config);
        return defaultAdapter.queriesBuilder(options);
    }
    if (adapter) {
        var customAdapter = new adapter(options, config);
        return customAdapter.queryBuilder();
    }
    defaultAdapter = new DefaultQueryAdapter_1.default(options, config);
    return defaultAdapter.queryBuilder();
}
exports.query = queryOperation;
function mutationOperation(options, adapter) {
    var customAdapter;
    var defaultAdapter;
    if (Array.isArray(options)) {
        if (adapter) {
            // @ts-ignore
            customAdapter = new adapter(options);
            return customAdapter.mutationsBuilder(options);
        }
        defaultAdapter = new DefaultMutationAdapter_1.default(options);
        return defaultAdapter.mutationsBuilder(options);
    }
    if (adapter) {
        // @ts-ignore
        customAdapter = new adapter(options);
        return customAdapter.mutationBuilder();
    }
    defaultAdapter = new DefaultMutationAdapter_1.default(options);
    return defaultAdapter.mutationBuilder();
}
exports.mutation = mutationOperation;
function subscriptionOperation(options, adapter) {
    var customAdapter;
    var defaultAdapter;
    if (Array.isArray(options)) {
        if (adapter) {
            // @ts-ignore
            customAdapter = new adapter(options);
            return customAdapter.subscriptionsBuilder(options);
        }
        defaultAdapter = new DefaultSubscriptionAdapter_1.default(options);
        return defaultAdapter.subscriptionsBuilder(options);
    }
    if (adapter) {
        // @ts-ignore
        customAdapter = new adapter(options);
        return customAdapter.subscriptionBuilder();
    }
    defaultAdapter = new DefaultSubscriptionAdapter_1.default(options);
    return defaultAdapter.subscriptionBuilder();
}
exports.subscription = subscriptionOperation;
//# sourceMappingURL=index.js.map