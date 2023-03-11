import { StyledTitle } from "./LandingPageOverview";
import { EmphasisedText } from "./LandingPageHome";
import { Button, Form, Input, message } from "antd";
import {
    IRegisterCredentials,
    useRegister,
} from "../../hooks/auth/useRegister";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};

export const LandingPageSignUp: React.FC = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const registerUser = useRegister(messageApi);

    const onFinish = (values: IRegisterCredentials) => {
        registerUser.mutate(values);
    };

    return (
        <div>
            {contextHolder}
            <StyledTitle>
                Create your own <EmphasisedText>plant kingdom</EmphasisedText>,
                right now!
            </StyledTitle>
            <Form
                {...layout}
                form={form}
                name="signup-form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    label="Email address"
                    rules={[{ required: true }]}
                >
                    <Input type={"email"} />
                </Form.Item>
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true }]}
                >
                    <Input type={"text"} />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true }]}
                >
                    <Input type={"password"} />
                </Form.Item>
                <Button
                    htmlType="submit"
                    type="primary"
                    style={{ backgroundColor: "#659e38", border: "none" }}
                    loading={registerUser.isLoading}
                >
                    Submit
                </Button>
            </Form>
        </div>
    );
};
