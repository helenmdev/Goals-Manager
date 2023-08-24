import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { requestGoals } from "../Services/GoalsRequests";
import { useNotifications } from "reapop";
import { ContextGoals } from "../Services/Memory/Goals";

const useGetGoals = (token: string, id:number): void => {
  const navigate = useNavigate();
  const { notify } = useNotifications();
  const [, dispatch] = useContext(ContextGoals);

  useEffect(() => {
    const handleUnauthorized = () => {
      localStorage.removeItem("token");
      navigate("/login");
      notify("Unauthorized user, please log in", "error");
    };

    const getGoals = async (): Promise<void> => {
      try {
        const goals = await requestGoals(token, id);
        return dispatch({ type: "put", goals });
      } catch (error) {
        if (error.message === "UnauthorizedError") {
          handleUnauthorized();
        } else {
          console.error("An error occurred while getting goals:", error);
          handleUnauthorized();
        }
      }
    };
    getGoals();
  }, [dispatch, id, navigate, notify, token]);
};

export default useGetGoals;
