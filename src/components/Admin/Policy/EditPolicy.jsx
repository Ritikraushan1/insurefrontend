import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CategoryService } from "../../../api/categoryApi";
import { PolicyService } from "../../../api/policyApi";
import "bootstrap/dist/css/bootstrap.min.css";

const EditPolicy = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const policyData = location.state?.policyData || {}; // Get policy data from navigation state
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await CategoryService.getAllCategory();
                if (response.status === "success") {
                    setCategories(response.data.categories);
                }
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };
        fetchCategory();
    }, []);

    const validationSchema = Yup.object({
        policyName: Yup.string().required("Policy Name is required"),
        premiumAmount: Yup.number().required("Premium Amount is required"),
        duration: Yup.number().required("Duration is required"),
        description: Yup.string().required("Description is required"),
        category: Yup.string().required("Category is required"),
        coverage: Yup.string().required("Coverage is required"),
        validAge: Yup.string().required("Valid Age is required"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            console.log("Updating Policy:", values);
            await PolicyService.updatePolicy(policyData.policyId, values);
            alert("Policy updated successfully!");
            navigate("/policy/all-policy"); // Redirect to policy list
        } catch (error) {
            console.error("Error updating policy", error);
            alert("Failed to update policy.");
        }
        setSubmitting(false);
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-light py-5">
            <div className="card shadow" style={{ width: "30rem" }}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Edit Policy</h3>
                    <Formik
                        initialValues={{
                            policyName: policyData.policyName || "",
                            premiumAmount: policyData.premiumAmount || "",
                            duration: policyData.duration || "",
                            description: policyData.description || "",
                            category: policyData.category || "",
                            coverage: policyData.coverage || "",
                            validAge: policyData.validAge || "",
                            isActive: policyData.isActive || true,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize // Reinitialize form when data changes
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="mb-3">
                                    <label className="form-label">Policy Name</label>
                                    <Field type="text" name="policyName" className="form-control" />
                                    <ErrorMessage name="policyName" component="div" className="text-danger" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Premium Amount</label>
                                    <Field type="number" name="premiumAmount" className="form-control" />
                                    <ErrorMessage name="premiumAmount" component="div" className="text-danger" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Duration</label>
                                    <Field type="number" name="duration" className="form-control" />
                                    <ErrorMessage name="duration" component="div" className="text-danger" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <Field as="textarea" name="description" className="form-control" />
                                    <ErrorMessage name="description" component="div" className="text-danger" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Category</label>
                                    <Field as="select" name="category" className="form-control">
                                        <option value="">Select Category</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="category" component="div" className="text-danger" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Coverage</label>
                                    <Field type="text" name="coverage" className="form-control" />
                                    <ErrorMessage name="coverage" component="div" className="text-danger" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Valid Age</label>
                                    <Field type="text" name="validAge" className="form-control" />
                                    <ErrorMessage name="validAge" component="div" className="text-danger" />
                                </div>

                                <div className="mb-3 form-check">
                                    <Field type="checkbox" name="isActive" className="form-check-input" />
                                    <label className="form-check-label">Is Active</label>
                                </div>

                                <button type="submit" className="btn btn-success w-100" disabled={isSubmitting}>
                                    {isSubmitting ? "Updating..." : "Update Policy"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default EditPolicy;
