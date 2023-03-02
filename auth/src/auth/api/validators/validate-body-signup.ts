import { body } from "express-validator";

class ValidateBodySignUp {
  validate() {
    return [
      body("email")
        .isEmail()
        .withMessage("Email must be valid")
        .notEmpty()
        .withMessage("You must supply a email"),
      body("password")
        .isString()
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("Password must be between 4 and 20 character")
        .notEmpty()
        .withMessage("You must supply a password"),
    ];
  }
}

export default new ValidateBodySignUp();
