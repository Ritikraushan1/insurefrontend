import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

const coverageOptions = [
  { id: 1, type: "Basic", coverage: 50000, price: 30 },
  { id: 2, type: "Standard", coverage: 100000, price: 50 },
  { id: 3, type: "Premium", coverage: 200000, price: 100 },
];

const MultiSectionForm = () => {
  const [step, setStep] = useState(1);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverageType: "",
    startDate: "",
  };

  const validationSchema = [
    // Step 1 Validation
    Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Only numbers allowed")
        .min(10, "Must be at least 10 digits")
        .required("Phone is required"),
    }),

    // Step 2 Validation
    Yup.object({
      coverageType: Yup.string().required("Select a coverage type"),
      startDate: Yup.date().required("Start date is required"),
    }),

    // Step 3 Validation (No additional validation needed for summary)
    Yup.object(),
  ];

  const handleNext = (validateForm, setTouched) => {
    validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        setStep(step + 1);
      } else {
        setTouched(errors);
      }
    });
  };

  const handlePrevious = () => setStep(step - 1);

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Multi-Step Insurance Form</h2>

        {/* Step Indicators */}
        <ul className="nav nav-pills justify-content-center mb-4">
          {["Personal Info", "Coverage", "Review"].map((label, index) => (
            <li className="nav-item" key={index}>
              <span
                className={`nav-link ${step === index + 1 ? "active" : "disabled"}`}
                style={{ cursor: "pointer" }}
              >
                {index + 1}. {label}
              </span>
            </li>
          ))}
        </ul>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema[step - 1]}
          onSubmit={(values) => console.log("Submitted Data:", values)}
        >
          {({ values, validateForm, errors, setTouched }) => (
            <Form>
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div>
                  <h4>Step 1: Personal Details</h4>
                  <div className="mb-3">
                    <label>First Name</label>
                    <Field name="firstName" className="form-control" />
                    <ErrorMessage name="firstName" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label>Last Name</label>
                    <Field name="lastName" className="form-control" />
                    <ErrorMessage name="lastName" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label>Email</label>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label>Phone</label>
                    <Field name="phone" className="form-control" />
                    <ErrorMessage name="phone" component="div" className="text-danger" />
                  </div>
                </div>
              )}

              {/* Step 2: Coverage Selection */}
              {step === 2 && (
                <div>
                  <h4>Step 2: Coverage Selection</h4>
                  <div className="mb-3">
                    <label>Coverage Type</label>
                    <Field as="select" name="coverageType" className="form-control">
                      <option value="">Select Coverage</option>
                      {coverageOptions.map((option) => (
                        <option key={option.id} value={option.type}>
                          {option.type} - ${option.price}/month
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="coverageType" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label>Start Date</label>
                    <Field type="date" name="startDate" className="form-control" />
                    <ErrorMessage name="startDate" component="div" className="text-danger" />
                  </div>
                </div>
              )}

              {/* Step 3: Summary */}
              {step === 3 && (
                <div>
                  <h4>Step 3: Review & Submit</h4>
                  <ul className="list-group">
                    <li className="list-group-item">
                      <strong>First Name:</strong> {values.firstName}
                    </li>
                    <li className="list-group-item">
                      <strong>Last Name:</strong> {values.lastName}
                    </li>
                    <li className="list-group-item">
                      <strong>Email:</strong> {values.email}
                    </li>
                    <li className="list-group-item">
                      <strong>Phone:</strong> {values.phone}
                    </li>
                    <li className="list-group-item">
                      <strong>Coverage Type:</strong> {values.coverageType}
                    </li>
                    <li className="list-group-item">
                      <strong>Start Date:</strong> {values.startDate}
                    </li>
                  </ul>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="d-flex justify-content-between mt-4">
                {step > 1 && (
                  <button type="button" className="btn btn-secondary" onClick={handlePrevious}>
                    Back
                  </button>
                )}
                {step < 3 && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleNext(validateForm, setTouched)}
                  >
                    Next
                  </button>
                )}
                {step === 3 && (
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MultiSectionForm;
