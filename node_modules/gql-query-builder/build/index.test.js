"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultAppSyncQueryAdapter_1 = require("../src/adapters/DefaultAppSyncQueryAdapter");
var queryBuilder = require("./");
describe("Query", function () {
    test("generates query", function () {
        var query = queryBuilder.query({
            operation: "thoughts",
            fields: ["id", "name", "thought"],
        });
        expect(query).toEqual({
            query: "query  { thoughts  { id, name, thought } }",
            variables: {},
        });
    });
    test("generates query when adapter argument is provided", function () {
        var query = queryBuilder.query({
            operation: "thoughts",
            fields: ["id", "name", "thought"],
        }, DefaultAppSyncQueryAdapter_1.default);
        expect(query).toEqual({
            query: "query Thoughts  { thoughts  { nodes { id, name, thought } } }",
            variables: {},
        });
    });
    test("generate query with undefined variables", function () {
        var query = queryBuilder.query({
            operation: "user",
            fields: ["id", "name", "email"],
            variables: { id: { type: "Int" }, name: undefined },
        });
        expect(query).toEqual({
            query: "query ($id: Int, $name: String) { user (id: $id, name: $name) { id, name, email } }",
            variables: { id: undefined, name: undefined },
        });
    });
    test("generates query with variables", function () {
        var query = queryBuilder.query({
            operation: "thought",
            variables: { id: 1 },
            fields: ["id", "name", "thought"],
        });
        expect(query).toEqual({
            query: "query ($id: Int) { thought (id: $id) { id, name, thought } }",
            variables: { id: 1 },
        });
    });
    test("generates query with sub fields selection", function () {
        var query = queryBuilder.query({
            operation: "orders",
            fields: [
                "id",
                "amount",
                {
                    user: [
                        "id",
                        "name",
                        "email",
                        {
                            address: ["city", "country"],
                        },
                        {
                            account: ["holder"],
                        },
                    ],
                },
            ],
        });
        expect(query).toEqual({
            query: "query  { orders  { id, amount, user { id, name, email, address { city, country }, account { holder } } } }",
            variables: {},
        });
    });
    test("generates query with multiple sub fields selection in same object", function () {
        var query = queryBuilder.query({
            operation: "orders",
            fields: [
                "id",
                "amount",
                {
                    user: [
                        "id",
                        "name",
                        "email",
                        {
                            address: ["city", "country"],
                            account: ["holder"],
                        },
                    ],
                },
            ],
        });
        expect(query).toEqual({
            query: "query  { orders  { id, amount, user { id, name, email, address { city, country }, account { holder } } } }",
            variables: {},
        });
    });
    test("generates query with required variables", function () {
        var query = queryBuilder.query({
            operation: "userLogin",
            variables: {
                email: { value: "jon.doe@example.com", required: true },
                password: { value: "123456", required: true },
            },
            fields: ["userId", "token"],
        });
        expect(query).toEqual({
            query: "query ($email: String!, $password: String!) { userLogin (email: $email, password: $password) { userId, token } }",
            variables: { email: "jon.doe@example.com", password: "123456" },
        });
    });
    test("generate query with array variable (array items are not nullable)", function () {
        var query = queryBuilder.query({
            operation: "search",
            variables: {
                tags: { value: ["a", "b", "c"], list: [true], type: "String" },
            },
            fields: ["id", "title", "content", "tag"],
        });
        expect(query).toEqual({
            query: "query ($tags: [String!]) { search (tags: $tags) { id, title, content, tag } }",
            variables: { tags: ["a", "b", "c"] },
        });
    });
    test("generate query with array variable (array items are nullable)", function () {
        var query = queryBuilder.query({
            operation: "search",
            variables: {
                tags: { value: ["a", "b", "c", null], list: true },
            },
            fields: ["id", "title", "content", "tag"],
        });
        expect(query).toEqual({
            query: "query ($tags: [String]) { search (tags: $tags) { id, title, content, tag } }",
            variables: { tags: ["a", "b", "c", null] },
        });
    });
    test("generates multiple queries", function () {
        var query = queryBuilder.query([
            {
                operation: "thoughts",
                fields: ["id", "name", "thought"],
            },
            {
                operation: "prayers",
                fields: ["id", "name", "prayer"],
            },
        ]);
        expect(query).toEqual({
            query: "query  { thoughts  { id, name, thought } prayers  { id, name, prayer } }",
            variables: {},
        });
    });
    test("generates query with variables nested in fields", function () {
        var query = queryBuilder.query([
            {
                operation: "getPublicationNames",
                fields: [
                    {
                        operation: "publication",
                        variables: { id: { value: 12, type: "ID" } },
                        fields: ["id", "name"],
                    },
                ],
            },
        ]);
        expect(query).toEqual({
            query: "query ($id: ID) { getPublicationNames  { publication (id: $id) { id, name } } }",
            variables: { id: 12 },
        });
    });
    test("generates query with nested variables in nested fields", function () {
        var query = queryBuilder.query([
            {
                operation: "getPublicationNames",
                fields: [
                    {
                        operation: "publication",
                        variables: { id: { value: 12, type: "ID" } },
                        fields: [
                            "id",
                            "name",
                            {
                                operation: "platforms",
                                variables: {
                                    visible: { type: "Boolean", value: true },
                                    platformLimit: { name: "limit", value: 999, type: "Int" },
                                },
                                fields: [
                                    "totalCount",
                                    {
                                        edges: [
                                            "label",
                                            "code",
                                            "parentId",
                                            "id",
                                            {
                                                operation: "rights",
                                                variables: {
                                                    idChannel: { type: "Int", required: true },
                                                    rightsLimit: {
                                                        name: "limit",
                                                        value: 999,
                                                        type: "Int",
                                                    },
                                                    rightsOffset: {
                                                        name: "offset",
                                                        value: 0,
                                                        type: "Int",
                                                    },
                                                },
                                                fields: [
                                                    "id",
                                                    "label",
                                                    {
                                                        operation: "users",
                                                        variables: {
                                                            userLimit: {
                                                                name: "limit",
                                                                value: 999,
                                                                type: "Int",
                                                            },
                                                            userFilter: {
                                                                name: "filters",
                                                                value: "doe",
                                                                type: "String",
                                                            },
                                                        },
                                                        fields: ["id", "name"],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    "subField",
                                    {
                                        operation: "channels",
                                        variables: {
                                            idChannel: { name: "id", type: "Int", required: true },
                                            channelLimit: { name: "limit", value: 999, type: "Int" },
                                        },
                                        fields: ["id", "label"],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ]);
        expect(query).toEqual({
            query: "query ($id: ID, $visible: Boolean, $platformLimit: Int, $idChannel: Int!, $channelLimit: Int, $rightsLimit: Int, $rightsOffset: Int, $userLimit: Int, $userFilter: String) { getPublicationNames  { publication (id: $id) { id, name, platforms (visible: $visible, limit: $platformLimit) { totalCount, edges { label, code, parentId, id, rights (idChannel: $idChannel, limit: $rightsLimit, offset: $rightsOffset) { id, label, users (limit: $userLimit, filters: $userFilter) { id, name } } }, subField, channels (id: $idChannel, limit: $channelLimit) { id, label } } } } }",
            variables: {
                id: 12,
                visible: true,
                platformLimit: 999,
                idChannel: undefined,
                channelLimit: 999,
                rightsLimit: 999,
                rightsOffset: 0,
                userLimit: 999,
                userFilter: "doe",
            },
        });
    });
    test("generates query with object variables nested in fields", function () {
        var query = queryBuilder.query([
            {
                operation: "getPublicationNames",
                variables: { id: { type: "ID", value: 12 } },
                fields: [
                    {
                        operation: "publication",
                        variables: {
                            input: {
                                value: { type: "news", tz: "EST" },
                                type: "FilterInput",
                            },
                        },
                        fields: ["name", "publishedAt"],
                    },
                ],
            },
        ]);
        expect(query).toEqual({
            query: "query ($input: FilterInput, $id: ID) { getPublicationNames (id: $id) { publication (input: $input) { name, publishedAt } } }",
            variables: {
                id: 12,
                input: { type: "news", tz: "EST" },
            },
        });
    });
    test("generates query without extraneous brackets for operation with no fields", function () {
        var query = queryBuilder.query({
            operation: "getFilteredUsersCount",
        });
        expect(query).toEqual({
            query: "query  { getFilteredUsersCount   }",
            variables: {},
        });
    });
    test("generates queries without extraneous brackets for operations with no fields", function () {
        var query = queryBuilder.query([
            {
                operation: "getFilteredUsersCount",
            },
            {
                operation: "getAllUsersCount",
            },
        ]);
        expect(query).toEqual({
            query: "query  { getFilteredUsersCount   getAllUsersCount   }",
            variables: {},
        });
    });
    test("generates query without extraneous brackets for operations with empty fields", function () {
        var query = queryBuilder.query({
            operation: "getFilteredUsersCount",
            fields: [],
        });
        expect(query).toEqual({
            query: "query  { getFilteredUsersCount   }",
            variables: {},
        });
    });
    test("generates queries without extraneous brackets for operations with empty fields", function () {
        var query = queryBuilder.query([
            {
                operation: "getFilteredUsersCount",
                fields: [],
            },
            {
                operation: "getAllUsersCount",
                fields: [],
            },
        ]);
        expect(query).toEqual({
            query: "query  { getFilteredUsersCount   getAllUsersCount   }",
            variables: {},
        });
    });
    test("generates query without extraneous brackets for operation with empty fields of fields", function () {
        var query = queryBuilder.query({
            operation: "getFilteredUsers",
            fields: [
                {
                    count: [],
                },
            ],
        });
        expect(query).toEqual({
            query: "query  { getFilteredUsers  { count  } }",
            variables: {},
        });
    });
    test("generates queries without extraneous brackets for operations with empty fields of fields", function () {
        var query = queryBuilder.query([
            {
                operation: "getFilteredUsers",
                fields: [
                    {
                        count: [],
                    },
                ],
            },
            {
                operation: "getFilteredPosts",
                fields: [
                    {
                        count: [],
                    },
                ],
            },
        ]);
        expect(query).toEqual({
            query: "query  { getFilteredUsers  { count  } getFilteredPosts  { count  } }",
            variables: {},
        });
    });
    test("generates query without extraneous brackets for operation with nested operation empty fields", function () {
        var query = queryBuilder.query({
            operation: "getFilteredUsers",
            fields: [
                {
                    operation: "average_age",
                    fields: [],
                    variables: { format: "months" },
                },
            ],
        });
        expect(query).toEqual({
            query: "query ($format: String) { getFilteredUsers  { average_age (format: $format)  } }",
            variables: { format: "months" },
        });
    });
    test("generates queries without extraneous brackets for operations with nested operation empty fields", function () {
        var query = queryBuilder.query([
            {
                operation: "getFilteredUsers",
                fields: [
                    {
                        operation: "average_age",
                        fields: [],
                        variables: {},
                    },
                ],
            },
            {
                operation: "getFilteredPosts",
                fields: [
                    {
                        operation: "average_viewers",
                        fields: [],
                        variables: {},
                    },
                ],
            },
        ]);
        expect(query).toEqual({
            query: "query  { getFilteredUsers  { average_age   } getFilteredPosts  { average_viewers   } }",
            variables: {},
        });
    });
    test("generates queries with object variables for multiple queries", function () {
        var query = queryBuilder.query([
            {
                operation: "getPublicationData",
                variables: { id: { type: "ID", value: 12 } },
                fields: ["publishedAt"],
            },
            {
                operation: "getPublicationUsers",
                variables: { name: { value: "johndoe" } },
                fields: ["full_name"],
            },
        ]);
        expect(query).toEqual({
            query: "query ($id: ID, $name: String) { getPublicationData (id: $id) { publishedAt } getPublicationUsers (name: $name) { full_name } }",
            variables: {
                id: 12,
                name: "johndoe",
            },
        });
    });
    test("generates queries with object variables for multiple queries with nested variables", function () {
        var query = queryBuilder.query([
            {
                operation: "getPublicationData",
                variables: { id: { type: "ID", value: 12 } },
                fields: [
                    "publishedAt",
                    {
                        operation: "publicationOrg",
                        variables: { location: "mars" },
                        fields: ["name"],
                    },
                ],
            },
            {
                operation: "getPublicationUsers",
                variables: { name: { value: "johndoe" } },
                fields: ["full_name"],
            },
        ]);
        expect(query).toEqual({
            query: "query ($id: ID, $location: String, $name: String) { getPublicationData (id: $id) { publishedAt, publicationOrg (location: $location) { name } } getPublicationUsers (name: $name) { full_name } }",
            variables: {
                id: 12,
                location: "mars",
                name: "johndoe",
            },
        });
    });
    test("generates query with operation name", function () {
        var query = queryBuilder.query([
            {
                operation: "getPublicationNames",
                variables: { id: { type: "ID", value: 12 } },
                fields: ["name", "publishedAt"],
            },
        ], null, {
            operationName: "operation",
        });
        expect(query).toEqual({
            query: "query operation ($id: ID) { getPublicationNames (id: $id) { name, publishedAt } }",
            variables: {
                id: 12,
            },
        });
    });
    test("generates query arguments different from variable name", function () {
        var query = queryBuilder.query([
            {
                operation: "someoperation",
                fields: [
                    {
                        operation: "nestedoperation",
                        fields: ["field1"],
                        variables: {
                            id2: {
                                name: "id",
                                type: "ID",
                                value: 123,
                            },
                        },
                    },
                ],
                variables: {
                    id1: {
                        name: "id",
                        type: "ID",
                        value: 456,
                    },
                },
            },
        ]);
        expect(query).toEqual({
            query: "query ($id2: ID, $id1: ID) { someoperation (id: $id1) { nestedoperation (id: $id2) { field1 } } }",
            variables: {
                id1: 456,
                id2: 123,
            },
        });
    });
});
describe("Mutation", function () {
    test("generates mutation query", function () {
        var query = queryBuilder.mutation({
            operation: "thoughtCreate",
            variables: {
                name: "Tyrion Lannister",
                thought: "I drink and I know things.",
            },
            fields: ["id"],
        });
        expect(query).toEqual({
            query: "mutation ($name: String, $thought: String) {\n  thoughtCreate (name: $name, thought: $thought) {\n    id\n  }\n}",
            variables: {
                name: "Tyrion Lannister",
                thought: "I drink and I know things.",
            },
        });
    });
    test("generates mutation query with required variables", function () {
        var query = queryBuilder.mutation({
            operation: "userSignup",
            variables: {
                name: "Jon Doe",
                email: { value: "jon.doe@example.com", required: true },
                password: { value: "123456", required: true },
            },
            fields: ["userId"],
        });
        expect(query).toEqual({
            query: "mutation ($name: String, $email: String!, $password: String!) {\n  userSignup (name: $name, email: $email, password: $password) {\n    userId\n  }\n}",
            variables: {
                name: "Jon Doe",
                email: "jon.doe@example.com",
                password: "123456",
            },
        });
    });
    test("generates multiple mutations", function () {
        var query = queryBuilder.mutation([
            {
                operation: "thoughtCreate",
                variables: {
                    name: "Tyrion Lannister",
                    thought: "I drink and I know things.",
                },
                fields: ["id"],
            },
            {
                operation: "prayerCreate",
                variables: {
                    name: { value: "Tyrion Lannister" },
                    prayer: { value: "I wish for winter." },
                },
                fields: ["id"],
            },
        ]);
        expect(query).toEqual({
            query: "mutation ($name: String, $thought: String, $prayer: String) {\n  thoughtCreate (name: $name, thought: $thought) {\n    id\n  }\n  prayerCreate (name: $name, prayer: $prayer) {\n    id\n  }\n}",
            variables: {
                name: "Tyrion Lannister",
                thought: "I drink and I know things.",
                prayer: "I wish for winter.",
            },
        });
    });
    test("generates multiple mutations with named variables", function () {
        var query = queryBuilder.mutation([
            {
                operation: "delete0: deleteUser",
                variables: {
                    id0: {
                        name: "id",
                        type: "ID",
                        value: "user_1234",
                    },
                },
                fields: ["id"],
            },
            {
                operation: "delete1: deleteUser",
                variables: {
                    id1: {
                        name: "id",
                        type: "ID",
                        value: "user_5678",
                    },
                },
                fields: ["id"],
            },
        ]);
        expect(query).toEqual({
            query: "mutation ($id0: ID, $id1: ID) {\n  delete0: deleteUser (id: $id0) {\n    id\n  }\n  delete1: deleteUser (id: $id1) {\n    id\n  }\n}",
            variables: {
                id0: "user_1234",
                id1: "user_5678",
            },
        });
    });
    test("generates mutation with required variables", function () {
        var query = queryBuilder.mutation({
            operation: "userSignup",
            variables: {
                name: "Jon Doe",
                email: { value: "jon.doe@example.com", required: true },
                password: { value: "123456", required: true },
            },
            fields: ["id"],
        });
        expect(query).toEqual({
            query: "mutation ($name: String, $email: String!, $password: String!) {\n  userSignup (name: $name, email: $email, password: $password) {\n    id\n  }\n}",
            variables: {
                name: "Jon Doe",
                email: "jon.doe@example.com",
                password: "123456",
            },
        });
    });
    test("generates mutation custom type", function () {
        var query = queryBuilder.mutation({
            operation: "userPhoneNumber",
            variables: {
                phone: {
                    value: { prefix: "+91", number: "9876543210" },
                    type: "PhoneNumber",
                    required: true,
                },
            },
            fields: ["id"],
        });
        expect(query).toEqual({
            query: "mutation ($phone: PhoneNumber!) {\n  userPhoneNumber (phone: $phone) {\n    id\n  }\n}",
            variables: {
                phone: { prefix: "+91", number: "9876543210" },
            },
        });
    });
    test("generate mutation without fields selection", function () {
        var query = queryBuilder.mutation({
            operation: "logout",
        });
        expect(query).toEqual({
            query: "mutation  {\n  logout  \n}",
            variables: {},
        });
    });
    test("generates nested mutation operations without variables", function () {
        var query = queryBuilder.mutation({
            operation: "namespaceField",
            fields: [
                {
                    operation: "innerMutation",
                    fields: ["id"],
                    variables: {},
                },
            ],
        });
        expect(query).toEqual({
            query: "mutation  {\n  namespaceField  {\n    innerMutation  { id }\n  }\n}",
            variables: {},
        });
    });
    test("generates nested mutation operations with variables", function () {
        var query = queryBuilder.mutation({
            operation: "namespaceField",
            fields: [
                {
                    operation: "innerMutation",
                    variables: {
                        name: { value: "stringy" },
                    },
                    fields: ["id"],
                },
            ],
        });
        expect(query).toEqual({
            query: "mutation ($name: String) {\n  namespaceField  {\n    innerMutation (name: $name) { id }\n  }\n}",
            variables: { name: "stringy" },
        });
    });
    test("generates multiple nested mutation operations with variables", function () {
        var query = queryBuilder.mutation([
            {
                operation: "namespaceField",
                fields: [
                    {
                        operation: "mutationA",
                        variables: {
                            nameA: { value: "A" },
                        },
                        fields: ["id"],
                    },
                ],
            },
            {
                operation: "namespaceField",
                fields: [
                    {
                        operation: "mutationB",
                        variables: {
                            nameB: { value: "B" },
                        },
                        fields: ["id"],
                    },
                ],
            },
        ]);
        expect(query).toEqual({
            query: "mutation ($nameB: String, $nameA: String) {\n  namespaceField  {\n    mutationA (nameA: $nameA) { id }\n  }\n  namespaceField  {\n    mutationB (nameB: $nameB) { id }\n  }\n}",
            variables: { nameA: "A", nameB: "B" },
        });
    });
});
describe("Subscriptions", function () {
    test("generates subscriptions", function () {
        var query = queryBuilder.subscription([
            {
                operation: "thoughtCreate",
                variables: {
                    name: "Tyrion Lannister",
                    thought: "I drink and I know things.",
                },
                fields: ["id"],
            },
            {
                operation: "prayerCreate",
                variables: {
                    name: { value: "Tyrion Lannister" },
                    prayer: { value: "I wish for winter." },
                },
                fields: ["id"],
            },
        ]);
        expect(query).toEqual({
            query: "subscription ($name: String, $thought: String, $prayer: String) {\n  thoughtCreate (name: $name, thought: $thought) {\n    id\n  }\n  prayerCreate (name: $name, prayer: $prayer) {\n    id\n  }\n}",
            variables: {
                name: "Tyrion Lannister",
                thought: "I drink and I know things.",
                prayer: "I wish for winter.",
            },
        });
    });
    test("generates subscription with required variables", function () {
        var query = queryBuilder.subscription({
            operation: "userSignup",
            variables: {
                name: "Jon Doe",
                email: { value: "jon.doe@example.com", required: true },
                password: { value: "123456", required: true },
            },
            fields: ["id"],
        });
        expect(query).toEqual({
            query: "subscription ($name: String, $email: String!, $password: String!) {\n  userSignup (name: $name, email: $email, password: $password) {\n    id\n  }\n}",
            variables: {
                name: "Jon Doe",
                email: "jon.doe@example.com",
                password: "123456",
            },
        });
    });
    test("generates subscription custom type", function () {
        var query = queryBuilder.subscription({
            operation: "userPhoneNumber",
            variables: {
                phone: {
                    value: { prefix: "+91", number: "9876543210" },
                    type: "PhoneNumber",
                    required: true,
                },
            },
            fields: ["id"],
        });
        expect(query).toEqual({
            query: "subscription ($phone: PhoneNumber!) {\n  userPhoneNumber (phone: $phone) {\n    id\n  }\n}",
            variables: {
                phone: { prefix: "+91", number: "9876543210" },
            },
        });
    });
});
//# sourceMappingURL=index.test.js.map