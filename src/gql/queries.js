import gql from 'graphql-tag'

// const POST_INFO = gql`
//   fragment PostInfo on Post {
//     id
//     title
//     content
//     image
//     createdAt
//   }
// `

// const COMMENT_INFO = gql`
//   fragment CommmentInfo on Comment {
//     id
//     postId
//     content
//     createdAt
//   }
// `

export const GET_POSTS = gql`
  query posts {
    posts {
      id
      title
      content
      image
      createdAt
      comments {
        id
        postId
        content
        createdAt
      }
    }
  }
`

export const GET_POST_BY_ID = gql`
  query getPostById($id: Int) {
    post(id: $id) {
      id
      title
      content
      image
      createdAt
      comments {
        id
        postId
        content
        createdAt
      }
    }
  }
`

export const ALL_POST = gql`
  query allPost($limit: Int) {
    posts( pagination: {limit: $limit}) {
      id
      title
      content
      image
      createdAt
      comments {
        id
        postId
        content
        createdAt
      }
    }
  }
`
