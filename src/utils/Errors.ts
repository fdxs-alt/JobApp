export const userExists = {
  errors: [
    {
      input: 'email',
      message: 'user already exists',
    },
  ],
};

export const userNotFound = {
  errors: [
    {
      input: 'email',
      message: 'Email or password is wrong',
    },
  ],
};

export const wrongPassword = {
  errors: [
    {
      input: 'password',
      message: 'Email or password is wrong',
    },
  ],
};
