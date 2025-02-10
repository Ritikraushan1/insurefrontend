import PropTypes from "prop-types";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ClaimService } from "../../api/claimsApi";
import { useNavigate } from "react-router-dom";

const ApplyClaimForm = ({ policy }) => {
    const [category, setCategory] = useState(policy.policyDetails.category);
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const getQuestions = () => {
        switch (category) {
            case "Health Insurance":
                return [
                    { name: "hospitalName", label: "Hospital Name", type: "text" },
                    { name: "admissionDate", label: "Admission Date", type: "date" },
                    { name: "dischargeDate", label: "Discharge Date", type: "date" },
                    { name: "claimReason", label: "Reason for Claim", type: "textarea" },
                ];
            case "Vehicle Insurance":
                return [
                    { name: "vehicleNumber", label: "Vehicle Number", type: "text" },
                    { name: "accidentDate", label: "Accident Date", type: "date" },
                    { name: "damageDescription", label: "Damage Description", type: "textarea" },
                    { name: "claimReason", label: "Reason for Claim", type: "textarea" },
                ];
            case "Life Insurance":
                return [
                    { name: "policyHolderName", label: "Policy Holder Name", type: "text" },
                    { name: "policyNumber", label: "Policy Number", type: "text" },
                    { name: "claimReason", label: "Reason for Claim", type: "textarea" },
                ];
            default:
                return [];
        }
    };

    const initialValues = {
        category: category,
        hospitalName: "",
        admissionDate: "",
        dischargeDate: "",
        vehicleNumber: "",
        accidentDate: "",
        damageDescription: "",
        policyHolderName: "",
        policyNumber: "",
        claimReason: "",
        documents: null,
    };

    const validationSchema = Yup.object().shape({
        category: Yup.string().required("Policy category is required."),
        hospitalName: category === "Health Insurance" ? Yup.string().required("Hospital name is required.") : Yup.string(),
        admissionDate: category === "Health Insurance"
            ? Yup.date()
                .required("Admission date is required.")
                .test("is-valid-date", "Admission date must not be in the future.", function (value) {
                    return value && new Date(value) <= new Date();
                })
                .test("is-after-assigned", "Admission date must be after the assigned date.", function (value) {
                    return value && new Date(value) > new Date(policy.assignedDate);
                })
            : Yup.date(),
        dischargeDate: category === "Health Insurance"
            ? Yup.date()
                .required("Discharge date is required.")
                .test("is-valid-date", "Discharge date must not be in the future.", function (value) {
                    return value && new Date(value) <= new Date();
                })
                .test("is-after-admission", "Discharge date must be after the admission date.", function (value) {
                    return value && new Date(value) > new Date(this.parent.admissionDate);
                })
            : Yup.date(),
        vehicleNumber: category === "Vehicle Insurance" ? Yup.string().required("Vehicle number is required.") : Yup.string(),
        accidentDate: category === "Vehicle Insurance"
            ? Yup.date()
                .required("Accident date is required.")
                .test("is-valid-date", "Accident date must not be in the future.", function (value) {
                    return value && new Date(value) <= new Date();
                })
                .test("is-after-assigned", "Accident date must be after the assigned date.", function (value) {
                    return value && new Date(value) > new Date(policy.assignedDate);
                })
            : Yup.date(),
        damageDescription: category === "Vehicle Insurance" ? Yup.string().required("Description of damage is required.") : Yup.string(),
        policyHolderName: category === "Life Insurance" ? Yup.string().required("Policy holder name is required.") : Yup.string(),
        policyNumber: category === "Life Insurance" ? Yup.string().required("Policy number is required.") : Yup.string(),
        claimReason: Yup.string().required("Reason for claim is required."),
        documents: Yup.mixed().required("Document upload is required."),
    });

    const onSubmit = async (values) => {
        const data = {
            orderId: policy.orderId,
            userId: policy.userId,
            policyId: policy.policyDetails.policyId,
            status: 'PENDING',
            reason: values.claimReason,
        }
        const response = await ClaimService.applyForClaims({ data })
        if (response.status === "error") {
            setErrorMessage(response.errorMessage)
        } else {
            alert("Claims Raised Success");
            navigate("/users")
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Apply for Claim</h2>
            <div className="mb-3">
                <p><strong>Order ID:</strong> {policy.orderId}</p>
                <p><strong>Assigned Date:</strong> {policy.assignedDate.split("T")[0]}</p>
                <p><strong>Policy Name:</strong> {policy.policyDetails.policyName}</p>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">
                                Policy Category (Just to show during presentation)
                            </label>
                            <Field
                                as="select"
                                name="category"
                                className="form-select"
                                onChange={(e) => {
                                    setFieldValue("category", e.target.value);
                                    setCategory(e.target.value);
                                }}
                            >
                                <option value="">Select a category</option>
                                <option value="Health Insurance">Health Insurance</option>
                                <option value="Vehicle Insurance">Vehicle Insurance</option>
                                <option value="Life Insurance">Life Insurance</option>
                            </Field>
                            <ErrorMessage name="category" component="div" className="text-danger" />
                        </div>

                        {getQuestions().map((question) => (
                            <div className="mb-3" key={question.name}>
                                <label htmlFor={question.name} className="form-label">
                                    {question.label}
                                </label>
                                {question.type === "textarea" ? (
                                    <Field
                                        as="textarea"
                                        name={question.name}
                                        className="form-control"
                                    />
                                ) : (
                                    <Field
                                        type={question.type}
                                        name={question.name}
                                        className="form-control"
                                    />
                                )}
                                <ErrorMessage
                                    name={question.name}
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                        ))}

                        <div className="mb-3">
                            <label htmlFor="documents" className="form-label">
                                Upload Documents
                            </label>
                            <input
                                id="documents"
                                name="documents"
                                type="file"
                                className="form-control"
                                onChange={(event) => {
                                    setFieldValue("documents", event.currentTarget.files[0]);
                                }}
                            />
                            <ErrorMessage name="documents" component="div" className="text-danger" />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                        {errorMessage && <p className=" text-danger">{errorMessage}</p>}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

ApplyClaimForm.propTypes = {
    policy: PropTypes.shape({
        orderId: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        assignedDate: PropTypes.string.isRequired,
        policyDetails: PropTypes.shape({
            policyId: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            policyName: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default ApplyClaimForm;
