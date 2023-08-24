import { GoalType } from "../Types/GoalType";
import API from "./api";

const axiosConfig = (token: string, userid: number) => ({
  headers: {
    "content-type": "application/json; charset=UTF-8",
    Authorization: `Bearer ${token}`,
    'user-id': userid,
  },
});


const handleUnauthorizedError = () => {
  throw new Error("UnauthorizedError");
};

export const requestGoals = async (token: string, userid: number): Promise<GoalType[]> => {

  try {
    const response = await API.get("/goals", axiosConfig(token, userid));
    return response.data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Network error occurred. Check your internet connection.");
    }
    throw error;
  }
};

export const createGoal = async (goal: GoalType, token: string, userid:number): Promise<GoalType> => {
  try {
    const response = await API.post("/goals", goal, axiosConfig(token, userid));
    return response.data;
  } catch (error) {
    handleUnauthorizedError();
  }
};


export const updateGoal = async (goal: GoalType, token: string, userid: number): Promise<GoalType> => {
  try {
    const response = await API.put(`/goals/${goal.id}`, goal, axiosConfig(token, userid));

    const updatedGoal: GoalType = response.data;
    return updatedGoal;
  } catch (error) {
    console.error("An error occurred while updating the goal:", error);
    handleUnauthorizedError();
    throw error;
  }
};


export const deleteGoal = async (id: GoalType, token: string,  userid: number): Promise<void> => {
  try {
    await API.delete(`/goals/${id}`, axiosConfig(token, userid));
  } catch (error) {
    handleUnauthorizedError();
  }
};
