import { createContext, useContext, useState, useEffect } from 'react';

// Create the UserContext
const UserContext = createContext();

// Helper function to retrieve data with expiry
const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    // Check if the stored data has expired
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key); // Remove the expired data
        return null;
    }

    return item.value; // Return the valid data
};

// Create the UserProvider to provide the context to components
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Initializing user state

    useEffect(() => {
        // Use getWithExpiry to retrieve the user data
        const storedUser = getWithExpiry('user'); // Replace 'user' with your key
        if (storedUser) {
            setUser(storedUser); // Set the valid user data into the state
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
