import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { User } from '../entity/User';
@ValidatorConstraint({ async: true })
export class isEmailInUseConstraint implements ValidatorConstraintInterface {
  validate(email: string): Promise<boolean> {
    return User.findOne({ where: { email } }).then((user) => {
      if (user) return false;
      return true;
    });
  }
}

export function isEmailInUse(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: isEmailInUseConstraint,
    });
  };
}

@ValidatorConstraint({ async: true })
export class isUserWithEmailConstraint implements ValidatorConstraintInterface {
  validate(email: string): Promise<boolean> {
    return User.findOne({ where: { email } }).then((user) => {
      if (user) return true;
      return false;
    });
  }
}

export function isUserWithEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: isUserWithEmailConstraint,
    });
  };
}
