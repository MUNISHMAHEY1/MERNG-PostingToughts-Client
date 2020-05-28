import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { FETCH_POSTS_QUERY } from '../util/graphql';

function PostForm() {
    const [ errors, setErrors ] = useState('')
    const [ values, setValues ] = useState({
        body: ''
    })

    const onChangeHanlder = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
        
        update(proxy, result) {
            const data = proxy.readQuery({
              query: FETCH_POSTS_QUERY
            });
            data.getPosts = [result.data.createPost, ...data.getPosts];
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
            values.body = '';
        },
        variables: values,
        onError(err) {
            setErrors(err.graphQLErrors[0].message);
        }

    });

    const onsubmitHandler = (event) => {
        event.preventDefault();
        createPost();
    }

    return(
        <div>
            <Form onSubmit={onsubmitHandler} className={loading ? "loading" : ''}>
                <h1>Create a new post</h1>
                <Form.Input
                    placeholder="Hi World!"
                    name="body"
                    value={values.body}
                    error={errors ? true : false}
                    onChange={onChangeHanlder}
                />
                <Button type="submit" color="teal">
                    Submit
                </Button>
            </Form>

            {errors && (
                <div className="ui error message" style={{marginBottom:"1.5rem"}}>
                    <ul className="list">
                        <li>{errors}</li>
                    </ul>
                </div>
            )}
        </div>
    )
} 

const CREATE_POST_MUTATION= gql`
    mutation createPost( 
        $body: String!
        ){
        createPost(
            body: $body
            ){
            id body createdAt username
            likes{
                id username createdAt
            }
            likeCount
            comments{
                id body createdAt username
            }
            commentCount
        }
    }
`;

export default PostForm;