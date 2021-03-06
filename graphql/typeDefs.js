const gql = require('graphql-tag');

module.exports = gql`
    type Like{
        id: ID!
        username: String!
        createdAt: String!
    }
    type Post{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        likes: [Like]!
        likeCount: Int!
    }
    type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query{
        getPosts: [Post]
        getPost(postId: ID!): Post
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        likePost(postId: ID!): Post!
    }
    type Subscription{
        newPost: Post!
    }
`;
