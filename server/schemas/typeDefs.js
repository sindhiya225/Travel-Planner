// server/schemas/typeDefs.js
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Upload

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    trips: [Trip]
  }
  type Trip {
    _id: ID
    tripName: String
    description: String
    location: String
    startDate: String
    endDate: String
    plans: [Plan]
    facts: [Fact]
    images: [Image]  
  }

  type Plan {
    _id: ID
    category: String
    name: String
    location: String
    notes: String
    status: Boolean
  }

  type Fact {
    _id: ID
    description: String
  }

  type Image {  # Added
    _id: ID!
    url: String!
    filename: String
    description: String
    uploadedAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    trips: [Trip]
    trip(tripId: ID!): Trip
    me: User
    plan(planId: ID!): Plan
    fact(factId: ID!): Fact
    facts: [Fact]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addTrip(
      userId: ID
      tripName: String
      description: String
      location: String
      startDate: String
      endDate: String
    ): Trip

    login(email: String!, password: String!): Auth
    addPlan(
      tripId: ID
      category: String
      name: String
      location: String
      notes: String
      status: Boolean
    ): Plan
    removePlan(planId: ID!, tripId: ID!): Trip
    removeTrip(tripId: ID!): Trip
    removeFact(factId: ID!, tripId: ID!): Trip
    updateTrip(
      tripId: ID
      tripName: String
      description: String
      location: String
      startDate: String
      endDate: String
    ): Trip
    updatePlan(
      planId: ID
      name: String
      location: String
      notes: String
      status: Boolean
    ): Plan
    updateFact(factId: ID, description: String): Fact
    addFact(tripId: ID, description: String): Fact
    addImage(tripId: ID!, image: Upload!, description: String): Trip  # Added
    deleteImage(tripId: ID!, imageId: ID!): Trip  # Added
  }
`;

module.exports = typeDefs;