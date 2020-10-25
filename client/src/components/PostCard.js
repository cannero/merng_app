import React from 'react';
import {Button, Card, Icon, Label} from 'semantic-ui-react';

function PostCard({post:{username, body, likeCount}}){
    
    const LikePost = () =>{

        }
    return(
        <Card fluid>
            <Card.Content>
            <Card.Header>
            {username}
            </Card.Header>
            <Card.Description>
            {body}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as='div' labelPosition='right'>
            <Button basic color='teal' onClick= {LikePost}>
                <Icon name='heart'/>
            </Button>
            <Label color='teal' pointing='left'>
                {likeCount}
            </Label>
            </Button>
            </Card.Content>
        </Card>
    )
}

export default PostCard;