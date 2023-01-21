"use strict";
exports.__esModule = true;
console.log(1);
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
var typeDefs =
  '#graphql\n# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.\n\n# This "Book" type defines the queryable fields for every book in our data source.\ntype Book {\n    title: String\n    author: String\n}\n\n# The "Query" type is special: it lists all of the available queries that\n# clients can execute, along with the return type for each. In this\n# case, the "books" query returns an array of zero or more Books (defined above).\ntype Query {\n    books: [Book]\n}\n';
