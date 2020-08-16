import React, { useContext, useState } from 'react';
import Navbars from '../../components/Navbars';
import {
  Container,
  Wrapper,
  Column,
  Input,
  Button,
} from '../../styles/CreateCompanyStyles';
import { InputLabel, Error } from '../../styles/LoginPageStyles';
import { JobOfferContext } from '../../context/JobOfferProvider';
import { Checkbox } from '../../styles/Register';
import CreateJobOfferInput from '../../components/inputs/CreateJobOfferInput';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { CREATE_NEW_JOB_OFFER } from '../../Graphql/CompanyMutations';
import { ALL_USERS_OFFERS } from '../../Graphql/Queries';
import Joi from '@hapi/joi';
import { joiResolver } from '@hookform/resolvers';
import { validateTable, ErrorStateType } from '../../utils/Validation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import MapTable from '../../components/MapTable';

type CreateJobOfferTypes = {
  title: string;
  minSalary: number;
  maxSalary: number;
  onlineRecrutation: boolean;
};
const initalState = {
  task: '',
  mandatory: '',
  extra: '',
  benefit: '',
};

const schema = Joi.object({
  title: Joi.string().required(),
  minSalary: Joi.number().min(1).required(),
  maxSalary: Joi.number().min(1).required(),
  onlineRecrutation: Joi.boolean().required(),
});
const CreateJobOffer: React.FC = () => {
  const {
    state: { benefitsInWork, extraSkills, tasks, mandatory },
    dispatch,
  } = useContext(JobOfferContext);

  const [values, setValues] = useState(initalState);

  const [createJob, { error, loading }] = useMutation(CREATE_NEW_JOB_OFFER);

  const [tableErrors, setTableErrors] = useState<ErrorStateType | null>(null);

  const { handleSubmit, reset, errors, register } = useForm<
    CreateJobOfferTypes
  >({ resolver: joiResolver(schema) });
  const history = useHistory();

  const onSubmit = async (data: CreateJobOfferTypes): Promise<void> => {
    if (
      !validateTable(
        tasks,
        mandatory,
        extraSkills,
        benefitsInWork,
        setTableErrors,
      )
    )
      return;
    setTableErrors(null);
    const input = {
      title: data.title,
      minSalary: data.minSalary,
      maxSalary: data.maxSalary,
      onlineRecrutation: data.onlineRecrutation,
      benefitsInWork,
      extraSkills,
      tasks,
      mandatory,
    };
    try {
      await createJob({
        variables: { input },
        refetchQueries: [{ query: ALL_USERS_OFFERS }],
      });
      reset();
      dispatch({ type: 'RESET_VALUES' });
      toast.success('Job offer created succesfully, you will be redirected!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        history.push('/joboffers');
      }, 3500);
    } catch (error) {
      return;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const resetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: '' });
  };
  const handleAddingBenefit = (benefit: string) => {
    dispatch({ type: 'ADD_BENEFIT_IN_WORK', payload: benefit });
  };
  const handleAddingTask = (task: string) => {
    dispatch({ type: 'ADD_TASK', payload: task });
  };
  const handleAddingExtraSkill = (extra: string) => {
    dispatch({ type: 'ADD_SKILL', payload: extra });
  };
  const handleAddingMandatorySkill = (mandatory: string) => {
    dispatch({ type: 'ADD_MANDATORY', payload: mandatory });
  };

  const handleDeletingBenefit = (benefit: string) => {
    dispatch({ type: 'DELETE_BENEFIT_IN_WORK', payload: benefit });
  };
  const handleDeletingTask = (task: string) => {
    dispatch({ type: 'DELETE_TASK', payload: task });
  };
  const handleDeletingExtraSkill = (extra: string) => {
    dispatch({ type: 'DELETE_SKILL', payload: extra });
  };
  const handleDeletingMandatorySkill = (mandatory: string) => {
    dispatch({ type: 'DELETE_MANDATORY', payload: mandatory });
  };
  return (
    <>
      <Navbars />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ width: '30%' }}
      />
      <Wrapper>
        <Container>
          <Column>
            <InputLabel htmlFor="Name of Company" width={80}>
              Title of a offer
            </InputLabel>
            <Input name="title" width={80} type="text" ref={register} />

            {errors.title?.type === 'string.empty' && (
              <Error>Title field cannot be empty</Error>
            )}
            <InputLabel htmlFor="Minimum salary" width={80}>
              Minimum Salary
            </InputLabel>
            <Input
              name="minSalary"
              width={80}
              type="number"
              min={0}
              ref={register}
            />
            {errors.minSalary?.type === 'number.base' && (
              <Error>Minimum salary must be a number and cant be empty</Error>
            )}
            {errors.minSalary?.type === 'number.min' && (
              <Error>Minimum salary must be at least one $</Error>
            )}
            <InputLabel htmlFor="Maximum salary" width={80}>
              Maximum salary
            </InputLabel>
            <Input
              name="maxSalary"
              width={80}
              type="number"
              min={0}
              ref={register}
            />
            {errors.maxSalary?.type === 'number.base' && (
              <Error>Maximum salary must be a number and cant be empty</Error>
            )}
            {errors.maxSalary?.type === 'number.min' && (
              <Error>Maximum salary must be atleast one $</Error>
            )}
            <InputLabel htmlFor="Online Recrutation" width={80}>
              Online recrutation?
              <Checkbox
                name="onlineRecrutation"
                width={90}
                type="checkbox"
                ref={register}
              />
            </InputLabel>
          </Column>
          <Column>
            <CreateJobOfferInput
              name="task"
              handleChange={handleChange}
              handleClick={handleAddingTask}
              handleReset={resetValue}
              value={values.task}
              buttonText="Add task"
              labelText="Task in work"
            />
            <MapTable handleClick={handleDeletingTask} table={tasks} />

            {tableErrors?.type === 'tasks.empty' && (
              <Error>{tableErrors?.message}</Error>
            )}
            <CreateJobOfferInput
              name="mandatory"
              handleChange={handleChange}
              handleClick={handleAddingMandatorySkill}
              handleReset={resetValue}
              value={values.mandatory}
              buttonText="Add mandatory skill"
              labelText="Mandatory skill in work"
            />
            <MapTable
              handleClick={handleDeletingMandatorySkill}
              table={mandatory}
            />
            {tableErrors?.type === 'mandatory.empty' && (
              <Error>{tableErrors?.message}</Error>
            )}
            <CreateJobOfferInput
              name="extra"
              handleChange={handleChange}
              handleClick={handleAddingExtraSkill}
              handleReset={resetValue}
              value={values.extra}
              buttonText="Add extra skill"
              labelText="Add extra skill"
            />
            <MapTable
              handleClick={handleDeletingExtraSkill}
              table={extraSkills}
            />
            {tableErrors?.type === 'skills.empty' && (
              <Error>{tableErrors?.message}</Error>
            )}
            <CreateJobOfferInput
              name="benefit"
              handleChange={handleChange}
              handleClick={handleAddingBenefit}
              handleReset={resetValue}
              value={values.benefit}
              buttonText="Add benefit"
              labelText="Benefit in work"
            />
            <MapTable
              handleClick={handleDeletingBenefit}
              table={benefitsInWork}
            />
            {tableErrors?.type === 'benefits.empty' && (
              <Error>{tableErrors?.message}</Error>
            )}
          </Column>

          {!loading && (
            <Button onClick={handleSubmit(onSubmit)}>Save and create</Button>
          )}
          {error && (
            <Error style={{ textAlign: 'center' }}>{error.message}</Error>
          )}
        </Container>
      </Wrapper>
    </>
  );
};

export default CreateJobOffer;
