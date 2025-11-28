import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query User($username: String!) {
    user(username: $username) {
      _id
      username
      trips {
        _id
        tripName
        description
        location
        startDate
        endDate
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      trips {
        _id
        tripName
        description
        startDate
        endDate
        location
      }
    }
  }
`;

export const QUERY_TRIP = gql`
  query trip($tripId: ID!) {
    trip(tripId: $tripId) {
      _id
      plans {
        _id
        category
        # Add your existing plan fields here
      }
      facts {
        _id
        # Add your existing fact fields here
      }
      images {  # Added
        _id
        url
        description
        filename
        uploadedAt
      }
    }
  }
`;