// Import the React library and the useState hook
import React, { useState } from 'react';

// Define the ContactForm functional component
function ContactForm() {
  // Initialize formData state to store values of the form inputs.
  // Initially, name, email, and message are empty strings.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Initialize errors state to store any validation error messages.
  // Initially, there are no errors so we set it to an empty object.
  const [errors, setErrors] = useState({});

  // This function handles changes in any of the form inputs.
  // It updates the corresponding field in the formData state.
  const handleChange = (e) => {
    // Destructure name and value from the event target (input element)
    const { name, value } = e.target;
    // Update the state by merging the previous state with the new value for the changed input.
    // The [name] property ensures the correct field (name, email, or message) is updated.
    setFormData(prevState => ({
      ...prevState,     // Spread operator to retain other values in formData
      [name]: value     // Dynamically update the property with the new value
    }));
  };

  // This function validates the formData to ensure all required fields are correctly filled out.
  // It returns an object containing error messages for fields that fail validation.
  const validate = () => {
    // Initialize an empty object to collect errors
    const newErrors = {};

    // Check if the name field is empty or only whitespace.
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'; // Set error message for name field
    }

    // Check if the email field is empty.
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'; // Set error message if email is empty
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      // If email is provided, validate it against a simple regular expression pattern.
      // This pattern checks for at least one character before and after "@" and a dot.
      newErrors.email = 'Email address is invalid'; // Set error message if email format is invalid
    }

    // Check if the message field is empty or only whitespace.
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'; // Set error message for message field
    }

    // Return the errors object. If no errors were found, it will be empty.
    return newErrors;
  };

  // This function handles the form submission event.
  const handleSubmit = (e) => {
    // Prevent the default behavior of form submission which reloads the page.
    e.preventDefault();

    // Validate the formData and store any validation errors in newErrors.
    const newErrors = validate();

    // Check if there are any errors by examining if newErrors has any keys.
    if (Object.keys(newErrors).length > 0) {
      // If errors exist, update the errors state so that error messages are displayed in the UI.
      setErrors(newErrors);
    } else {
      // If no errors exist, log the form data to the console.
      console.log('Form submitted successfully:', formData);

      // Optionally reset the form by clearing the formData state.
      setFormData({ name: '', email: '', message: '' });

      // Also clear any existing errors.
      setErrors({});
    }
  };

  // The component's return statement renders the form in JSX.
  // The form includes inputs for name, email, and message along with a submit button.
  return (
    <form onSubmit={handleSubmit}>
      {/* Name Field */}
      <div>
        <label>Name:</label>
        <input 
          type="text"            // Input type is text
          name="name"            // The name attribute corresponds to the formData key "name"
          value={formData.name}  // The value is taken from the formData state
          onChange={handleChange} // onChange calls handleChange to update the state on user input
        />
        {/* Conditionally render an error message if errors exist for the name field */}
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      {/* Email Field */}
      <div>
        <label>Email:</label>
        <input 
          type="email"            // Input type is email which provides basic HTML5 validation
          name="email"            // The name attribute corresponds to the formData key "email"
          value={formData.email}  // The value is taken from the formData state
          onChange={handleChange} // onChange calls handleChange to update the state on user input
        />
        {/* Conditionally render an error message if errors exist for the email field */}
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      {/* Message Field */}
      <div>
        <label>Message:</label>
        <textarea 
          name="message"           // The name attribute corresponds to the formData key "message"
          value={formData.message} // The value is taken from the formData state
          onChange={handleChange}  // onChange calls handleChange to update the state on user input
        />
        {/* Conditionally render an error message if errors exist for the message field */}
        {errors.message && <span className="error">{errors.message}</span>}
      </div>

      {/* Submit Button */}
      <button type="submit">Submit</button>
    </form>
  );
}

// Export the ContactForm component so it can be imported and used in other parts of the app.
export default ContactForm;
