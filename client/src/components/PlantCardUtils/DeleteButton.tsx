import { Button, Modal, message } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { useDeletePlant } from "../../hooks/plants/useDeletePlant";

const StyledButton = styled(Button)`
    position: absolute;
    border: none;
    border-radius: 30% 0px 0px 0px;
    color: black;
    &:focus {
        color: black;
    }
    &:hover {
        background-color: #f24c4c;
        color: white;
    }
`;

export const DeleteButton: React.FC<{ id: number }> = ({ id }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const deletePlant = useDeletePlant(messageApi);
    const showModal = () => {
        setVisible(true);
    };
    const handleClick = () => {
        showModal();
    };

    const onCancel = () => {
        setVisible(false);
    };

    const onOk = () => {
        deletePlant.mutate(id);
        setVisible(false);
    };

    return (
        <>
            {contextHolder}
            <StyledButton onClick={handleClick}>X</StyledButton>
            <Modal
                title="Delete"
                visible={visible}
                onCancel={onCancel}
                onOk={onOk}
            >
                Do you really want to delete your plant? This action is
                irreversible.
            </Modal>
        </>
    );
};
