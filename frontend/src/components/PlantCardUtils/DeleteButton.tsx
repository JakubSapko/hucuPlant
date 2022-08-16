import { Button, Modal } from "antd";
import { useState } from "react";
import styled from "styled-components";

const StyledButton = styled(Button)`
  border: none;
  color: black;
  &:focus {
    color: black;
  }
  &:hover {
    border-radius: 5px;
    background-color: #f24c4c;
    color: white;
  }
`;

export const DeleteButton: React.FC = () => {

    const [visible, setVisible] = useState<boolean>(false);
    const showModal = () => {
        setVisible(true);
    }
  const handleClick = () => {
      showModal();
  };

  return <>
  <StyledButton onClick={handleClick}>X</StyledButton>
  <Modal title="Delete" visible={visible}>
      Do you really want to delete your plant?
      This action is irreversible.
  </Modal>
  </>
};
