import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CategoryService } from "../../../api/categoryApi";
import "bootstrap/dist/css/bootstrap.min.css";
import { PolicyService } from "../../../api/policyApi";

const AddPolicy = () => {
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

  const initialValues = {
    policyName: "",
    premiumAmount: "",
    duration: "",
    description: "",
    category: "",
    coverage: "",
    validAge: "",
    isActive: true,
  };

  const validationSchema = Yup.object({
    policyName: Yup.string().required("Policy Name is required"),
    premiumAmount: Yup.string().required("Premium Amount is required"),
    duration: Yup.number().required("Duration is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    coverage: Yup.string().required("Coverage is required"),
    validAge: Yup.string().required("Valid Age is required"),
  });

  const handleSubmit = async(values, { resetForm }) => {
    console.log("Form Data:", values);
    const submitForm = await PolicyService.addNewPolicy(values);
    if(submitForm.status==='success'){
        alert("Policy added")
    }else{
        alert(`${submitForm.error}`)
    }
    resetForm();
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light py-5">
      <div className="card shadow" style={{ width: "24rem" }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Add Policy</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
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
                  <Field type="text" name="premiumAmount" className="form-control" />
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

                <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddPolicy;
