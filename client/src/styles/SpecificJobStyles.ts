import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { size } from '../DefaultValues/HardCoded';

export const Container = styled.div`
  width: 75%;
  margin: 2.3rem auto;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${size.tablet}) {
    flex-direction: column-reverse;
  }

  @media (max-width: ${size.tablet}) {
    width: 95%;
  }
`;
export const MainSectionColumn = styled.div`
  width: 65%;
  & > div {
    border: 1px solid ${(props) => props.theme.colors.lightGray};
  }
  & > div + div {
    border-top: none;
  }

  @media (max-width: ${size.tablet}) {
    width: 100%;
  }
`;
export const SecondaryColumn = styled.section`
  width: 33%;
  position: sticky;
  height: 2vh;
  top: clamp(15vh, calc(16vh+5rem), 17vh);
  z-index: 1;

  & > div {
    border: 1px solid ${(props) => props.theme.colors.lightGray};
  }
  & > div + div {
    border-top: none;
  }
  @media (max-width: ${size.tablet}) {
    width: 100%;
    position: inherit;
    height: unset;
    margin-bottom: 2vh;
  }
`;
export const TitleWithLogo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
export const Logo = styled.img`
  margin-left: 0.8rem;
  height: 125px;
  width: 125px;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
`;
export const InfoSection = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;
export const Info = styled.span`
  padding: 0.4rem;
`;
export const Title = styled.h1`
  padding: 0.4rem;

  @media (max-width: ${size.mobile}) {
    font-size: 1.5rem;
  }
`;
export const Description = styled.div`
  padding: 1.5rem;
  color: ${(props) => props.theme.colors.secondaryFont};
  font-size: 1.1rem;
  line-height: 1.4rem;
  text-align: justify;

  @media (max-width: ${size.mobile}) {
    padding: 1rem;
  }
`;
export const Label = styled.h3`
  padding: 0.4rem 0 0.8rem 0;
  color: ${(props) => props.theme.colors.darkish};
`;
export const SkillsContainer = styled.div`
  padding: 1.5rem;
`;
export const GridContainer = styled.div`
  font-size: 1rem;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: 0.2rem 0;
  gap: 1.2rem;

  @media (max-width: ${size.tablet}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: ${size.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
export const ExtraSkillsGrid = styled.div`
  font-size: 1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 0.2rem 0;
  gap: 1.2rem;

  @media (max-width: ${size.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
export const Element = styled.span`
  padding: 0.2rem;
  border: 2px solid ${(props) => props.theme.colors.secondaryFont};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
export const DailyTasks = styled.div`
  padding: 1.5rem;
`;
export const TaskContainer = styled.span`
  display: flex;
  align-items: center;
  padding: 0.8rem 0;
`;
export const Circle = styled.span`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 0.8rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.button};
  color: ${(props) => props.theme.colors.button};

  @media (max-width: ${size.mobile}) {
    width: 20px;
    height: 20px;
  }
`;
export const Task = styled.span`
  font-size: 1rem;
  padding: 0.8rem;
  color: ${(props) => props.theme.colors.darkish};
`;
export const BenefitGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: ${size.tablet}) {
    display: flex;
    flex-direction: column;
  }
`;
export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.darkish};
`;
export const Icon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.colors.secondaryFont};
  font-size: 1.6rem;
`;
export const Image = styled.img`
  width: 100%;

  @media (max-width: ${size.tablet}) {
    width: 50%;
  }

  @media (max-width: ${size.mobile}) {
    width: 100%;
  }
`;
export const AboutCompanyContainer = styled.div`
  padding: 1.5rem;

  @media (max-width: ${size.tablet}) {
    padding: 1rem;
  }
`;
export const ComapnyInfoIconContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.secondaryFont};
  padding: 0.4rem 0;
`;
export const CompanyInfoIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.colors.secondaryFont};
`;
export const OnlineRecrutationField = styled.div`
  width: 100%;
  padding: 1.5rem;
`;
export const PaddedDiv = styled.div`
  padding: 1.5rem;
`;
export const Salary = styled.h2`
  color: ${(props) => props.theme.colors.darkish};
`;
export const StyledParagraph = styled.p`
  color: ${(props) => props.theme.colors.fontColor};
  padding: 0.4rem 0;
`;
export const ApplyButton = styled.div`
  padding: 0.8rem 0;
  width: 95%;
  color: white;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.button};
  border: none;
  font-size: 1.3rem;
  text-align: center;
`;
