import React from 'react';
import {Button, Form, Input} from 'antd';
import { useAuthContext } from '../../context/AuthContext';


const LandingPageLogIn: React.FC = () => {
    
    const [form] = Form.useForm();

    const {logInUser, fetching} = useAuthContext();

    return(
        <div>
            <Form
                name="loginForm"
                initialValues={{remember: true}}
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
                    <Button type="primary" htmlType="submit" style={{backgroundColor: "#659e38", border: "none"}} loading={fetching} onClick={() => {
                        form
                            .validateFields()
                            .then((values: {[key: string] : string}) => {
                                logInUser(values.username, values.password);
                            })
                            .catch((info) => {
                                console.log("Login failed", info);
                            })
                        }}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default LandingPageLogIn;