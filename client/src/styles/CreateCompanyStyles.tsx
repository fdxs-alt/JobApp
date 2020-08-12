import styled from 'styled-components';

export const Container = styled.form`
  width: 95%;
  padding: 2rem;
  margin: auto;
  display: grid;
  background-color: ${(props) => props.theme.colors.border};
  grid-template-columns: 0.4fr 1fr;
  align-items: center;
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
  margin-bottom: 0.8rem;
  margin-top: 0.2rem;
  border: 3px solid ${(props) => props.theme.colors.border2};
  &::placeholder {
    color: ${(props) => props.theme.colors.fontColor};
  }
`;
export const Column = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const GridWrapper = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.2rem;
`;
export const AddOwn = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.button};
  font-size: 0.9rem;
  padding: 0.3rem 0.6rem;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  color: white;
  cursor: pointer;
`;
export const Button = styled.button`
  grid-column: 1/3;
  width: 20%;
  justify-self: center;
  background-color: ${(props) => props.theme.colors.button};
  font-size: 1.2rem;
  padding: 0.6rem;
  border: 1px solid white;
  color: white;
  cursor: pointer;
`;
