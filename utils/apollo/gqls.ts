import { gql, useQuery } from '@apollo/client';
import { postType } from '../type';

export const GET_USER = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      userId
    }
  }
`;

export const GET_CLUSTER_DATA = gql`
  query GetClusterData {
    allpost {
      posts {
        _id
        itemAddress
        itemUniqueID
        itemTitleimg
        itemGeoLocation {
          lat
          lng
        }
      }
      totalPosts
    }
  }
`;

export const GET_DETAIL_POST = gql`
  query Post($postId: ID!) {
    post(id: $postId) {
      _id
      itemUniqueID
      itemAddress
      itemType
      itemDeposit
      itemMonthly
      itemJense
      itemSale
      itemManagement
      itemAreaLand
      itemAreaBuilding
      itemFloor
      itemPurpose
      itemRooms
      itemStatus
      itemField
      itemMovein
      itemApproval
      itemSubway
      itemTitleimg
      itemDetailimg
      itemTag
      itemElectricity
      itemOption
      createdAt
      updatedAt
    }
  }
`;

export const Creat_POST = gql`
  mutation Mutation($postInput: PostInputData, $geo: Geo) {
    createPost(postInput: $postInput, geo: $geo) {
      _id
      itemAddress
      itemUniqueID
      itemGeoLocation {
        lat
        lng
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation Mutation($deletePostId: ID!) {
    deletePost(id: $deletePostId)
  }
`;
