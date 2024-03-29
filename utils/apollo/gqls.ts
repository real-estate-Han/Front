import { gql, useQuery } from '@apollo/client';
import { postType } from '../type';

export const GET_USER = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      userId
      userEmail
      userNickname
      likeposts
      status
      posts
    }
  }
`;

export const GET_CLUSTER_DATA = gql`
  query GetClusterData {
    allpost {
      posts {
        _id
        itemUniqueID
        itemGeoLocation {
          lat
          lng
        }
        itemAddress
        itemLoadAddress
        itemType
        itemExclusiveArea
        itemSupplyArea
        transactionType
        itemDeposit
        itemMonthly
        itemJense
        itemSale
        itemManagement
        itemTotalAreaLand
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
        itemControlLine
        itemElectricity
        itemLandCategory
        itemOption
        itemSecurity
        itemAreaTotal
        itemLandType
        itemLandNumber
        createdAt
        updatedAt
        region_1depth
        region_2depth
        region_3depth
        itemWaterMark
        itemMoreInfo
        itemTotalFloor
        itemManagementInfo
        itemManagementException
        itemDirection
        itemBathroom
        itemLoan
        itemFavorCount
        itemView
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
      itemGeoLocation {
        lat
        lng
      }
      itemAddress
      itemLoadAddress
      itemType
      transactionType
      itemExclusiveArea
      itemSupplyArea
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
      itemSecurity
      itemAreaTotal
      itemTotalAreaLand
      itemLandCategory
      itemControlLine
      itemLandType
      itemLandNumber
      createdAt
      updatedAt
      region_1depth
      region_2depth
      region_3depth
      itemWaterMark
      itemMoreInfo
      itemFavorCount
      itemTotalFloor
      itemManagementInfo
      itemManagementException
      itemDirection
      itemBathroom
      itemLoan
      itemView
      itemCharge
      creator {
        _id
        email
        name
      }
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
export const UPDATE_POST = gql`
  mutation Mutation($updatePostId: ID!, $postInput: PostInputData, $geo: Geo) {
    updatePost(id: $updatePostId, postInput: $postInput, geo: $geo) {
      _id
      itemAddress
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

export const VIEW_POST_UP = gql`
  mutation Mutation($PostId: ID!) {
    viewPost(id: $PostId)
  }
`;

export const IS_LOGINED = gql`
  query Query {
    checklogin {
      checklogin
      status
    }
  }
`;

//   itemDirection
//   itemAreaLand
//   itemAreaBuilding
//   itemSupplyArea
//   itemExclusiveArea
//   itemFloor
//   itemLandType
//   itemFloorHeight
//   itemPurpose
//   itemRooms
//   itemBathroom
//   itemStatus
//   itemTruck
//   itemLandNumber
//   itemAreaTotal
//   itemLandCategory
//   itemTotalAreaLand
//   itemMovein
//   itemApproval
//   itemSubway
//   itemTitleimg
//   itemDetailimg
//   itemTag
//   itemElectricity
//   itemOption
//   itemLoan
//   itemWaterMark
//   itemMoreInfo
//   itemManagementInfo
//   itemManagementException
//   itemFavorCount
//   itemSecurity
//   creator
//   createdAt
//   updatedAt
