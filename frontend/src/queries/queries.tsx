import { gql } from "@apollo/client";

// Ad queries
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

export const DELETE_AD = gql`
    mutation DeleteAd($deleteAdId: Float!) {
        deleteAd(id: $deleteAdId)
    }
`;

// Category queries
export const GET_CATEGORIES = gql`
  query AllCategories {
  AllCategories {
    name
  }
}
`;

// Tags and Categories
export const GET_TAGS_AND_CATEGORIES = gql`
query AllTagsAndCategories {
    AllTags {
        id
        name
    }
    AllCategories {
        id
        name
    }
  }
`;