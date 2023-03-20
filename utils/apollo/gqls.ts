import { gql, useQuery } from "@apollo/client";
import { postType } from "../type";

// export const GET_POSTS = gql`
//     query GetPosts {
//         posts {

//         }
//     }
// `;

export const GET_CLUSTER_DATA = gql`
  query GetClusterData {
    allpost {
      posts {
        _id
        itemAddress
        itemUniqueID
        itemGeoLocation {
          lat
          lng
        }
      }
      totalPosts
    }
  }
`;

// export const GET_POST = gql`
//     query GetPost($id: ID!) {
//         post(id: $id) {

//             }
//         }
//     `;

// export const CreatePostGQL = (data: postType) => {
//   const Creat_POST = gql`
//     mutation CreatePost($postInput: postInput) {
//       createPost(postInput: $postInput)
//     }
//   `;
//   return Creat_POST;
// };

// export const UPDATE_POST = gql`
//     mutation UpdatePost($id: ID!, $title: String!, $body: String!) {
//         updatePost(id: $id, title: $title, body: $body) {

//         }
//     }
// `;

// export const DELETE_POST = gql`
//     mutation DeletePost($id: ID!) {
//         deletePost(id: $id) {

//         }
//     }
// `;

// export const CREATE_USER = gql`
//   mutation CreateUser($name: String!, $email: String!, $password: String!) {
//     createUser(name: $name, email: $email, password: $password) {

//     }
//   }
// `;

// export const GET_USER = gql`
//   query Login($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       id
//       name
//       email
//     }
//   }
// `;
