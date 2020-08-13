import React, { useContext } from 'react';
import Navbars from '../../components/Navbars';
import {
  Container,
  Wrapper,
  Column,
  Input,
} from '../../styles/CreateCompanyStyles';
import { InputLabel, Error } from '../../styles/LoginPageStyles';
import { JobOfferContext } from '../../context/JobOfferProvider';
import { Checkbox } from '../../styles/Register';
import BenefitsInput from '../../components/inputs/BenefitsInput';
import ExtraSkillsInput from '../../components/inputs/ExtraSkillsInput';
import MandatoryInput from '../../components/inputs/MandatoryInput';
import TasksInput from '../../components/inputs/TasksInput';
const CreateJobOffer = () => {
  const { state, dispatch } = useContext(JobOfferContext);

  return (
    <>
      <Navbars />

      <Wrapper>
        <Container>
          <Column>
            <InputLabel htmlFor="Name of Company" width={90}>
              Title of a offer
            </InputLabel>
            <Input name="companyName" width={90} type="text" />

            <InputLabel htmlFor="Minimum salary" width={90}>
              Minimum Salary
            </InputLabel>
            <Input name="minSalary" width={90} type="number" min={0} />

            <InputLabel htmlFor="Maximum salary" width={90}>
              Maximum salary
            </InputLabel>
            <Input name="maxSalary" width={90} type="number" min={0} />

            <InputLabel htmlFor="Online Recrutation" width={90}>
              Online recrutation?
              <Checkbox name="onlineRecrutation" width={90} type="checkbox" />
            </InputLabel>
          </Column>
          <Column>
            <BenefitsInput />
            <ExtraSkillsInput />
            <MandatoryInput />
            <TasksInput />
          </Column>
        </Container>
      </Wrapper>
    </>
  );
};

export default CreateJobOffer;
