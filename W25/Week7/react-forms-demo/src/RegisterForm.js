// Import React and the useState hook from the React library.
// useState allows us to create state variables in our functional component.
import React, { useState } from 'react';

// Define the RegisterForm functional component.
function RegisterForm() {
  // Create a state variable "formData" to hold the values of the form fields.
  // Initialize it with an object containing all the necessary fields.
  const [formData, setFormData] = useState({
    username: '',       // Holds the username input
    email: '',          // Holds the email input
    password: '',       // Holds the password input
    confirmPassword: '',// Holds the confirm password input
    phone: '',          // Holds the phone number input
    terms: false        // Holds the boolean value for the terms checkbox
  });

  // Create a state variable "errors" to keep track of any validation errors.
  // It is initialized as an empty object.
  const [errors, setErrors] = useState({});

  // Generic handler to update state when any input field changes.
  // It works for text, email, password, and checkbox inputs.
  const handleChange = (e) => {
    // Destructure properties from the event target.
    // "name" is the name attribute of the input element.
    // "value" is the current value of the input element.
    // "type" identifies the type of input (e.g., text, checkbox).
    // "checked" holds the boolean value for checkbox inputs.
    const { name, value, type, checked } = e.target;

    // Update the "formData" state using the previous state.
    // For checkbox inputs, use "checked" instead of "value".
    setFormData((prevState) => ({
      ...prevState,             // Copy the previous state to keep unchanged values.
      [name]: type === 'checkbox' ? checked : value // Dynamically update the field.
    }));
  };

  // Function to validate the current form data.
  // Returns an object with error messages for fields that do not pass validation.
  const validate = () => {
    // Create an empty object to store error messages.
    const newErrors = {};

    // Validate the "username" field.
    // If the username is empty (after removing whitespace), set an error message.
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    // Validate the "email" field.
    // First, check if the email is empty.
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      // If not empty, use a regular expression to check the email format.
      // The regex checks for a basic email structure (non-whitespace characters, an "@", and a domain).
      newErrors.email = 'Email address is invalid';
    }

    // Validate the "password" field.
    // If the password field is empty, set an error message.
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    // Validate the "confirmPassword" field.
    // If it is empty, prompt the user to confirm the password.
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      // Check if the password and confirmPassword fields match.
      // If they don't, set an error message.
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Validate the "phone" field.
    // Check if the phone number is empty (after trimming whitespace).
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    // Validate the "terms" checkbox.
    // Ensure the user has checked the box to agree to the terms.
    if (!formData.terms) {
      newErrors.terms = 'You must agree to the terms';
    }

    // Return the newErrors object.
    // If no errors are found, newErrors will be empty.
    return newErrors;
  };

  // Handle form submission.
  const handleSubmit = (e) => {
    // Prevent the default form submission behavior (which would reload the page).
    e.preventDefault();

    // Validate the form data and store any errors.
    const validationErrors = validate();

    // Check if there are any validation errors.
    // Object.keys(validationErrors).length > 0 means there is at least one error.
    if (Object.keys(validationErrors).length > 0) {
      // Update the "errors" state so that error messages can be displayed in the UI.
      setErrors(validationErrors);
    } else {
      // If there are no errors, log the form data to the console.
      console.log('Registration successful:', formData);

      // Optionally, reset the form data after successful submission.
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        terms: false
      });

      // Clear any previous errors.
      setErrors({});
    }
  };

  // Return the JSX for rendering the form.
  return (
    <form onSubmit={handleSubmit}>
      {/* Username field */}
      <div>
        <label>Username:</label>
        <input 
          type="text" 
          name="username"              // Associates this input with formData.username
          value={formData.username}    // Sets the value from state
          onChange={handleChange}      // Updates state on change
        />
        {/* Conditionally render an error message if one exists for username */}
        {errors.username && <span className="error">{errors.username}</span>}
      </div>

      {/* Email field */}
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          name="email"                 // Associates this input with formData.email
          value={formData.email}       // Sets the value from state
          onChange={handleChange}      // Updates state on change
        />
        {/* Conditionally render an error message if one exists for email */}
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      {/* Password field */}
      <div>
        <label>Password:</label>
        <input 
          type="password" 
          name="password"              // Associates this input with formData.password
          value={formData.password}    // Sets the value from state
          onChange={handleChange}      // Updates state on change
        />
        {/* Conditionally render an error message if one exists for password */}
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      {/* Confirm Password field */}
      <div>
        <label>Confirm Password:</label>
        <input 
          type="password" 
          name="confirmPassword"       // Associates this input with formData.confirmPassword
          value={formData.confirmPassword} // Sets the value from state
          onChange={handleChange}      // Updates state on change
        />
        {/* Conditionally render an error message if one exists for confirmPassword */}
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
      </div>

      {/* Phone Number field */}
      <div>
        <label>Phone Number:</label>
        <input 
          type="text" 
          name="phone"                 // Associates this input with formData.phone
          value={formData.phone}       // Sets the value from state
          onChange={handleChange}      // Updates state on change
        />
        {/* Conditionally render an error message if one exists for phone */}
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>

      {/* Terms and Conditions Checkbox */}
      <div>
        <label>
          <input 
            type="checkbox" 
            name="terms"              // Associates this checkbox with formData.terms
            checked={formData.terms}  // Uses "checked" attribute for checkbox value
            onChange={handleChange}   // Updates state on change
          />
          I agree to the terms and conditions.
        </label>
        {/* Conditionally render an error message if one exists for terms */}
        {errors.terms && <span className="error">{errors.terms}</span>}
      </div>

      {/* Submit button */}
      <button type="submit">Register</button>
    </form>
  );
}

// Export the RegisterForm component to make it available for use in other parts of the application.
export default RegisterForm;
