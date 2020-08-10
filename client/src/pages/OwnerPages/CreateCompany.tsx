import React, { useState } from 'react';
import Navbars from '../../components/Navbars';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { InputLabel, Error } from '../../styles/LoginPageStyles';
import ToChooseFrom from '../../components/ToChooseFrom';
import { benefits, technologies } from '../../HardCoded';
import Users from '../../components/Users';
import { useMutation } from '@apollo/client';
import { joiResolver } from '@hookform/resolvers';
import Joi from '@hapi/joi';
import { ADD_COMPANY } from '../../Graphql/CompanyMutations';
const Container = styled.form`
  width: 95%;
  padding: 2rem;
  margin: auto;
  display: grid;
  background-color: ${(props) => props.theme.colors.border};
  grid-template-columns: 0.4fr 1fr;
  align-items: center;
`;
const Wrapper = styled.div`
  padding: 2rem 0;
`;
interface InputProps {
  readonly width?: number;
  readonly height?: number;
}
const Input = styled.input<InputProps>`
  width: ${(props) => (props.width ? props.width + '%' : '30%')};
  height: ${(props) => (props.height ? props.height + 'vh' : '50px')};
  padding: 0.8rem 0.6rem;
  font-size: 1rem;
  margin-bottom: 0.8rem;
  margin-top: 0.2rem;
  border: 3px solid ${(props) => props.theme.colors.border2};
  &::placeholder {
    color: ${(props) => props.theme.colors.fontColor};
  }
`;
const Column = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const GridWrapper = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.2rem;
`;
interface AddOwnInterface {
  active?: boolean;
}
const AddOwn = styled.div<AddOwnInterface>`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.button};
  font-size: 0.9rem;
  padding: 0.3rem 0.6rem;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  color: white;
  cursor: pointer;
`;
const Button = styled.button`
  grid-column: 1/3;
  width: 20%;
  justify-self: center;
  background-color: ${(props) => props.theme.colors.button};
  font-size: 1.2rem;
  padding: 0.6rem;
  border: 1px solid white;
  color: white;
  cursor: pointer;
`;

interface CreateCompanyProps {
  companyName: string;
  localisation: string;
  size: number;
  yearOfSetup: number;
  description?: string;
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

  const onSubmit = async (data: CreateCompanyProps) => {
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
      await createCompany({ variables: { input } });
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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

            {userBenefits.length === 0 ? (
              <h4 style={{ padding: '2rem' }}>
                Add benefits, to create a company
              </h4>
            ) : (
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

            {userTechnology.length === 0 ? (
              <h4 style={{ padding: '2rem' }}>Add tech, to create a company</h4>
            ) : (
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
          </Column>
          {error && <Error>{error.message}</Error>}
          {loading ? null : <Button>Save and create</Button>}
        </Container>
      </Wrapper>
    </>
  );
};

export default CreateCompany;
