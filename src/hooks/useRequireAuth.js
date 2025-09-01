import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function useRequireAuth() {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/logIn", { replace: true });
      } else {
        setReady(true); 
      }
    }
  }, [user, loading, navigate]);

  if (loading || !ready) return null;

  return user;
}
