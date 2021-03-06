import React, { useState, useContext } from 'react'
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../context/AuthContext';
function Login(props) {
    const context = useContext(AuthContext);
    const [ errors, setErrors ] = useState({});
    const [ values, setValues ] = useState({
        username: '', 
        password: ''
    })

    const onChangeHanlder = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const [ loginUser, { loading} ] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData}}){ 
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
          },
        variables: values
    })

    const onsubmitHandler = (event) => {
        event.preventDefault();
        loginUser();
    }

    return (
        <div className="form-container" id="login-page">
            <Form onSubmit={onsubmitHandler} noValidate className={loading ? "loading" : ''}>
                <h1>Login</h1>
                <Form.Input
                    className="form-input"
                    label="Username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChangeHanlder}
                />
                <Form.Input
                    className="form-input"
                    label="Password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChangeHanlder}
                />
                <Button type="submit" primary>
                    LOGIN
                </Button>
                
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    )
}

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login( username: $username
               password: $password
        ) {
            id email username createdAt token
        }
    }
`;

export default Login;
 