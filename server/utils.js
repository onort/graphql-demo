import validator from 'validator'

export const validateUserInput = ({ firstName, lastName, email, city }) => {
  let errors = []
  if (
    validator.isEmpty(firstName) ||
    validator.isEmpty(lastName) ||
    validator.isEmpty(email) ||
    validator.isEmpty(city)
  ) errors.push({ field: '', message: 'Please fill all required fields.' })
  if (!validator.isEmail(email)) errors.push({ field: 'email', message: 'Please provide a valid email address'})
  if (
    !validator.isLength(firstName, { max: 50 }) ||
    !validator.isLength(lastName, { max: 50 })
  ) errors.push({ field: 'name', message: 'First Name or Last Name fields can not be longer than 50 characters.'})
  return errors
}
