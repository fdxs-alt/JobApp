import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Container = styled.div`
  width: 75%;
  margin: 2.3rem auto;
  display: flex;
  justify-content: space-between;
`;
export const MainSectionColumn = styled.div`
  width: 65%;
  & > div {
    border: 1px solid ${(props) => props.theme.colors.lightGray};
  }
  & > div + div {
    border-top: none;
  }
`;
export const SecondaryColumn = styled.section`
  width: 33%;
  position: sticky;
  height: 20vh;
  top: 40px;

  & > div {
    border: 1px solid ${(props) => props.theme.colors.lightGray};
  }
  & > div + div {
    border-top: none;
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
`;
export const Description = styled.div`
  padding: 1.5rem;
  color: ${(props) => props.theme.colors.secondaryFont};
  font-size: 1.1rem;
  line-height: 1.4rem;
  text-align: justify;
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
`;
export const ExtraSkillsGrid = styled.div`
  font-size: 1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 0.2rem 0;
  gap: 1.2rem;
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
`;
export const AboutCompanyContainer = styled.div`
  padding: 1.5rem;
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
