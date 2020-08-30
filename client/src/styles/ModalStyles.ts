import styled, { keyframes } from 'styled-components';
export const Container = styled.div`
  width: 85%;
  margin: 1.4rem auto;
`;
export const OpenButton = styled.button`
  padding: 0.6rem 1rem;
  color: ${(props) => props.theme.colors.darkish};
  border: 3px solid ${(props) => props.theme.colors.lightGray};
  background-color: white;
  font-size: 1.2rem;
`;
const fadeIn = keyframes`
  from {
    background: rgba(0, 0, 0, 0.0);
  }
  to {
    background: rgba(0, 0, 0, 0.4);
  } 
`;
export const ModalContainer = styled.div`
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.5s;
`;
export const ModalContent = styled.div`
  width: 40%;
  padding: 1rem;
  background-color: white;
`;
export const ModalTitle = styled.p`
  color: ${(props) => props.theme.colors.darkish};
  font-size: 1.3rem;
  font-weight: 500;
  padding: 0.8rem 0;
`;

export const ModalInputsWrapper = styled.form`
  padding: 0.4rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0.4rem;
`;
export const ModalLabel = styled.label`
  color: ${(props) => props.theme.colors.secondaryFont};
  font-size: 1rem;
  padding: 0.4rem;
`;
export const ModalInput = styled.input`
  width: 90%;
  padding: 0.4rem;
  border: 2px solid ${(props) => props.theme.colors.secondaryFont};
  color: ${(props) => props.theme.colors.secondaryFont};
  background-color: white;
  font-size: 1rem;
`;
export const CloseButton = styled.button`
  display: block;
  border: none;
  color: ${(props) => props.theme.colors.darkish};
  background-color: white;
  font-size: 1.5rem;
  &:focus {
    outline: none;
    color: red;
  }
  &:hover {
    color: red;
  }
`;
