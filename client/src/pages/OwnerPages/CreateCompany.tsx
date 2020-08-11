import React, { useState } from 'react';
import Navbars from '../../components/Navbars';
import { useForm } from 'react-hook-form';
import { InputLabel, Error } from '../../styles/LoginPageStyles';
import ToChooseFrom from '../../components/ToChooseFrom';
import { benefits, technologies } from '../../HardCoded';
import Users from '../../components/Users';
import { useMutation } from '@apollo/client';
import { joiResolver } from '@hookform/resolvers';
import Joi from '@hapi/joi';
import { ADD_COMPANY } from '../../Graphql/CompanyMutations';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { GET_USER_COMPANY } from '../../Graphql/Queries';
import {
  Wrapper,
  Container,
  Input,
  Column,
  GridWrapper,
  Button,
} from '../../styles/CreateCompanyStyles';

interface CreateCompanyProps {
  companyName: string;
  localisation: string;
  size: number;
  yearOfSetup: number;
  description?: string;
}
interface TableErrorProps {
  message?: string;
  type?: string;
}
const schema = Joi.object({
  companyName: Joi.string().required(),
  localisation: Joi.string().required(),
  size: Joi.number().required(),
  yearOfSetup: Joi.number().required(),
  description: Joi.string(),
});

const CreateCompany = () => {
  const [Benefits, setBenefits] = useState<string[]>(benefits);
  const [userBenefits, setUserBenefits] = useState<string[]>([]);
  const [technology, setTechnology] = useState<string[]>(technologies);
  const [userTechnology, setUserTechnology] = useState<string[]>([]);
  const [createCompany, { error, loading }] = useMutation(ADD_COMPANY);
  const [tableError, setTableError] = useState<TableErrorProps>({});
  const history = useHistory();
  const { register, handleSubmit, errors, reset } = useForm<CreateCompanyProps>(
    {
      resolver: joiResolver(schema),
    },
  );

  const handleAddingBenefit = (benefit: string) => {
    setUserBenefits((prev) => [benefit, ...prev]);
    setBenefits(Benefits.filter((b) => b !== benefit));
  };

  const handleDeletingBenefit = (benefit: string) => {
    setUserBenefits(userBenefits.filter((b) => b !== benefit));
    setBenefits((prev) => [benefit, ...prev]);
  };

  const handleAddingTech = (tech: string) => {
    setUserTechnology((prev) => [tech, ...prev]);
    setTechnology(technology.filter((b) => b !== tech));
  };

  const handleDeletingTech = (tech: string) => {
    setUserTechnology(userTechnology.filter((b) => b !== tech));
    setTechnology((prev) => [tech, ...prev]);
  };

  const onSubmit = async (data: CreateCompanyProps): Promise<void> => {
    if (userBenefits.length === 0) {
      setTableError({
        message: 'Benefits must be picked',
        type: 'benefits.empty',
      });
      return;
    }

    if (userTechnology.length === 0) {
      setTableError({
        message: 'Technologies must be picked',
        type: 'technologies.empty',
      });
      return;
    }

    const input = {
      companyName: data.companyName,
      yearOfSetUp: data.yearOfSetup,
      sizeOfCompany: data.size,
      localisation: data.localisation,
      description: data.description,
      technologies: userTechnology,
      benefits: userBenefits,
    };

    try {
      await createCompany({
        variables: { input },
        refetchQueries: [{ query: GET_USER_COMPANY }],
      });
      toast.success('Comapny created succesfully, you will be redirect!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      reset();
      setTimeout(() => {
        history.push('/profile');
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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

      <Navbars />
      <Wrapper>
        <Container onSubmit={handleSubmit(onSubmit)}>
          <Column>
            <InputLabel htmlFor="Name of Company" width={90}>
              Name of company
            </InputLabel>
            <Input name="companyName" width={90} ref={register} />
            {errors.companyName?.type === 'string.empty' && (
              <Error>Comapny name field cannot be empty</Error>
            )}
            <InputLabel htmlFor="Localisation" width={90}>
              Localisation
            </InputLabel>
            <Input name="localisation" width={90} ref={register} />
            {errors.localisation?.type === 'string.empty' && (
              <Error>Localisation field cannot be empty</Error>
            )}
            <InputLabel htmlFor="Size of company" width={90}>
              Size of company
            </InputLabel>
            <Input name="size" width={90} ref={register} />
            {errors.size?.type === 'number.base' && (
              <Error>Size field cannot be empty and must be a number</Error>
            )}
            <InputLabel htmlFor="Year of setup" width={90}>
              Year of setup
            </InputLabel>
            <Input name="yearOfSetup" width={90} ref={register} />
            {errors.yearOfSetup?.type === 'number.base' && (
              <Error>
                Year of setup field cannot be empty and must be a number
              </Error>
            )}
          </Column>
          <Column>
            <InputLabel htmlFor="Description" width={80}>
              Description
            </InputLabel>

            <Input name="description" width={80} ref={register} />
            {errors.description?.type === 'string.empty' && (
              <Error>Description field cannot be empty</Error>
            )}
            {Benefits.length === 0 ? null : (
              <>
                <InputLabel htmlFor="Benefits" width={80}>
                  Benefits:
                </InputLabel>
                <GridWrapper>
                  {Benefits.map((benefit, index) => {
                    return (
                      <ToChooseFrom
                        key={index}
                        text={benefit}
                        handleClick={handleAddingBenefit}
                      />
                    );
                  })}
                </GridWrapper>
              </>
            )}

            {userBenefits.length === 0 ? null : (
              <>
                <InputLabel htmlFor="UserBenefits" width={80}>
                  Your benefits:
                </InputLabel>
                <GridWrapper>
                  {userBenefits.map((benefit, index) => (
                    <Users
                      key={index}
                      text={benefit}
                      handleClick={handleDeletingBenefit}
                    />
                  ))}
                </GridWrapper>
              </>
            )}
            {tableError.type === 'benefits.empty' && (
              <Error style={{ width: '80%', padding: '1rem 0' }}>
                {tableError.message}
              </Error>
            )}
            {technology.length === 0 ? null : (
              <>
                <InputLabel htmlFor="Benefits" width={80}>
                  Technology:
                </InputLabel>
                <GridWrapper>
                  {technology.map((tech, index) => {
                    return (
                      <ToChooseFrom
                        key={index}
                        text={tech}
                        handleClick={handleAddingTech}
                      />
                    );
                  })}
                </GridWrapper>
              </>
            )}

            {userTechnology.length === 0 ? null : (
              <>
                <InputLabel htmlFor="UserBenefits" width={80}>
                  Your tech:
                </InputLabel>
                <GridWrapper>
                  {userTechnology.map((tech, index) => (
                    <Users
                      key={index}
                      text={tech}
                      handleClick={handleDeletingTech}
                    />
                  ))}
                </GridWrapper>
              </>
            )}
            {tableError.type === 'technologies.empty' && (
              <Error style={{ width: '80%', padding: '1rem 0' }}>
                {tableError.message}
              </Error>
            )}
          </Column>
          {error && <Error>{error.message}</Error>}
          {loading ? null : <Button>Save and create</Button>}
        </Container>
      </Wrapper>
    </>
  );
};

export default CreateCompany;
