import styled from 'styled-components';
import { size } from '../DefaultValues/HardCoded';

export const Container = styled.div`
  width: 95%;
  padding: 0.3rem;
  margin: auto;
  display: grid;
  background-color: ${(props) => props.theme.colors.border};
  grid-template-columns: 0.7fr 1fr;
  align-items: center;
  &:last-child {
    grid-column: 1/3;
  }
  @media (max-width: ${size.laptop}) {
    display: flex;
    flex-direction: column;
    padding: 0;
  }
`;
export const Wrapper = styled.div`
  padding: 2rem 0;
`;
interface InputProps {
  readonly width?: number;
  readonly height?: number;
}
export const Input = styled.input<InputProps>`
  width: ${(props) => (props.width ? props.width + '%' : '30%')};
  height: ${(props) => (props.height ? props.height + 'vh' : '50px')};
  padding: 0.8rem 0.6rem;
  font-size: 1rem;

  border: 3px solid ${(props) => props.theme.colors.border2};
  &::placeholder {
    color: ${(props) => props.theme.colors.fontColor};
  }
`;
export const TextArea = styled.textarea<InputProps>`
  width: ${(props) => (props.width ? props.width + '%' : '30%')};
  padding: 0.8rem 0.6rem;
  font-family: inherit;
  font-size: 1rem;
  margin-bottom: 0.8rem;
  margin-top: 0.2rem;
  border: 3px solid ${(props) => props.theme.colors.border2};
  resize: none;
`;
export const Column = styled.div`
  width: 90%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const GridWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.2rem;
  padding: 0.4rem;
  @media (max-width: ${size.laptop}) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0.4rem 0;
  }
`;

export const Button = styled.button`
  grid-column: 1/3;
  width: 30%;
  justify-self: center;
  background-color: ${(props) => props.theme.colors.button};
  font-size: 1.2rem;
  padding: 0.6rem;
  border: 1px solid white;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1.2rem;
  @media (max-width: ${size.tablet}) {
    width: 70%;
  }
`;

export const AddButton = styled.button`
  width: 20%;
  background-color: ${(props) => props.theme.colors.button};
  border: 1px solid white;
  color: white;
  cursor: pointer;
  padding: 0.8rem 0.6rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 5%;
  border: 3px solid ${(props) => props.theme.colors.border2};
  @media (max-width: ${size.tablet}) {
    margin-top: 0.5vh;
    width: 40%;
  }

  @media (max-width: ${size.mobile}) {
    margin-top: 0.5vh;
    width: 60%;
  }
`;
export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: ${size.tablet}) {
    display: flex;
    flex-direction: column;
  }
`;
