import React from 'react';
import {
  Confirmation,
  ButtonContainer,
  Button,
} from '../../styles/ImagesGallery';
import { Title } from '../../styles/CompanyProfileStyle';

interface Props {
  title: string;
  deleteText: string;
  confirmationText: string;
  handleClick: (close: () => void, imageId?: number) => void;
  onClose: () => void;
  id?: number;
}
const ConfirmationModal: React.FC<Props> = ({
  title,
  confirmationText,
  deleteText,
  handleClick,
  onClose,
  id,
}) => {
  return (
    <div>
      <Title>{title}</Title>
      <Confirmation>{confirmationText}</Confirmation>
      <ButtonContainer>
        <Button onClick={onClose}>No</Button>
        <Button
          onClick={() => {
            if (id) {
              handleClick(onClose, id);
            } else {
              handleClick(onClose);
            }
          }}
        >
          {deleteText}
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default ConfirmationModal;
