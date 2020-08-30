import React, { useState } from 'react';
import { Container, ModalContainer, OpenButton } from '../styles/ModalStyles';
import Modal from './Modal';

const FilterComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  return (
    <Container>
      {isOpen && (
        <ModalContainer>
          <Modal closeModal={closeModal} />
        </ModalContainer>
      )}
      <OpenButton onClick={() => setIsOpen(true)}>Filter</OpenButton>
    </Container>
  );
};

export default FilterComponent;
