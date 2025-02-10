import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthService } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate= useNavigate()
    const [step, setStep] = useState(1);

    const initialValues = {
        email: '',
        otp: '',
        password: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Email is required'),
        otp: step > 1 ? Yup.string().required('OTP is required') : Yup.string(),
        password: step > 1
            ? Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
            : Yup.string(),
        confirmPassword: step > 1
            ? Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Confirm Password is required')
            : Yup.string(),
    });

    const handleSendOtp = async (email) => {
        try {
            console.log("email in function", email);

            const response = await AuthService.sendOtp({ email: email });
            if(response.status==="error"){
                alert(response.message)
            }else{
                alert(`A 6-digit has been sent to ${email}`);
                alert(`OTP is ${response.data.otp}`)
                setStep(2);
            }
        } catch (error) {
            console.log("error is here", error);
            alert(error.message)
        }
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        if (step === 2) {
            await Promise.all([
                AuthService.verifyOtp(values.email, values.otp),
                AuthService.forgotPassword(values.email, values.password),
            ]);
            alert('Password reset successfully. You can now login with new password');
            navigate("/login")
        }
        setSubmitting(false);
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow" style={{ width: "24rem" }}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Forgot Password</h3>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                {step === 1 && (
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <Field
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder="Enter your email"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-danger" />
                                        <button
                                            type="button"
                                            className="btn btn-primary w-100 mt-3"
                                            onClick={() => handleSendOtp(document.getElementById('email').value)}
                                            disabled={isSubmitting}
                                        >
                                            Send OTP
                                        </button>
                                    </div>
                                )}

                                {step === 2 && (
                                    <>
                                        <div className="mb-3">
                                            <label htmlFor="otp" className="form-label">OTP</label>
                                            <Field
                                                type="text"
                                                className="form-control"
                                                id="otp"
                                                name="otp"
                                                placeholder="Enter the OTP"
                                            />
                                            <ErrorMessage name="otp" component="div" className="text-danger" />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">New Password</label>
                                            <Field
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                name="password"
                                                placeholder="Enter your new password"
                                            />
                                            <ErrorMessage name="password" component="div" className="text-danger" />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                            <Field
                                                type="password"
                                                className="form-control"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                placeholder="Confirm your new password"
                                            />
                                            <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary w-100"
                                            disabled={isSubmitting}
                                        >
                                            Reset Password
                                        </button>
                                    </>
                                )}
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
