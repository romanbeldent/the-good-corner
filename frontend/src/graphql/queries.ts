import { gql } from "@apollo/client";

// Ad queries
export const GET_ADS = gql`
    query AllAds($title: String, $category: String) {
        AllAds(title: $title, category: $category) {
            id
            title
            description
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
            price
            user {
                email
            }
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

export const GET_USER_INFO = gql`
  query GetUserInfo {
    getUserInfo {
      email
      isLoggedIn
    }
  }
`;

export const GET_ALL_CATEGORIES_AND_USER_INFO = gql`
query GetAllCategoriesAndUserInfo {
    getUserInfo {
        email
        isLoggedIn
    }
    AllCategories {
        id
        name
    }       
}
`;