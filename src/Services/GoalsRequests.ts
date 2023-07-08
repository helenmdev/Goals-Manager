import { GoalType } from "../Types/GoalType";

export const requestGoals = async (token: any): Promise<GoalType[]> => {
  try {
    const response = await fetch("/api/goals", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      throw new Error("UnauthorizedError");
    }
    const goals = await response.json();
    return goals;
  } catch (error) {
    throw error;
  }
};

export const createGoal = async (
  goal: GoalType,
  token: string
): Promise<GoalType> => {
  try {
    const response = await fetch("api/goals", {
      method: "POST",
      body: JSON.stringify(goal),
      headers: {
        "content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    const createdGoal = await response.json();
    if (response.status === 401) {
      throw new Error("UnauthorizedError");
    }
    return createdGoal;
  } catch (error) {
    throw new Error("UnauthorizedError");
  }
};

export const updateGoal = async (
  goal: GoalType,
  token: any
): Promise<GoalType> => {
  try {
    const response = await fetch(`/api/goals/${goal.id}`, {
      method: "PUT",
      body: JSON.stringify(goal),
      headers: {
        "content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    const updatedGoal = await response.json();
    if (response.status === 401) {
      throw new Error("UnauthorizedError");
    }
    return updatedGoal;
  } catch (error) {
    if (error.status === 401) {
      throw new Error("UnauthorizedError");
    }
  }
};

export const deleteGoal = async (id: number, token: any): Promise<void> => {
  try {
    const response = await fetch(`/api/goals/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 401) {
      throw new Error("UnauthorizedError");
    }
  } catch (error) {
    if (error.status === 401) {
      throw new Error("UnauthorizedError");
    }
  }
};
