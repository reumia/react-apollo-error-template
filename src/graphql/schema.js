import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} from "graphql";
import axios from "axios";

const PeopleType = new GraphQLObjectType({
  name: "People",
  fields: {
    name: { type: GraphQLString },
    gender: { type: GraphQLString },
  },
});

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    people: {
      type: new GraphQLList(PeopleType),
      resolve: async () => {
        const result = await axios.get("https://swapi.dev/api/people/");
        return result?.data?.results;
      },
    },
  },
});

export const schema = new GraphQLSchema({ query: QueryType });
