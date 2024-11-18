import { gql } from "@apollo/client";

export const CREATE_AD = gql`
    mutation Mutation($data: AdInput!) {
        createNewAd(data: $data) {
            id
            title
            price
            pictures {
                url
            }
            owner
            location
            description
            createdAt
            category {
                name
                id
            }
            tags {
                name
                id
            }
    }
}
`;