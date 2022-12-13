import { StyledTitle } from "./LandingPageOverview";
import { EmphasisedText } from "./LandingPageHome";
import { Button, Form, Input } from "antd";
import { ICredentials, useAuthContext } from "../../context/AuthContext";


const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 8}
}



export const LandingPageSignUp: React.FC = () => {

  const [form] = Form.useForm();

  const {fetching, registerUser} = useAuthContext();

  const onFinish = (values: ICredentials) => {
    console.log(values);
    registerUser(values);
  }

  return (
    <div>
      <StyledTitle>
        Create your own <EmphasisedText>plant kingdom</EmphasisedText>, right
        now!
      </StyledTitle>
      <Form {...layout} form={form} name="signup-form" onFinish={onFinish}>
        <Form.Item name="email" label="Email address" rules={[{required: true}]}>
          <Input type={"email"}/>
        </Form.Item>
        <Form.Item name="username" label="username" rules={[{required: true}]}>
          <Input type={"text"}/>
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{required: true}]}>
          <Input type={"password"}/>
        </Form.Item>
        <Button htmlType="submit" type="primary" style={{backgroundColor: "#659e38", border: "none"}}loading={fetching}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
