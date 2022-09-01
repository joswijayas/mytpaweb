import { gql } from "@apollo/client";

export const QUERY_REGISTER = gql`
    mutation UserRegister($input: NewUser!){
        registerUser(input: $input)
    }`;

export const QUERY_ACTIVATE_USER = gql`
    mutation ActivateUser($id: ID!){
        activateUser(id: $id)
    }`;

export const QUERY_LOGIN = gql`
    mutation UserLogin($email: String!, $password: String!){
        loginUser(email: $email, password: $password)
    }`;

export const QUERY_UPDATE_ABOUT = gql`
    mutation UpdateAbout($id: ID!, $about: String!){
        updateAbout(
            id: $id,
            about: $about
        )
    }
`;