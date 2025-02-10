import axios from "axios";

const addNewPolicy = async (policyData) => {
    let url = `${import.meta.env.VITE_APP_SERVER_URL}/policy`;
    console.log("url", url);

    try {
        const response = await axios.post(url, policyData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return {
            status: 'success',
            data: response.data,
        };
    } catch (error) {
        let errorMessage;

        if (error.response) {
            switch (error.response.status) {
                case 401:
                    errorMessage = 'Unauthorized access. You do not have permission to add a policy.';
                    break;
                case 400:
                    errorMessage = 'Invalid data provided. Please check the policy details.';
                    break;
                case 500:
                    errorMessage = 'Server error. Please try again later.';
                    break;
                default:
                    errorMessage = 'An unexpected error occurred. Please try again.';
            }
        } else if (error.request) {
            errorMessage = 'No response received. Please check your network connection.';
        } else {
            errorMessage = error.message || 'An unknown error occurred.';
        }

        return {
            status: 'error',
            message: errorMessage,
        };
    }
};

const getAllPolicy = async () => {
    let url = `${import.meta.env.VITE_APP_SERVER_URL}/policy`;
    console.log("url", url);

    try {
        const response = await axios.get(url, {
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
                    errorMessage = 'Bad request. Please check the request parameters.';
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
}


const getAllActivePolicy = async () => {
    let url = `${import.meta.env.VITE_APP_SERVER_URL}/policy/active`;
    console.log("url", url);

    try {
        const response = await axios.get(url, {
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
                    errorMessage = 'Bad request. Please check the request parameters.';
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
}

const getPolicyById = async (policyId) => {
    let url = `${import.meta.env.VITE_APP_SERVER_URL}/policy/${policyId}`;
    console.log("url", url);

    try {
        const response = await axios.get(url, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return {
            status: 'success',
            data: response.data,
        };
    } catch (error) {
        let errorMessage;

        if (error.response) {
            switch (error.response.status) {
                case 404:
                    errorMessage = 'Policy not found.';
                    break;
                case 500:
                    errorMessage = 'Server error. Please try again later.';
                    break;
                default:
                    errorMessage = 'An unexpected error occurred. Please try again.';
            }
        } else if (error.request) {
            errorMessage = 'No response received. Please check your network connection.';
        } else {
            errorMessage = error.message || 'An unknown error occurred.';
        }

        return {
            status: 'error',
            message: errorMessage,
        };
    }
};

const getPoliciesByCategory = async (category) => {
    let url = `${import.meta.env.VITE_APP_SERVER_URL}/policy/category/${category}`;
    console.log("url", url);

    try {
        const response = await axios.get(url, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return {
            status: 'success',
            data: response.data,
        };
    } catch (error) {
        let errorMessage;

        if (error.response) {
            switch (error.response.status) {
                case 404:
                    errorMessage = 'No policies found for this category.';
                    break;
                case 500:
                    errorMessage = 'Server error. Please try again later.';
                    break;
                default:
                    errorMessage = 'An unexpected error occurred. Please try again.';
            }
        } else if (error.request) {
            errorMessage = 'No response received. Please check your network connection.';
        } else {
            errorMessage = error.message || 'An unknown error occurred.';
        }

        return {
            status: 'error',
            message: errorMessage,
        };
    }
};

const updatePolicy = async (policyId, policyData) => {
    let url = `${import.meta.env.VITE_APP_SERVER_URL}/policy/${policyId}`;
    console.log("url", url);

    try {
        const response = await axios.put(url, policyData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return {
            status: 'success',
            data: response.data,
        };
    } catch (error) {
        let errorMessage;

        if (error.response) {
            switch (error.response.status) {
                case 401:
                    errorMessage = 'Unauthorized access. You do not have permission to update this policy.';
                    break;
                case 404:
                    errorMessage = 'Policy not found.';
                    break;
                case 500:
                    errorMessage = 'Server error. Please try again later.';
                    break;
                default:
                    errorMessage = 'An unexpected error occurred. Please try again.';
            }
        } else if (error.request) {
            errorMessage = 'No response received. Please check your network connection.';
        } else {
            errorMessage = error.message || 'An unknown error occurred.';
        }

        return {
            status: 'error',
            message: errorMessage,
        };
    }
};

const updatePolicyStatus = async (policyId, isActive) => {
    let url = `${import.meta.env.VITE_APP_SERVER_URL}/policy/${policyId}/status`;
    console.log("url", url);

    try {
        const response = await axios.patch(url, { isActive }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return {
            status: 'success',
            data: response.data,
        };
    } catch (error) {
        let errorMessage;

        if (error.response) {
            switch (error.response.status) {
                case 401:
                    errorMessage = 'Unauthorized access. You do not have permission to update the policy status.';
                    break;
                case 404:
                    errorMessage = 'Policy not found.';
                    break;
                case 500:
                    errorMessage = 'Server error. Please try again later.';
                    break;
                default:
                    errorMessage = 'An unexpected error occurred. Please try again.';
            }
        } else if (error.request) {
            errorMessage = 'No response received. Please check your network connection.';
        } else {
            errorMessage = error.message || 'An unknown error occurred.';
        }

        return {
            status: 'error',
            message: errorMessage,
        };
    }
};

const deletePolicy = async (policyId) => {
    let url = `${import.meta.env.VITE_APP_SERVER_URL}/policy/${policyId}`;
    console.log("url", url);

    try {
        const response = await axios.delete(url, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return {
            status: 'success',
            data: response.data,
        };
    } catch (error) {
        let errorMessage;

        if (error.response) {
            switch (error.response.status) {
                case 401:
                    errorMessage = 'Unauthorized access. You do not have permission to delete this policy.';
                    break;
                case 404:
                    errorMessage = 'Policy not found.';
                    break;
                case 500:
                    errorMessage = 'Server error. Please try again later.';
                    break;
                default:
                    errorMessage = 'An unexpected error occurred. Please try again.';
            }
        } else if (error.request) {
            errorMessage = 'No response received. Please check your network connection.';
        } else {
            errorMessage = error.message || 'An unknown error occurred.';
        }

        return {
            status: 'error',
            message: errorMessage,
        };
    }
};



export const PolicyService = { getAllPolicy, getPolicyById, getAllActivePolicy, addNewPolicy, getPoliciesByCategory, updatePolicy, updatePolicyStatus, deletePolicy }