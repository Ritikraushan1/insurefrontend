import { useFormik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthService } from "../../api/authApi";
import { useUser } from "../../config/context/userContext";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
    const navigate = useNavigate()

    const setWithExpiry = (key, value, expiryInHours) => {
        const now = new Date();
        const expiryTime = now.getTime() + expiryInHours * 60 * 60 * 1000; // Convert hours to milliseconds
        const item = {
          value: value,
          expiry: expiryTime,
        };
        localStorage.setItem(key, JSON.stringify(item));
      };

    const { setUser } = useUser()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is mandatory"),
            password: Yup.string().required("Password is mandatory"),
        }),
        onSubmit: async (values) => {
            const loginSubmit = await AuthService.login(values);
            if (loginSubmit.status === "error") {
                alert(loginSubmit.message)
            } else {
                console.log("Login details", loginSubmit);
                await setWithExpiry('user', loginSubmit.data.user, 23);
                setUser(loginSubmit.data.user);
                navigate("/");
                alert("Login Success", loginSubmit)
            }
        },
    });


    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100 bg-light"
        >
            <div className="card shadow" style={{ width: "24rem" }}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Login</h3>

                    <form onSubmit={formik.handleSubmit}>
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

                        <button type="submit" className="btn btn-primary w-100 mb-2">
                            Login
                        </button>

                        <div className="text-center">
                            <a href="#" className="text-decoration-none" onClick={() => navigate("/forgot-password")}>
                                Forgot password?
                            </a>
                        </div>
                    </form>

                    <div className="text-center mt-3">
                        <a href="/signup">
                            <button className="btn btn-secondary w-100">
                                Don’t have an account? Sign up
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
