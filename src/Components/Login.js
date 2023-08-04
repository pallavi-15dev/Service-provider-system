import React, { useState } from 'react';

import firebase from '../firebase';
import { Button, Form, Input, Card, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';


const Login = (event, props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();
    const [form] = Form.useForm();

    const handleSignIn = (email, password) => {
        console.log('Email:', email);
        console.log('Password:', password);

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                if (email === 'admin@gmail.com') {
                    navigate('/tab');
                }
                else
                    navigate('/electrician-details');

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    };
    const onFinish = async (values) => {

        const { email, password } = values;

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            navigate('/dashboard');
        } catch (error) {
            console.error("Login Failed", error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const emailRules = [
        {
            required: true,
            message: 'Please enter your username',
        },
        {
            type: 'email',
            message: 'Please enter a valid email',
        },

    ];

    const passwordRules = [
        {
            required: true,
            message: 'Please enter your username',
        },
        {
            min: 6,
            message: 'Password must be at least 6 characters long',
        },

    ];
    return (
        <Space direction="vertical" size={16}>
            <Card

                style={{
                    width: 500,
                }}
            >


                <h1>Login</h1>

                <Form
                    name="basic"
                    labelCol={{
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 86,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={emailRules}
                    >
                        <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={passwordRules}
                    >
                        <Input value={password} onChange={(event) => setPassword(event.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" className="login-form-button" onClick={() => handleSignIn(email, password)}>
                            LOGIN
                        </Button>
                        <br /><br />

                        <Link to="/service-provider">New-Service Provider? Register Now!!!</Link>
                    </Form.Item>
                </Form>
            </Card>

        </Space>
    );
};
export default Login;