import React from 'react';
import {useQuery} from '@apollo/client';
import gql from 'graphql-tag';
import {Grid} from 'semantic-ui-react';

import PostCard from '../components/PostCard';

function Home(){
    const {loading, data} = useQuery(FETCH_POSTS_QUERY);
    //const {loading, data: {getPosts: posts}} = useQuery(FETCH_POSTS_QUERY);
    const posts = data ? data.getPosts : undefined;
    return (
            <Grid columns = {3}>
                <Grid.Row>
                    <h1>Recent Posts</h1>
                </Grid.Row>
                <Grid.Row>
                    {loading? (
                        <h1>Loading...</h1>
                    ) : (
                        posts && posts.map((post) =>
                        <Grid.Column key = {post.id} style={{marginBottom:20}}>
                            <PostCard post={post}/>
                        </Grid.Column>)
                    ) }
                </Grid.Row>
            </Grid>
    )
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
            id
            username
            body
            likeCount
            likes{
                username
            }
        }
    }
`

export default Home;