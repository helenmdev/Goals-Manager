import { requestGoals } from "./GoalsRequests";

const getData = async (token: any, id:number, dispatch) => {
  const goals = await requestGoals(token, id);
  dispatch({ type: "put", goals: goals });
};

export default getData;
