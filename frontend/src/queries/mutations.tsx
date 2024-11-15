import { gql } from "@apollo/client";

export const CREATE_AD = gql`
    mutation Mutation($data: AdInput!) {
        createNewAd(data: $data) {
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
                id
            }
            tags {
                id
            }
    }
}
`;