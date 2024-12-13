import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const registerBodyValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required().label("name"),
    email: Joi.string().email().required().label("email"),
    password: passwordComplexity().required().label("password"),
    unwantedField: Joi.any().forbidden(),
  });
  return schema.validate(body);
};

const loginBodyValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().required().label("email"),
    password: Joi.string().required().label("password"),
  });
  return schema.validate(body);
};
const refreshTokenBodyValidation = (body) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required().label("refreshToken"),
  });
  return schema.validate(body);
};

const mailValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("email"),
  });
  return schema.validate(body);
};

const passwordResetValidation = (body) => {
  const schema = Joi.object({
    token: Joi.string().required().label("token"),
    password: passwordComplexity().required().label("password"),
  });
  return schema.validate(body);
};

const emailVerifyValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("email"),
    otp: Joi.string().required().label("otp"),
  });
  return schema.validate(body);
};

export {
  registerBodyValidation,
  loginBodyValidation,
  refreshTokenBodyValidation,
  mailValidation,
  passwordResetValidation,
  emailVerifyValidation,
};
