import React from 'react';
import {Button, Form, Input} from 'antd';
import { useAuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import HomePage from './HomePage';


const LoginPage: React.FC = () => {
    
    const [form] = Form.useForm();

    const {logInUser} = useAuthContext();
    
    const onFinish = () => {
        console.log("Success");
    }

    const onFinishFailed = () => {
        console.log("Failed");
    }

    return(
        <div>
            <Link to={"/home"}>do home</Link>
            <Form
                name="loginForm"
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{required: true, message: "Please input your username!"}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: "Please input your password!"}]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={logInUser}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default LoginPage;