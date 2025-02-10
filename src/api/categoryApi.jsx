import axios from "axios";

const getAllCategory = async () => {
    const url = `${import.meta.env.VITE_APP_SERVER_URL}/category`;
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
};


export const CategoryService = { getAllCategory }