import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const useAdminAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("@DownTown:Token");

    if (!token) {
      navigate("/login");
    } else {
      try {
        const decoded: any = jwt_decode(token);

        if (!decoded || !decoded.isAdmin) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error decoding JWT:", error);
        navigate("/login");
      }
    }
  }, [navigate]);
};

export default useAdminAuth;
