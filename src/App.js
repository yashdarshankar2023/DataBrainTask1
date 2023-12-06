import React, { useState } from 'react';
import './App.css';

const steps = [
  {
    title: 'Personal Details',
    fields: ['firstName', 'lastName', 'email'],
  },
  {
    title: 'Address Details',
    fields: ['addressLine1', 'addressLine2', 'city', 'state', 'zipCode'],
  },
  {
    title: 'Payment Details',
    fields: ['cardNumber', 'expirationDate', 'cvv'],
  },
  {
    title: 'Feedback',
    fields: ['feedback'],
  },
];

const App = () => {
  const [formData, setFormData] = useState({
    personalDetails: {
      firstName: '',
      lastName: '',
      email: '',
    },
    addressDetails: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
    },
    paymentDetails: {
      cardNumber: '',
      expirationDate: '',
      cvv: '',
    },
    feedback: {
      feedback: '',
    },
  });

  const [step, setStep] = useState(0);

  const validateForm = () => {
    const currentStep = steps[step];
    const currentFormData = formData[currentStep.title.toLowerCase()];

    // Check if all required fields are filled
    return currentStep.fields.every((field) => currentFormData[field].trim() !== '');
  };

  const handleChange = (e, section) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep(step + 1);
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Perform form submission logic here (e.g., send data to server)
      // For simplicity, we'll just log the data to the console
      console.log('Form submitted:', formData);
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const renderForm = () => {
    const currentStep = steps[step];
    const formDataForStep = formData[currentStep.title.toLowerCase()] || {};
  
    return (
      <div>
        <h2>{currentStep.title}</h2>
        {currentStep.fields.map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            value={formDataForStep[field] !== undefined ? formDataForStep[field] : ''}
            onChange={(e) => handleChange(e, currentStep.title.toLowerCase())}
            required
          />
        ))}
      </div>
    );
  };
  
  return (
    <div className="App">
      <form onSubmit={(e) => e.preventDefault()}>
        {renderForm()}

        {step > 0 && (
          <button type="button" onClick={handlePrev}>
            Previous
          </button>
        )}

        {step < steps.length - 1 ? (
          <button type="button" onClick={handleNext} style={{marginLeft:"16px"}}>
            Next
          </button>
        ) : (
          <button type="submit" onClick={handleSubmit} style={{marginLeft:"16px"}}>
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default App;

