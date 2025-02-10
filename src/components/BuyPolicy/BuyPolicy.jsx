import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../config/context/userContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BuyPolicyService } from "../../api/assignPolicy";
import SuccessBuyPolicyModal from "../Modal/BuyPolicySuccessModal";

const insuranceQuestions = {
    "Health Insurance": [
        "Do you have any pre-existing medical conditions?",
        "Have you been hospitalized in the last 5 years?",
        "Do you smoke or consume alcohol regularly?",
        "Are you on any long-term medications?",
        "Do you undergo regular health checkups?",
    ],
    "Vehicle Insurance": [
        "What is the make and model of your vehicle?",
        "Is your vehicle currently insured?",
        "How many kilometers do you drive annually?",
        "Do you use your vehicle for commercial purposes?",
        "Have you had any accidents in the past 3 years?",
    ],
    "Life Insurance": [
        "Do you have any critical illnesses in your family history?",
        "Are you currently employed?",
        "Do you participate in any high-risk activities?",
        "Have you undergone any major surgeries?",
        "Do you have any dependents?",
    ],
    "Home Insurance": [
        "What is the estimated value of your home?",
        "Is your property in a flood-prone area?",
        "Do you have a home security system installed?",
        "Is your home constructed using fire-resistant materials?",
        "Do you rent or own the property?",
    ],
    "Travel Insurance": [
        "What is your primary travel destination?",
        "Do you have any existing medical conditions?",
        "Have you faced travel-related issues like lost luggage before?",
        "What is the duration of your travel?",
        "Are you traveling for business or leisure?",
    ],
};

const BuyPolicy = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useUser();
    const [loading, setLoading] = useState(true);
    const { state } = location;
    const { policy } = state || {};
    const [errors, setErrors] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!user) {
                navigate("/login");
            }
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [user, navigate]);

    useEffect(() => {
        if (policy && user) {
            const validationErrors = [];
            if (user.age < policy.validAge) {
                validationErrors.push(
                    `User's age (${user.age} years) is below the minimum required age (${policy.validAge} years).`
                );
            }
            if (user.income < policy.premiumAmount) {
                validationErrors.push(
                    `User's income ($${user.income}) is less than the premium amount ($${policy.premiumAmount}).`
                );
            }
            setErrors(validationErrors);
        }
    }, [policy, user]);

    const handleBuyPolicy = async (values) => {
        // Ensure all questions are answered
        const unansweredQuestions = Object.keys(values).filter(
            (key) => !values[key].trim()
        );

        if (unansweredQuestions.length > 0) {
            alert("Please answer all the questions before proceeding.");
            return;
        }

        // Prepare payload
        const payload = {
            userId: user.id,
            policyId: policy.policyId,
            answers: values,
        };

        const response = await BuyPolicyService.buyNewPolicy({ data: payload })
        if (response.status === "error") {
            alert(response.message)
        } else {
            alert(response.message)
            setShowModal(true);
        }

        console.log("Sending to API:", response);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!policy) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <h5>No policy details found. Please select a policy first.</h5>
            </div>
        );
    }

    const questions = insuranceQuestions[policy.category] || [];
    const initialValues = questions.reduce((acc, question, index) => {
        acc[`question_${index}`] = "";
        return acc;
    }, {});

    const validationSchema = Yup.object(
        questions.reduce((acc, question, index) => {
            acc[`question_${index}`] = Yup.string().required(
                "This question is required."
            );
            return acc;
        }, {})
    );

    return (
        <div className="container py-5">
            {/* Policy Details */}
            <div className="card text-center shadow-lg mb-4">
                <div className="card-header bg-primary text-white">
                    <h4>{policy.policyName}</h4>
                    <span className="badge bg-light text-dark">{policy.category}</span>
                </div>
                <div className="card-body">
                    <p>
                        <strong>Coverage Amount:</strong> ${policy.coverage}
                    </p>
                    <p>
                        <strong>Duration:</strong> {policy.duration} years
                    </p>
                    <p>
                        <strong>Minimum Age Required:</strong> {policy.validAge} years
                    </p>
                    <p className="text-muted">{policy.description}</p>
                </div>
                <div className="card-footer text-muted">
                    Premium Amount: ${policy.premiumAmount}
                </div>
            </div>

            {/* User Details */}
            {user && (
                <div className="card shadow-lg mb-4">
                    <div className="card-header bg-info text-white">
                        <h5>User Details</h5>
                    </div>
                    <div className="card-body">
                        <p>
                            <strong>Name:</strong> {user.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p>
                            <strong>Age:</strong> {user.age} years
                        </p>
                        <p>
                            <strong>Income:</strong> ${user.income}
                        </p>
                    </div>
                </div>
            )}

            {/* Validation Errors */}
            {errors.length > 0 ? (
                <div className="alert alert-danger">
                    <h5>You are not eligible to buy this policy.</h5>
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="card shadow-lg mt-4">
                    <div className="card-header bg-secondary text-white">
                        <h5>Additional Questions</h5>
                    </div>
                    <div className="card-body">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleBuyPolicy}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    {questions.map((question, index) => (
                                        <div className="mb-3" key={index}>
                                            <label className="form-label">{question}</label>
                                            <Field
                                                type="text"
                                                name={`question_${index}`}
                                                className={`form-control ${touched[`question_${index}`] &&
                                                    errors[`question_${index}`]
                                                    ? "is-invalid"
                                                    : ""
                                                    }`}
                                                placeholder="Enter your answer"
                                            />
                                            <ErrorMessage
                                                name={`question_${index}`}
                                                component="div"
                                                className="invalid-feedback"
                                            />
                                        </div>
                                    ))}
                                    <button
                                        type="submit"
                                        className="btn btn-primary mt-3"
                                    >
                                        Submit Details
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}
            <SuccessBuyPolicyModal
                show={showModal}
                onClose={() => setShowModal(false)}
                policy={policy}
                user={user}
            />
        </div>
    );
};

export default BuyPolicy;
