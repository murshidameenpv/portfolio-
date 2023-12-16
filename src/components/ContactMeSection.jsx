import React, {useEffect} from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import {useAlertContext} from "../context/alertContext";

const ContactMeSection = () => {
  const {isLoading, response, submit} = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: {
    firstName: '',
    email: '',
    type: '',
    comment: '',
    },
   onSubmit: async (values, { setSubmitting, resetForm }) => {
      const result = await submit(values);
      if (result.type === 'success') {
        onOpen('success', `Form submitted successfully by ${values.firstName}`);
        resetForm();
      } else {
        onOpen('error', result.message);
      }
      setSubmitting(false);
    },
    validationSchema: Yup.object({
       firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    type: Yup.string()
      .oneOf(['hireMe', 'openSource', 'other'], 'Invalid Type')
      .required('Required'),
    comment: Yup.string()
      .max(500, 'Must be 500 characters or less')
      .required('Required'),
    }),
  });

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl  isInvalid={formik.touched.firstName && !!formik.errors.firstName}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  {...formik.getFieldProps('firstName')}
                />
                 <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.touched.email && !!formik.errors.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  {...formik.getFieldProps('email')}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type" name="type" {...formik.getFieldProps('type')}> 
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={formik.touched.comment && !!formik.errors.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  {...formik.getFieldProps('comment')}
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full" isLoading={formik.isSubmitting}>
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};
export default ContactMeSection;








//==========================NOTES FORMIK==================================================================


// The {...formik.getFieldProps} is a shorthand notation in JSX for passing all properties of an object as props to a React component. This is known as the spread operator.
// In the context of Formik, formik.getFieldProps('fieldName') returns an object that includes properties like name, value, and onChange, which are required for Formik to manage the form state.
// For example, if you have a field named ‘email’, formik.getFieldProps('email') might return an object like this:
// {
//   name: 'email',
//   value: '', // this will be the current value of the field
//   onChange: [Function: handleChange], // function to call when the field value changes
//   onBlur: [Function: handleBlur], // function to call when the field loses focus
// }
// When you use {...formik.getFieldProps('email')} on an input element, it’s equivalent to:
// <Input
//   id="email"
//   name="email"
//   value={formik.values.email}
//   onChange={formik.handleChange}
//   onBlur={formik.handleBlur}
// />
// This makes your code cleaner and easier to read, especially when you have many form fields. It also ensures that all necessary props are passed to the input element for Formik to work correctly.







// The !! is a JavaScript syntax to convert a value to a boolean.

// In JavaScript, values can be truthy or falsy. Truthy values are values that are considered true when encountered in a Boolean context. All values are truthy unless they are defined as falsy (i.e., except for false, 0, -0, 0n, "", null, undefined, and NaN).

// The formik.errors.firstName is an object, and objects are always truthy in JavaScript, even empty objects.

// So, if formik.errors.firstName exists (even if it’s an empty object), formik.errors.firstName is truthy. But we want to check not just if the object exists, but if it has any properties (i.e., if there are any errors).

// The ! operator can be used to convert a truthy value to false and a falsy value to true. So, !formik.errors.firstName will be false if formik.errors.firstName is truthy (i.e., if the object exists and is not empty), and true if formik.errors.firstName is falsy (i.e., if the object doesn’t exist or is empty).

// But we want the opposite of that. We want true if the object exists and is not empty, and false if it doesn’t exist or is empty. So, we use !! to invert the value again. !!formik.errors.firstName will be true if formik.errors.firstName is truthy, and false if formik.errors.firstName is falsy.

// So, formik.touched.firstName && !!formik.errors.firstName will be true if the firstName field has been touched and there are errors for the firstName field. This is used to determine whether the FormControl should be marked as invalid.