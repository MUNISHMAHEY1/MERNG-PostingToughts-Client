import React, { useState, useContext } from 'react'
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../context/AuthContext';

function Register(props) {
    const context = useContext(AuthContext);
    const [ errors, setErrors ] = useState({});
    const [ values, setValues ] = useState({
        username: '', 
        email: '',
        password: '',
        confirmPassword: ''
    })

    const onChangeHanlder = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const [ addUser, { loading} ] = useMutation(REGISTER_USER, {
        update(proxy, result){
            context.login(result.data.register); // can also destructure data from result like { data: {register: userData}}
            props.history.push('/');
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })

    const onsubmitHandler = (event) => {
        event.preventDefault();
        addUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onsubmitHandler} noValidate className={loading ? "loading" : ''}>
                <h1>Register</h1>
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
                    label="Email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    error={errors.email ? true : false}
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
                <Form.Input
                    className="form-input"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChangeHanlder}
                />
                <Button type="submit" primary>
                    Register
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

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id email username createdAt token
        }
    }
`;

export default Register
 