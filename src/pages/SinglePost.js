import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import avatar from '../images/avatar.png';
import moment from 'moment';
import { AuthContext } from '../context/AuthContext';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import { Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
 
function SinglePost(props){
    const postId = props.match.params.postId; // get postId from url 
    const { user } = useContext(AuthContext);
    const [ comment, setComment] = useState('');
    const commentInputRef = useRef(null);

    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
          postId
        }
      });
    
    const [ submitComment ] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update(){
            setComment('');
            commentInputRef.current.blur();
        },
        variables:{
            postId,
            body: comment
        }
    })
      
    function deletePostCallback(){
        props.history.push('/');
    } 

    let postMarkup;
    if(!data){
        postMarkup = <p>Loading post...</p>
    } else {
        const { 
            id, 
            body, 
            createdAt, 
            username, 
            comments, 
            likes, 
            likeCount, 
            commentCount
        } = data.getPost;
        
        postMarkup = (
            <div className="ui grid">
                <div className="row">
                    <div className="three wide column" 
                        data-tooltip={user.username} 
                        data-position="top right" 
                        data-inverted=""
                        >
                        <img className="right floated mini ui image" 
                            src={avatar} 
                            alt="avatar" 
                            float="right"
                            style={{width:"12rem"}} 
                            />
                    </div>
                    <div className="twelve wide column" width={10}>
                        <div className="ui cards">
                            <div className="ui fluid card">
                                <div className="content">
                                    <div className="header">
                                        {username}
                                    </div>
                                    <div className="meta" >
                                        {moment(createdAt).fromNow()}
                                    </div>
                                    <div className="description">
                                        {body}
                                    </div>
                                    <hr/>
                                    <div className="extra content">
                                        <LikeButton user={user} post={{ id, likeCount, likes }} />
                                        { !user ? (
                                           <Link to="/login">
                                            <div className="ui labeled button" 
                                                data-tooltip="Add a Comment Below" 
                                                data-inverted="">
                                                <div className="ui blue button basic">
                                                    <i className="comments icon"></i>
                                                </div>
                                                <div className="ui basic blue left pointing label">
                                                    {commentCount}
                                                </div>
                                            </div>
                                        </Link> 
                                        ) : (
                                            <div className="ui labeled button" 
                                            data-tooltip="Add a Comment Below" 
                                            data-inverted="">
                                                <div className="ui blue button basic">
                                                    <i className="comments icon"></i>
                                                </div>
                                                <div className="ui basic blue left pointing label">
                                                    {commentCount}
                                                </div>
                                            </div> 
                                        )}
                                        {user && user.username === username && (
                                            <DeleteButton postId={id} callback={deletePostCallback}/>
                                        )}
                                    </div>
                                </div>    
                            </div>

                            {user && (
                                <div className="ui fluid card">
                                    <div className="content">
                                        <p>Add a Comment</p>
                                        <Form>
                                            <div className="ui action input fluid">
                                                <input 
                                                    type="text"
                                                    placeholder="Comment.."
                                                    name="comment"
                                                    value={comment}
                                                    onChange={ event => setComment(event.target.value)}
                                                    ref={commentInputRef}
                                                    />
                                                <button 
                                                    type="submit"
                                                    className="ui button teal"
                                                    disabled={comment.trim() === ''}
                                                    onClick={submitComment}
                                                    > Submit </button>            
                                            </div>
                                        </Form>
                                    </div>    
                                </div>
                            )}
                            {comments.map((comment) => (
                                <div className="ui fluid card" key={comment.id}>
                                    <div className="content">
                                        { user && user.username === comment.username && (
                                            <DeleteButton postId={id} commentId={comment.id}/>
                                        )}
                                        <div className="header">
                                            {comment.username}
                                        </div>
                                        <div className="meta">
                                            {moment(comment.createdAt).fromNow()}
                                        </div>
                                        <div className="description">
                                            {comment.body}
                                        </div>
                                    </div>
                                </div>

                            ))}    
                        </div>
                    </div>
                </div>
            </div>
        );
    
    }
    return postMarkup;

}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
    	comments{
        id
        createdAt
        username
        body
      }
    }
  }
`;

const SUBMIT_COMMENT_MUTATION = gql`
    mutation($postId: ID!, $body: String!){
        createComment(postId: $postId, body: $body){
            id
            comments{
                id
                body
                username
                createdAt
            }
            commentCount
        }
    }
`;

export default SinglePost;