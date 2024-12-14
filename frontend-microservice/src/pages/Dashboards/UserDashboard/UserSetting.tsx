import PrimaryButton from "../../../components/Button/PrimaryButton";
import { useNavigate } from "react-router-dom";

export const UserSetting = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clears the local storage
    navigate("/"); // Redirects to the home page
  };
  return (
    <>
      <div>UserSetting</div>
      <div className="mt-4">
        <PrimaryButton title={"Logout"} onClick={handleLogout} />
      </div>
    </>
  );
};
