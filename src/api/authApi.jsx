

import axios from 'axios';

const login = async (loginData) => {
    console.log("reaching in api login with", loginData);

    const url = `${import.meta.env.VITE_APP_SERVER_URL}/auth/login`;
    console.log("url", url);


    try {
        const response = await axios.post(url, loginData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Return success status and data
        return {
            status: 'success',
            data: response.data,
        };
    } catch (error) {
        // Extract error message based on Axios response or default to a generic message
        let errorMessage;

        if (error.response) {
            // Handle HTTP errors based on response status
            switch (error.response.status) {
                case 400:
                    errorMessage = 'Invalid email or password.';
                    break;
                case 401:
                    errorMessage = 'Unauthorized access. Please check your credentials.';
                    break;
                case 500:
                    errorMessage = 'Server error. Please try again later.';
                    break;
                default:
                    errorMessage = 'An unexpected error occurred. Please try again.';
            }
        } else if (error.request) {
            // Handle errors where no response was received
            errorMessage = 'No response received. Please check your network connection.';
        } else {
            // Handle other types of errors
            errorMessage = error.message || 'An unknown error occurred.';
        }

        return {
            status: 'error',
            message: errorMessage,
        };
    }
};

const signUp = async (signUpData) => {
    console.log("reaching in api login with", signUpData);
    const requestData = {
        name: signUpData.name,
        email: signUpData.email,
        age: signUpData.age,
        income: signUpData.income,
        password: signUpData.password,
        role: "user"
    }

    const url = `${import.meta.env.VITE_APP_SERVER_URL}/auth/signup`;
    console.log("url", url);


    try {
        const response = await axios.post(url, requestData, {
            withCredentials: true,
        })
        console.log("response", response);

        return {
            status: 'success',
            data: response.data,
        };
    } catch (error) {
        // Extract error message based on Axios response or default to a generic message
        let errorMessage;


        if (error.response) {
            console.log("error response", error.response);

            // Handle HTTP errors based on response status
            switch (error.response.status) {
                case 400:
                    errorMessage = error.response.data.error;
                    break;
                case 401:
                    errorMessage = error.response.data.error;
                    break;
                case 500:
                    errorMessage = error.response.data.error;
                    break;
                default:
                    errorMessage = "An error ocurred during signup";
            }
        } else if (error.request) {
            // Handle errors where no response was received
            errorMessage = 'No response received. Please check your network connection.';
        } else {
            // Handle other types of errors
            errorMessage = error.message || 'An unknown error occurred.';
        }

        return {
            status: 'error',
            message: errorMessage,
        };
    }
};

const sendOtp = async ({ email }) => {
    const url = `${import.meta.env.VITE_APP_SERVER_URL}/auth/send-otp`;
    console.log("url", url);
    let requestData = {
        email
    }
    try {
        const response = await axios.post(url, requestData, {
            withCredentials: true,
        })
        console.log("response after sending otp", response);

        return {
            status: 'success',
            data: response.data,
        };
    } catch (error) {
        // Extract error message based on Axios response or default to a generic message
        let errorMessage;


        if (error.response) {
            console.log("error response", error.response);

            // Handle HTTP errors based on response status
            switch (error.response.status) {
                case 400:
                    errorMessage = error.response.data.error;
                    break;
                case 401:
                    errorMessage = error.response.data.error;
                    break;
                case 500:
                    errorMessage = error.response.data.error;
                    break;
                default:
                    errorMessage = "An error ocurred during signup";
            }
        } else if (error.request) {
            // Handle errors where no response was received
            errorMessage = 'No response received. Please check your network connection.';
        } else {
            // Handle other types of errors
            errorMessage = error.message || 'An unknown error occurred.';
        }

        return {
            status: 'error',
            message: errorMessage,
        };
    }
}

const verifyOtp = async (email, otp) => {
    const url = `${import.meta.env.VITE_APP_SERVER_URL}/auth/verify-otp`;
    console.log("url", url);
    let requestData = {
        email,
        otp
    }
    try {
        const response = await axios.post(url, requestData, {
            withCredentials: true,
        })
        console.log("response after verifying otp", response);

        return {
            status: 'success',
            data: response.data,
        };
    } catch (error) {
        // Extract error message based on Axios response or default to a generic message
        let errorMessage;


        if (error.response) {
            console.log("error response", error.response);

            // Handle HTTP errors based on response status
            switch (error.response.status) {
                case 400:
                    errorMessage = error.response.data.error;
                    break;
                case 401:
                    errorMessage = error.response.data.error;
                    break;
                case 500:
                    errorMessage = error.response.data.error;
                    break;
                default:
                    errorMessage = "An error ocurred during signup";
            }
        } else if (error.request) {
            // Handle errors where no response was received
            errorMessage = 'No response received. Please check your network connection.';
        } else {
            // Handle other types of errors
            errorMessage = error.message || 'An unknown error occurred.';
        }

        return {
            status: 'error',
            message: errorMessage,
        };
    }
}

const forgotPassword = async (email, password) => {
    const url = `${import.meta.env.VITE_APP_SERVER_URL}/auth/forgot-password`;
    console.log("url", url);
    let requestData = {
        email,
        password
    }
    try {
        const response = await axios.post(url, requestData, {
            withCredentials: true,
        })
        console.log("response after forgetting password", response);

        return {
            status: 'success',
            data: response.data,
        };
    } catch (error) {
        // Extract error message based on Axios response or default to a generic message
        let errorMessage;


        if (error.response) {
            console.log("error response", error.response);

            // Handle HTTP errors based on response status
            switch (error.response.status) {
                case 400:
                    errorMessage = error.response.data.error;
                    break;
                case 401:
                    errorMessage = error.response.data.error;
                    break;
                case 500:
                    errorMessage = error.response.data.error;
                    break;
                default:
                    errorMessage = "An error ocurred during signup";
            }
        } else if (error.request) {
            // Handle errors where no response was received
            errorMessage = 'No response received. Please check your network connection.';
        } else {
            // Handle other types of errors
            errorMessage = error.message || 'An unknown error occurred.';
        }

        return {
            status: 'error',
            message: errorMessage,
        };
    }
}

const logout = async () => {
    const url = `${import.meta.env.VITE_APP_SERVER_URL}/auth/logout`;
    console.log("url", url);
    try {
        const response = await axios.post(url, {}, {
            withCredentials: true,
        })
        console.log("response", response);

        return {
            status: 'success',
            data: response.data,
        };
    } catch (error) {
        // Extract error message based on Axios response or default to a generic message
        let errorMessage;


        if (error.response) {
            console.log("error response", error.response);

            // Handle HTTP errors based on response status
            switch (error.response.status) {
                case 400:
                    errorMessage = error.response.data.error;
                    break;
                case 401:
                    errorMessage = error.response.data.error;
                    break;
                case 500:
                    errorMessage = error.response.data.error;
                    break;
                default:
                    errorMessage = "An error ocurred during signup";
            }
        } else if (error.request) {
            // Handle errors where no response was received
            errorMessage = 'No response received. Please check your network connection.';
        } else {
            // Handle other types of errors
            errorMessage = error.message || 'An unknown error occurred.';
        }

        return {
            status: 'error',
            message: errorMessage,
        };
    }
}


export const AuthService = { login, signUp, logout, sendOtp, verifyOtp, forgotPassword }