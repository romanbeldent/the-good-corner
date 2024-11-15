import { gql } from "@apollo/client";

export const GET_ADS = gql`
    query AllAds {
        AllAds {
            id
            title
            price
            pictures {
                url
            }
            category {
                name
      }
    }
  }
`;

export const GET_AD = gql`
    query GetAdById($getAdByIdId: Float!) {
        getAdById(id: $getAdByIdId) {
            id
            title
            price
            pictures {
                url
            }
            owner
            description
            createdAt
    }
}
`;

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
    }
}
`;

export const DELETE_AD = gql`
    mutation DeleteAd($deleteAdId: Float!) {
        deleteAd(id: $deleteAdId)
    }
`;