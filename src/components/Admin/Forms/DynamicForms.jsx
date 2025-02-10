import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap

// Starting data for form configuration
const formConfig = {
  auto: [
    { id: 'policyNumber', label: 'Policy Number', type: 'text', required: true },
    { id: 'accidentDate', label: 'Accident Date', type: 'date', required: true },
    { id: 'damageAmount', label: 'Estimated Damage Amount', type: 'number', required: true }
  ],
  health: [
    { id: 'policyNumber', label: 'Policy Number', type: 'text', required: true },
    { id: 'treatmentDate', label: 'Treatment Date', type: 'date', required: true },
    { id: 'diagnosis', label: 'Diagnosis', type: 'textarea', required: false }
  ]
};

const DynamicForm = () => {
  const [formData, setFormData] = useState({});
  const [claimType, setClaimType] = useState('auto');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const initialData = formConfig[claimType].reduce((acc, field) => {
      acc[field.id] = ''; // Initialize fields with empty values
      return acc;
    }, {});
    setFormData(initialData);
    setErrors({});
  }, [claimType]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    formConfig[claimType].forEach(field => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = `${field.label} is required.`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      console.log('Form Data:', formData);
      setLoading(false);
    }, 2000);
  };

  const handleReset = () => {
    setFormData({});
    setErrors({});
  };

  const renderFormFields = () => {
    return formConfig[claimType].map((field) => (
      <div key={field.id} className="mb-3">
        <label htmlFor={field.id} className="form-label">{field.label}</label>
        {field.type === 'textarea' ? (
          <textarea
            id={field.id}
            value={formData[field.id] || ''}
            onChange={handleChange}
            className="form-control"
          />
        ) : (
          <input
            type={field.type}
            id={field.id}
            value={formData[field.id] || ''}
            onChange={handleChange}
            className="form-control"
          />
        )}
        {errors[field.id] && <div className="text-danger">{errors[field.id]}</div>}
      </div>
    ));
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Insurance Claim Form</h1>
      
      {/* Claim Type Selection */}
      <div className="mb-4">
        <label className="form-label">Claim Type</label>
        <select
          value={claimType}
          onChange={(e) => setClaimType(e.target.value)}
          className="form-select"
        >
          <option value="auto">Auto</option>
          <option value="health">Health</option>
        </select>
      </div>
      
      <form onSubmit={handleSubmit}>
        {renderFormFields()}
        
        <div className="d-flex justify-content-between">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
