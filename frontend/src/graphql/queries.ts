import { gql } from "@apollo/client";

// Ad queries
export const GET_ADS = gql`
    query AllAds {
        AllAds {
            id
            title
            description
            owner
            price
            location
            createdAt
            pictures {
                id
                url
            }
            category {
                id
                name
            }
            tags {
                id
                name
            }
    }
}
`;

export const GET_AD_BY_ID = gql`
    query GetAdById($getAdByIdId: Float!) {
        getAdById(id: $getAdByIdId) {
            id
            title
            description
            owner
            price
            pictures {
                id
                url
            }
            location
            createdAt
            category {
                id
                name
            }
            tags {
                id
                name
            }
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
    id
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