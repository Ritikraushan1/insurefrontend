import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = () => {
    const { loginWithRedirect } = useAuth0();

    return (
    <>
    <div className=" py-5 vh-100 justify-center">
        <button onClick={() => loginWithRedirect()} className="py-5">Log In</button>
    </div>
    </>
    )
};

export default Dashboard