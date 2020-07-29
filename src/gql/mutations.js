import gql from 'graphql-tag'

// const COMMENT_INFO = gql`
//   fragment CommmentInfo on Comment {
//     id
//     postId
//     content
//     createdAt
//   }
// `;

export const ADD_COMMENT = gql`
  mutation addComment($postId: Int!, $content: String!) {
    addComment(postId: $postId, content: $content) {
      id
      postId
      content
      createdAt
    }
  }
`

export const ADD_POST = gql`
  mutation addPost($title: String!, $content: String, $image: String,  ) {
    addPost(post: {title: $title, content: $content, image: $image}) {
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

export const UPDATE_POST = gql`
  mutation updatePost($id: Int!, $title: String!, $content: String, $image: String,) {
    updatePost(post: {id: $id, title: $title, content: $content, image: $image}) {
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

export const REGISTER = gql`
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`

export const AUTHENTICATE = gql`
  mutation authenticate($email: String!, $password: String!) {
    authenticate(email: $email, password:$password)
  }
`
