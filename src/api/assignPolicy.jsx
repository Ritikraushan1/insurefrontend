import axios from 'axios';

const buyNewPolicy = async ({ data }) => {
    const url = `${import.meta.env.VITE_APP_SERVER_URL}/assign-policy`;
    console.log("url", url);

    try {
        const response = await axios.post(url, data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Return success status and data
        return {
            status: 'success',
            data: response.data,
            message:"You have successfully bought this policy"
        };
    } catch (error) {
        // Extract error message based on Axios response or default to a generic message
        let errorMessage = 'An unexpected error occurred. Please try again.';

        if (error.response) {
            const { status, data } = error.response;

            // Extract backend error message if available
            if (data && data.error) {
                errorMessage = data.error;
            } else {
                // Handle HTTP errors based on status codes
                switch (status) {
                    case 400:
                        errorMessage = 'Invalid request. Please check your input.';
                        break;
                    case 401:
                        errorMessage = 'Unauthorized access. Please log in again.';
                        break;
                    case 404:
                        errorMessage = 'Resource not found. Please try again.';
                        break;
                    case 500:
                        errorMessage = 'Internal server error. Please try again later.';
                        break;
                    default:
                        errorMessage = `Unexpected error: ${status}. Please try again.`;
                }
            }
        } else if (error.request) {
            // Handle network errors or no response
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
const getAssignedPolicyForUser = async () => {
    let url = `${import.meta.env.VITE_APP_SERVER_URL}/assign-policy/for-users`;
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
        // Improved error handling
        let errorMessage;
        console.log("Error in getting policy:", error);

        if (error.response) {
            // If error.response exists, we can handle HTTP error codes
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
                    errorMessage = `An unexpected error occurred. Status: ${error.response.status}`;
            }
        } else if (error.request) {
            // Handle if no response was received
            errorMessage = 'No response received. Please check your network connection.';
        } else {
            // General error message for other types of errors
            errorMessage = `Error: ${error.message || 'Unknown error occurred.'}`;
        }

        return {
            status: 'error',
            message: errorMessage,
        };
    }
};


export const BuyPolicyService = { buyNewPolicy, getAssignedPolicyForUser };
