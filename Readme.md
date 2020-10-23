# Source
[React / GraphQL Course - Build a social media app (MERNG Stack)](https://www.youtube.com/watch?v=n1mdAPFq2Os)

[github hidjou classsed-graphql-mern-apollo ](https://github.com/hidjou/classsed-graphql-mern-apollo/tree/master)

# How to use
## set up mongodb
- create cluster with mongoDB Atlas
- add new user, save id/pwd in .env
- allow all IP addresses to connect
- create new db 'merng'
- create collections 'posts'
## set up docker
`rake setup`
## run container
`rake`
## start apollo server
`node index`
## create react app
npx create-react-app client
# Todo
- move react node\_module to docker volume
- https://code.visualstudio.com/docs/remote/containers

