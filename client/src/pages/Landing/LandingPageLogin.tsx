import React from "react";
import { Button, Form, Input, message } from "antd";
import { ILoginCredentials, useLogin } from "../../hooks/auth/useLogin";
import { FormInstance } from "rc-field-form";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LandingPageLogIn: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const loginUser = useLogin(messageApi);

    const { user } = useAuthContext();
    const navigate = useNavigate();
    
    if (user) {
        navigate('/home');
    }

    const handleLogin = async (
        form: FormInstance
    ) => {
        try {
            const loginCredentials: ILoginCredentials = await form.validateFields();
            await loginUser.mutate(loginCredentials);
        } catch (error) {
            messageApi.error(`An error ${error} occured.`);
        }
    };
    return (
        <div>
            {contextHolder}
            <Form
                name="loginForm"
                initialValues={{ remember: true }}
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please input your email!" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ backgroundColor: "#659e38", border: "none" }}
                        loading={loginUser.isLoading}
                        onClick={() => handleLogin(form)}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LandingPageLogIn;
