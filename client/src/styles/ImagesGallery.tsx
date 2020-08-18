import styled from 'styled-components';
export const Image = styled.img`
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
`;
export const ImageInputContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: #00e676;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;
export const GridContainer = styled.div`
  font-size: 1rem;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
`;
export const Title = styled.h1`
  font-size: 2.5rem;
  padding: 0.8rem;
`;
export const Confirmation = styled.p`
  font-size: 1.2rem;
  padding: 0.8rem;
`;
export const Button = styled.button`
  width: 40%;
  color: white;
  background-color: black;
  border-radius: 1.2rem;
  padding: 0.8rem 1.4rem;
  font-size: 0.9rem;
  border: none;
`;
export const ButtonContainer = styled.div`
  padding: 0.8rem;
  display: flex;
  width: 90%;
  border: none;
  background-color: white;
  justify-content: space-around;
`;
