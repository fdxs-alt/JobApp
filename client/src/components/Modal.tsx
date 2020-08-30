import React, { useRef } from 'react';
import {
  ModalTitle,
  CloseButton,
  ModalInputsWrapper,
  InputWrapper,
  ModalLabel,
  ModalInput,
  ModalContent,
} from '../styles/ModalStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import useOutsideClick from '../utils/ClickOutSide';
import { Button } from '../styles/Register';
import { useHistory } from 'react-router-dom';
type InputType = {
  localisation: string;
  main: string;
  minSalary: number;
  title: string;
};

type Props = {
  closeModal: () => void;
};

const Modal: React.FC<Props> = ({ closeModal }) => {
  const { register, reset, handleSubmit } = useForm<InputType>();

  const history = useHistory();

  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => {
    closeModal();
  });

  const onSubmit = ({ localisation, main, minSalary, title }: InputType) => {
    reset();
    history.push(
      `/specificjob/criteria?localisation=${localisation}&main=${main}&minSalary=${minSalary}&title=${title}`,
    );
  };
  return (
    <ModalContent ref={ref} onSubmit={handleSubmit(onSubmit)}>
      <span
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 0.4rem',
        }}
      >
        <ModalTitle>Filter and find ideal job offer!</ModalTitle>
        <CloseButton>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => closeModal()}
            style={{ cursor: 'pointer' }}
          />
        </CloseButton>
      </span>

      <ModalInputsWrapper>
        <InputWrapper>
          <ModalLabel>Title</ModalLabel>
          <ModalInput type="text" name="title" ref={register} />
        </InputWrapper>
        <InputWrapper>
          <ModalLabel>Main Technology</ModalLabel>
          <ModalInput type="text" name="main" ref={register} />
        </InputWrapper>
        <InputWrapper>
          <ModalLabel>Min. Salary</ModalLabel>
          <ModalInput type="number" name="minSalary" ref={register} />
        </InputWrapper>
        <InputWrapper>
          <ModalLabel>Localisation</ModalLabel>
          <ModalInput type="text" name="localisation" ref={register} />
        </InputWrapper>
        <Button type="submit">Search</Button>
      </ModalInputsWrapper>
    </ModalContent>
  );
};

export default Modal;
