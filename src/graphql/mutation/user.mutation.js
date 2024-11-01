import { gql } from "@apollo/client";

export const LOGIN_GOOGLE = gql`
  mutation LOGIN_GOOGLE($action: String!, $idToken: String!) {
    userMutation(action: $action, idToken: $idToken) {
      message
      success
      user {
        name
        id
        group
        isAdmin
        isSS
        profilePicture
        comments {
          cardId
          text
        }
      }
    }
  }
`;
