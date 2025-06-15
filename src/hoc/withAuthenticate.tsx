import { getToken } from "@/utils/helpers";
import { useEffect, type JSX } from "react";
import { useNavigate } from "react-router-dom";

function withAuthProtection(WrappedComponent : () => JSX.Element) {
  const ProtectedComponent = () => {
    const navigate = useNavigate();

    useEffect(() => {
      let token = getToken();
      if (!token) {
        navigate("/login");
        return;
      }
    }, []);

    return <WrappedComponent />;
  };
  return ProtectedComponent;
}

export default withAuthProtection;
