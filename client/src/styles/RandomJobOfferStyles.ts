import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { size } from '../DefaultValues/HardCoded';
export const TitleAndCompanyColumn = styled.div`
  display: flex;
  width: 60%;
  align-items: center;
  @media (max-width: ${size.tablet}) {
    width: 50%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    overflow: hidden;
  }

  @media (max-width: ${size.mobile}) {
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: row;
  }
`;
export const LocalisationColumn = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: ${size.mobile}) {
    width: 100%;
    justify-content: center;
  }
`;
export const OfferTitle = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.darkish};
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0 0.4rem;
  &:hover {
    color: red;
  }

  @media (max-width: ${size.mobile}) {
    font-size: 0.9rem;
  }
`;
export const CompanyInfo = styled.span`
  color: ${(props) => props.theme.colors.secondaryFont};
  font-size: 0.9rem;
  padding: 0 0.4rem;
`;
export const Icon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;

  @media (max-width: ${size.mobile}) {
    display: none;
  }
`;
export const LocalisationInfo = styled.span`
  padding: 0.4rem;
  @media (max-width: ${size.mobile}) {
    padding: 0;
    font-size: 0.9rem;
  }
`;
