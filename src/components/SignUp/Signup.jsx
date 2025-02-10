import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthService } from "../../api/authApi";
import { useUser } from "../../config/context/userContext";

const SignUpComponent = () => {

    const { setUser } = useUser()
    const setWithExpiry = (key, value, expiryInHours) => {
        const now = new Date();
        const expiryTime = now.getTime() + expiryInHours * 60 * 60 * 1000; // Convert hours to milliseconds
        const item = {
          value: value,
          expiry: expiryTime,
        };
        localStorage.setItem(key, JSON.stringify(item));
      };
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            age: "",
            income: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is mandatory"),
            email: Yup.string().email("Invalid email address").required("Email is mandatory"),
            password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is mandatory"),
            age: Yup.number()
                .required("Age is mandatory")
                .min(21, "You must be at least 21 years old")
                .max(55, "You can't be older than 55 years old"),
            income: Yup.number().required("Income is mandatory"),
        }),
        onSubmit: async (values) => {
            const signupsubmit = await AuthService.signUp(values);
            console.log("response after signup", signupsubmit);
            if (signupsubmit.status === "error") {
                alert(signupsubmit.message)
            } else {
                setUser(signupsubmit.data.user);
                await setWithExpiry('user', signupsubmit.data.user, 23);
                alert("Signup Successful")
            }

        },
    });

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100 bg-light p-0 mt-5"
        >
            <div className="card shadow" style={{ width: "28rem" }}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Sign Up</h3>

                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className={`form-control ${formik.touched.name && formik.errors.name ? "is-invalid" : ""}`}
                                id="name"
                                placeholder="Enter your name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="invalid-feedback">{formik.errors.name}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
                                id="email"
                                placeholder="Enter your email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="invalid-feedback">{formik.errors.email}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
                                id="password"
                                placeholder="Enter your password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="invalid-feedback">{formik.errors.password}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">
                                Age
                            </label>
                            <input
                                type="number"
                                className={`form-control ${formik.touched.age && formik.errors.age ? "is-invalid" : ""}`}
                                id="age"
                                placeholder="Enter your age"
                                value={formik.values.age}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.age && formik.errors.age ? (
                                <div className="invalid-feedback">{formik.errors.age}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="income" className="form-label">
                                Income
                            </label>
                            <input
                                type="number"
                                className={`form-control ${formik.touched.income && formik.errors.income ? "is-invalid" : ""}`}
                                id="income"
                                placeholder="Enter your income"
                                value={formik.values.income}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.income && formik.errors.income ? (
                                <div className="invalid-feedback">{formik.errors.income}</div>
                            ) : null}
                        </div>

                        <button type="submit" className="btn btn-primary w-100 mb-2">
                            Sign Up
                        </button>

                    </form>
                    <div className="text-center mt-3">
                        <a href="/login">
                            <button className="btn btn-secondary w-100">
                                Already have an account? Sign In
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpComponent;
