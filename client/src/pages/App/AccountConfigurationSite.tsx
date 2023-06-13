import { message, Form, Input, InputNumber, Button } from "antd";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { API, AuthKeys, PlantKeys, UserKeys } from "../../services/api";
import styled from "styled-components";

interface ChangePasswordFormValues {
    oldPassword: string;
    newPassword: string;
    newPasswordRepeated: string;
}
const ChangePasswordFormContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 25%;
    gap: 2rem;
`;

const ChangePasswordForm = styled(Form<ChangePasswordFormValues>)`
    width: 65%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const AccountConfigurationSite: React.FC = () => {
    const { user } = useAuthContext();
    const [api, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onFinish = (values: ChangePasswordFormValues) => {
        if (values.newPassword !== values.newPasswordRepeated) {
            api.error("You provided two different passwords!");
            return;
        }
        setIsLoading(true);
        const changePasswordPayload = {
            id: user?.id,
            password: values.oldPassword,
            newPassword: values.newPassword,
        };
        try {
            API.update(UserKeys.BASE, changePasswordPayload);
            api.success("Password changed successfully");
        } catch (error) {
            api.error("Sorry, something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            {contextHolder}
            <ChangePasswordFormContainer>
                <h1>Change your password</h1>
                <ChangePasswordForm onFinish={onFinish}>
                    <Form.Item name="oldPassword" label="Current password">
                        <Input
                            placeholder="Your current password"
                            type="password"
                        />
                    </Form.Item>
                    <Form.Item name="newPassword" label="New Password">
                        <Input
                            placeholder="Your new password"
                            type="password"
                        />
                    </Form.Item>
                    <Form.Item name="newPasswordRepeated" label="Confirm">
                        <Input
                            placeholder="Confirm new password"
                            type="password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                        >
                            Change your password
                        </Button>
                    </Form.Item>
                </ChangePasswordForm>
            </ChangePasswordFormContainer>
        </>
    );
};
