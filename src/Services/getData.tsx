import { requestGoals } from "./GoalsRequests";

const getData = async (token: string, dispatch) => {
  const goals = await requestGoals(token);
  dispatch({ type: "put", goals: goals });
};

export default getData;
