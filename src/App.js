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
    const patternValidationResult = validatePattern(currentFormData);
    const isPatternValid = patternValidationResult.isValid;

    if (!isPatternValid) {
      alert(patternValidationResult.errorMessage);
      return false;
    }
    else {
      const isFieldsEmpty = currentFormData && currentStep.fields.some((field) => !currentFormData[field] || currentFormData[field].trim() === '');
      if (isFieldsEmpty) {
        alert('Please fill in all required fields.');
        return false;
      }
    }

    return true;
  };
const validatePattern = (formData) => {
  
  const firstNamePattern = /^[A-Za-z]+$/;
  const lastNamePattern = /^[A-Za-z]+$/;
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  const addressPattern = /^[A-Za-z0-9\s]+$/; // Allow letters, numbers, and spaces for address lines
  const alphabetsPattern = /^[A-Za-z]+$/; // Allow only alphabets for city and state
  const zipCodePattern = /^\d{6}$/; // Allow only 6 digits for zip code
  const cardNumberPattern = /^\d{16}$/; // Allow only 16 digits for card number
  const cvvPattern = /^\d{3}$/; // Allow only 3 digits for CVV
  const expirationDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/; // Allow MM/YY format for expiration date

  if (formData.firstName && !firstNamePattern.test(formData.firstName.trim())) {
    return { isValid: false, errorMessage: 'Please enter only letters for First Name.' };
  }

  if (formData.lastName && !lastNamePattern.test(formData.lastName.trim())) {
    return { isValid: false, errorMessage: 'Please enter only letters for Last Name.' };
  }

  if (formData.email && !emailPattern.test(formData.email.trim())) {
    return { isValid: false, errorMessage: 'Please enter a valid email address.' };
  }

  if (formData.addressLine1 && !addressPattern.test(formData.addressLine1.trim())) {
    return { isValid: false, errorMessage: 'Address Line 1 should not contain special characters.' };
  }

  if (formData.addressLine2 && !addressPattern.test(formData.addressLine2.trim())) {
    return { isValid: false, errorMessage: 'Address Line 2 should not contain special characters.' };
  }

  if (formData.city && !alphabetsPattern.test(formData.city.trim())) {
    return { isValid: false, errorMessage: 'City should only contain alphabets.' };
  }

  if (formData.state && !alphabetsPattern.test(formData.state.trim())) {
    return { isValid: false, errorMessage: 'State should only contain alphabets.' };
  }

  if (formData.zipCode && !zipCodePattern.test(formData.zipCode.trim())) {
    return { isValid: false, errorMessage: 'Zip Code should be a 6-digit number.' };
  }

  if (formData.cardNumber && !cardNumberPattern.test(formData.cardNumber.trim())) {
    return { isValid: false, errorMessage: 'Card Number should be a 16-digit number.' };
  }

  if (formData.cvv && !cvvPattern.test(formData.cvv.trim())) {
    return { isValid: false, errorMessage: 'CVV should be a 3-digit number.' };
  }

  if (formData.expirationDate && !expirationDatePattern.test(formData.expirationDate.trim())) {
    return { isValid: false, errorMessage: 'Expiration Date should be in the format MM/YY.' };
  }

  return { isValid: true, errorMessage: '' };
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
    } 
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    if (validateForm()) {
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
            value={formDataForStep && formDataForStep[field] !== undefined ? formDataForStep[field] : ''}
            onChange={(e) => handleChange(e, currentStep.title.toLowerCase())}
            required
            pattern={field === 'firstName' || field === 'lastName' ? '^[A-Za-z]+$' : undefined}
            title={field === 'firstName' || field === 'lastName' ? 'Please enter only letters' : undefined}
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
          <button type="button" onClick={handleNext} style={{ marginLeft: "16px" }}>
            Next
          </button>
        ) : (
          <button type="submit" onClick={handleSubmit} style={{ marginLeft: "16px" }}>
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default App;

