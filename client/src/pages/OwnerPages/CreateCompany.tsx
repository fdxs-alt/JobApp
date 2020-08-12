import React, { useState, useContext } from 'react';
import { TableContext } from '../../context/TableProvider';
import Navbars from '../../components/Navbars';
import { useForm } from 'react-hook-form';
import { InputLabel, Error } from '../../styles/LoginPageStyles';
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
  Button,
} from '../../styles/CreateCompanyStyles';
import UserBenefits from '../../components/UserBenefits';
import UserTech from '../../components/UserTech';
import Tech from '../../components/Tech';
import BenefitsComponent from '../../components/Benefits';

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
  const {
    state: { userTechnology, userBenefits },
  } = useContext(TableContext);

  const [createCompany, { error, loading }] = useMutation(ADD_COMPANY);
  const [tableError, setTableError] = useState<TableErrorProps>({});
  const history = useHistory();
  const { register, handleSubmit, errors, reset } = useForm<CreateCompanyProps>(
    {
      resolver: joiResolver(schema),
    },
  );

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
      toast.success('Comapny created succesfully, you will be redirected!', {
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
      return;
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

            <BenefitsComponent />
            <UserBenefits />

            {tableError.type === 'benefits.empty' && (
              <Error style={{ width: '80%', padding: '1rem 0' }}>
                {tableError.message}
              </Error>
            )}

            <Tech />
            <UserTech />

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
