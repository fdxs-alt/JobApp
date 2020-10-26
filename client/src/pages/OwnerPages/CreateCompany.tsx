import React, { useState, useContext } from 'react';
import { TableContext } from '../../context/TableProvider';
import { useForm } from 'react-hook-form';
import { InputLabel, Error } from '../../styles/LoginPageStyles';
import { useMutation } from '@apollo/client';
import { joiResolver } from '@hookform/resolvers';
import Joi from '@hapi/joi';
import { ADD_COMPANY } from '../../Graphql/CompanyMutations';
import { ToastContainer } from 'react-toastify';
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
import UserBenefits from '../../components/CompanyForm/UserBenefits';
import UserTech from '../../components/CompanyForm/UserTech';
import Tech from '../../components/CompanyForm/Tech';
import BenefitsComponent from '../../components/inputs/Benefits';
import { CustomToast } from '../../utils/CustomToast';
import Spinner from '../../components/Spinner';
const today = new Date();
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
  size: Joi.number().required().min(1),
  yearOfSetup: Joi.number().required().min(1950).max(today.getFullYear()),
  description: Joi.string(),
});

const CreateCompany = () => {
  const {
    state: { userTechnology, userBenefits },
  } = useContext(TableContext);

  const [createCompany, { loading }] = useMutation(ADD_COMPANY);
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

      CustomToast(
        'Company created succesfully, you will be redirected!',
        'success',
      );

      reset();

      setTimeout(() => {
        history.push('/profile');
      }, 3500);
    } catch (error) {
      CustomToast(error.message, 'error');
      reset();
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

      <Wrapper>
        <Container>
          <Column>
            <InputLabel htmlFor="Name of Company" width={90}>
              Name of company
            </InputLabel>
            <Input name="companyName" width={90} ref={register} />

            {errors.companyName ? (
              <Error>Comapny name field cannot be empty</Error>
            ) : null}

            <InputLabel htmlFor="Localisation" width={90}>
              Localisation
            </InputLabel>
            <Input name="localisation" width={90} ref={register} />

            {errors.localisation ? (
              <Error>Localisation field cannot be empty</Error>
            ) : null}

            <InputLabel htmlFor="Size of company" width={90}>
              Size of company
            </InputLabel>
            <Input
              name="size"
              width={90}
              ref={register}
              type="number"
              min={0}
              max={10000}
            />

            {errors.size?.type === 'number.base' && (
              <Error>Size field cannot be empty and must be a number</Error>
            )}
            {errors.size?.type === 'number.min' && (
              <Error>Size field must be at least 1</Error>
            )}

            <InputLabel htmlFor="Year of setup" width={90}>
              Year of setup
            </InputLabel>
            <Input
              name="yearOfSetup"
              width={90}
              ref={register}
              type="number"
              min={1950}
              max={today.getFullYear()}
            />

            {errors.yearOfSetup?.type === 'number.base' && (
              <Error>
                Year of setup field cannot be empty and must be a number
              </Error>
            )}
            {errors.yearOfSetup?.type === 'number.min' && (
              <Error>Year cant be lower than 1950</Error>
            )}
            {errors.yearOfSetup?.type === 'number.max' && (
              <Error>Year cant be higher than {today.getFullYear()}</Error>
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

          {loading ? (
            <Spinner size={50} small loading={loading} />
          ) : (
            <Button onClick={handleSubmit(onSubmit)}>Save and create</Button>
          )}
        </Container>
      </Wrapper>
    </>
  );
};

export default CreateCompany;
