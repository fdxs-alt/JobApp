import React, { useContext, useState } from 'react';
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
import CreateJobOfferInput from '../../components/inputs/CreateJobOfferInput';
const initalState = {
  task: '',
  mandatory: '',
  extra: '',
  benefit: '',
};
const CreateJobOffer: React.FC = () => {
  const { state, dispatch } = useContext(JobOfferContext);
  const [values, setValues] = useState(initalState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
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
            <CreateJobOfferInput
              name="task"
              handleChange={handleChange}
              value={values.task}
              buttonText="Add task"
              labelText="Task in work"
            />
            <CreateJobOfferInput
              name="mandatory"
              handleChange={handleChange}
              value={values.mandatory}
              buttonText="Add mandatory skill"
              labelText="Mandatory skill in work"
            />
            <CreateJobOfferInput
              name="extra"
              handleChange={handleChange}
              value={values.extra}
              buttonText="Add extra skill"
              labelText="Add extra skill"
            />
            <CreateJobOfferInput
              name="benefit"
              handleChange={handleChange}
              value={values.benefit}
              buttonText="Add benefit"
              labelText="Benefit in work"
            />
          </Column>
        </Container>
      </Wrapper>
    </>
  );
};

export default CreateJobOffer;
