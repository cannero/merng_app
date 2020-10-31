import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Icon, Label } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { AuthContext } from '../context/auth';

function PostCard({ post: { id, username, body, likeCount, likes } }) {
    const context = useContext(AuthContext);

    const [liked, setLiked] = useState(false);
    const user = context.user;
    useEffect(() => {
        if (user && likes.find((like) => like.username === user.username)) {
            setLiked(true);
        } else setLiked(false);
        return ()=> console.log('unmount', id)
    }, [user, likes, id]);

    const [likePost] = useMutation(LIKE_POST,
        {
            update(proxy, result) {
                setLiked(!liked);
                console.log(result);
            },
            onError(err) {
                console.log(err);
            },
            variables: { postId: id }
        });
    const likePostClicked = () => {
        if (!context.user) {
            return;
        }
        likePost();
    }

    const theButton = user ? (
        liked ? (
            <Button color='teal'>
                <Icon name='heart outline' />
            </Button>) :
            (<Button basic color='teal'>
                <Icon name='heart' />
            </Button>)) :
        (<Button basic color='teal'>
            <Icon name='fork' />
        </Button>);

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {username} - {id}
                </Card.Header>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as='div' labelPosition='right' onClick={likePostClicked}>
                    {theButton}
                    <Label color='teal' pointing='left'>
                        {likeCount}
                    </Label>
                </Button>
            </Card.Content>
        </Card>
    )
}

const LIKE_POST = gql`
    mutation likePost(
        $postId: ID!
    ){
        likePost(
            postId: $postId
            ){
                id
                likeCount
            }
    }
`;

export default PostCard;