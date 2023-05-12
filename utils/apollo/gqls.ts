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
        itemType
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
      itemElevator
      itemHeating
      itemParking
      itemBalcony
      itemPurpose
      itemRooms
      itemStatus
      itemLandNumber
      itemMovein
      itemApproval
      itemSubway
      itemFloorHeight
      itemTitleimg
      itemDetailimg
      itemTag
      itemTruck
      itemElectricity
      itemOption
      itemAreaTotal
      itemLandType
      itemLandNumber
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

export const FAVOR_TOGGLE = gql`
  mutation Mutation($PostId: ID!) {
    likePost(id: $PostId)
  }
`;

export const IS_LOGINED = gql`
  query Query {
    checklogin
  }
`;
