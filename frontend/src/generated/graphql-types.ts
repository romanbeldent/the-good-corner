import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Ad = {
  __typename?: 'Ad';
  category?: Maybe<Category>;
  createdAt: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  location: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  pictures: Array<Picture>;
  price: Scalars['Float']['output'];
  tags?: Maybe<Array<Tag>>;
  title: Scalars['String']['output'];
};

export type AdInput = {
  category: Scalars['ID']['input'];
  createdAt: Scalars['DateTimeISO']['input'];
  description: Scalars['String']['input'];
  location: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  pictures?: InputMaybe<Array<PictureInput>>;
  price: Scalars['Float']['input'];
  tags?: InputMaybe<Array<TagInput>>;
  title: Scalars['String']['input'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type CategoryInput = {
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewAd: Ad;
  createNewCategory: Category;
  deleteAd: Scalars['String']['output'];
  deleteCategory: Scalars['String']['output'];
  updateAd: Scalars['String']['output'];
  updateCategory: Scalars['String']['output'];
};


export type MutationCreateNewAdArgs = {
  data: AdInput;
};


export type MutationCreateNewCategoryArgs = {
  data: CategoryInput;
};


export type MutationDeleteAdArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['Float']['input'];
};


export type MutationUpdateAdArgs = {
  data: UpdateAdInput;
};


export type MutationUpdateCategoryArgs = {
  data: UpdateCategoryInput;
};

export type Picture = {
  __typename?: 'Picture';
  id: Scalars['Float']['output'];
  url: Scalars['String']['output'];
};

export type PictureInput = {
  url: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  AllAds: Array<Ad>;
  AllCategories: Array<Category>;
  AllTags: Array<Tag>;
  getAdById: Ad;
  getCategoryById: Category;
};


export type QueryGetAdByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetCategoryByIdArgs = {
  id: Scalars['Float']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type TagInput = {
  id: Scalars['Float']['input'];
};

export type UpdateAdInput = {
  category?: InputMaybe<Scalars['ID']['input']>;
  createdAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryInput = {
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type MutationMutationVariables = Exact<{
  data: AdInput;
}>;


export type MutationMutation = { __typename?: 'Mutation', createNewAd: { __typename?: 'Ad', id: number, title: string, price: number, owner: string, location: string, description: string, createdAt: any, pictures: Array<{ __typename?: 'Picture', url: string }>, category?: { __typename?: 'Category', name: string, id: number } | null, tags?: Array<{ __typename?: 'Tag', name: string, id: number }> | null } };

export type AllAdsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllAdsQuery = { __typename?: 'Query', AllAds: Array<{ __typename?: 'Ad', id: number, title: string, description: string, owner: string, price: number, location: string, createdAt: any, pictures: Array<{ __typename?: 'Picture', id: number, url: string }>, category?: { __typename?: 'Category', id: number, name: string } | null, tags?: Array<{ __typename?: 'Tag', id: number, name: string }> | null }> };

export type GetAdByIdQueryVariables = Exact<{
  getAdByIdId: Scalars['Float']['input'];
}>;


export type GetAdByIdQuery = { __typename?: 'Query', getAdById: { __typename?: 'Ad', id: number, title: string, description: string, owner: string, price: number, location: string, createdAt: any, pictures: Array<{ __typename?: 'Picture', id: number, url: string }>, category?: { __typename?: 'Category', id: number, name: string } | null, tags?: Array<{ __typename?: 'Tag', id: number, name: string }> | null } };

export type DeleteAdMutationVariables = Exact<{
  deleteAdId: Scalars['Float']['input'];
}>;


export type DeleteAdMutation = { __typename?: 'Mutation', deleteAd: string };

export type AllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCategoriesQuery = { __typename?: 'Query', AllCategories: Array<{ __typename?: 'Category', id: number, name: string }> };

export type AllTagsAndCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTagsAndCategoriesQuery = { __typename?: 'Query', AllTags: Array<{ __typename?: 'Tag', id: number, name: string }>, AllCategories: Array<{ __typename?: 'Category', id: number, name: string }> };


export const MutationDocument = gql`
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
export type MutationMutationFn = Apollo.MutationFunction<MutationMutation, MutationMutationVariables>;

/**
 * __useMutationMutation__
 *
 * To run a mutation, you first call `useMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationMutation, { data, loading, error }] = useMutationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useMutationMutation(baseOptions?: Apollo.MutationHookOptions<MutationMutation, MutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationMutation, MutationMutationVariables>(MutationDocument, options);
      }
export type MutationMutationHookResult = ReturnType<typeof useMutationMutation>;
export type MutationMutationResult = Apollo.MutationResult<MutationMutation>;
export type MutationMutationOptions = Apollo.BaseMutationOptions<MutationMutation, MutationMutationVariables>;
export const AllAdsDocument = gql`
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

/**
 * __useAllAdsQuery__
 *
 * To run a query within a React component, call `useAllAdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllAdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllAdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllAdsQuery(baseOptions?: Apollo.QueryHookOptions<AllAdsQuery, AllAdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllAdsQuery, AllAdsQueryVariables>(AllAdsDocument, options);
      }
export function useAllAdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllAdsQuery, AllAdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllAdsQuery, AllAdsQueryVariables>(AllAdsDocument, options);
        }
export function useAllAdsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllAdsQuery, AllAdsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllAdsQuery, AllAdsQueryVariables>(AllAdsDocument, options);
        }
export type AllAdsQueryHookResult = ReturnType<typeof useAllAdsQuery>;
export type AllAdsLazyQueryHookResult = ReturnType<typeof useAllAdsLazyQuery>;
export type AllAdsSuspenseQueryHookResult = ReturnType<typeof useAllAdsSuspenseQuery>;
export type AllAdsQueryResult = Apollo.QueryResult<AllAdsQuery, AllAdsQueryVariables>;
export const GetAdByIdDocument = gql`
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

/**
 * __useGetAdByIdQuery__
 *
 * To run a query within a React component, call `useGetAdByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdByIdQuery({
 *   variables: {
 *      getAdByIdId: // value for 'getAdByIdId'
 *   },
 * });
 */
export function useGetAdByIdQuery(baseOptions: Apollo.QueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables> & ({ variables: GetAdByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
      }
export function useGetAdByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
        }
export function useGetAdByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
        }
export type GetAdByIdQueryHookResult = ReturnType<typeof useGetAdByIdQuery>;
export type GetAdByIdLazyQueryHookResult = ReturnType<typeof useGetAdByIdLazyQuery>;
export type GetAdByIdSuspenseQueryHookResult = ReturnType<typeof useGetAdByIdSuspenseQuery>;
export type GetAdByIdQueryResult = Apollo.QueryResult<GetAdByIdQuery, GetAdByIdQueryVariables>;
export const DeleteAdDocument = gql`
    mutation DeleteAd($deleteAdId: Float!) {
  deleteAd(id: $deleteAdId)
}
    `;
export type DeleteAdMutationFn = Apollo.MutationFunction<DeleteAdMutation, DeleteAdMutationVariables>;

/**
 * __useDeleteAdMutation__
 *
 * To run a mutation, you first call `useDeleteAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAdMutation, { data, loading, error }] = useDeleteAdMutation({
 *   variables: {
 *      deleteAdId: // value for 'deleteAdId'
 *   },
 * });
 */
export function useDeleteAdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAdMutation, DeleteAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAdMutation, DeleteAdMutationVariables>(DeleteAdDocument, options);
      }
export type DeleteAdMutationHookResult = ReturnType<typeof useDeleteAdMutation>;
export type DeleteAdMutationResult = Apollo.MutationResult<DeleteAdMutation>;
export type DeleteAdMutationOptions = Apollo.BaseMutationOptions<DeleteAdMutation, DeleteAdMutationVariables>;
export const AllCategoriesDocument = gql`
    query AllCategories {
  AllCategories {
    id
    name
  }
}
    `;

/**
 * __useAllCategoriesQuery__
 *
 * To run a query within a React component, call `useAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<AllCategoriesQuery, AllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllCategoriesQuery, AllCategoriesQueryVariables>(AllCategoriesDocument, options);
      }
export function useAllCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllCategoriesQuery, AllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllCategoriesQuery, AllCategoriesQueryVariables>(AllCategoriesDocument, options);
        }
export function useAllCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllCategoriesQuery, AllCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllCategoriesQuery, AllCategoriesQueryVariables>(AllCategoriesDocument, options);
        }
export type AllCategoriesQueryHookResult = ReturnType<typeof useAllCategoriesQuery>;
export type AllCategoriesLazyQueryHookResult = ReturnType<typeof useAllCategoriesLazyQuery>;
export type AllCategoriesSuspenseQueryHookResult = ReturnType<typeof useAllCategoriesSuspenseQuery>;
export type AllCategoriesQueryResult = Apollo.QueryResult<AllCategoriesQuery, AllCategoriesQueryVariables>;
export const AllTagsAndCategoriesDocument = gql`
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

/**
 * __useAllTagsAndCategoriesQuery__
 *
 * To run a query within a React component, call `useAllTagsAndCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllTagsAndCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllTagsAndCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllTagsAndCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<AllTagsAndCategoriesQuery, AllTagsAndCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllTagsAndCategoriesQuery, AllTagsAndCategoriesQueryVariables>(AllTagsAndCategoriesDocument, options);
      }
export function useAllTagsAndCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllTagsAndCategoriesQuery, AllTagsAndCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllTagsAndCategoriesQuery, AllTagsAndCategoriesQueryVariables>(AllTagsAndCategoriesDocument, options);
        }
export function useAllTagsAndCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllTagsAndCategoriesQuery, AllTagsAndCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllTagsAndCategoriesQuery, AllTagsAndCategoriesQueryVariables>(AllTagsAndCategoriesDocument, options);
        }
export type AllTagsAndCategoriesQueryHookResult = ReturnType<typeof useAllTagsAndCategoriesQuery>;
export type AllTagsAndCategoriesLazyQueryHookResult = ReturnType<typeof useAllTagsAndCategoriesLazyQuery>;
export type AllTagsAndCategoriesSuspenseQueryHookResult = ReturnType<typeof useAllTagsAndCategoriesSuspenseQuery>;
export type AllTagsAndCategoriesQueryResult = Apollo.QueryResult<AllTagsAndCategoriesQuery, AllTagsAndCategoriesQueryVariables>;