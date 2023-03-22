export const requestGoals = () => {
  return fetch("api/goals")
    .then((response) => response.json())
    .then((goals) => goals);
};

export const requestGoal = (id) => {
  return fetch(`api/goals${id}`)
    .then((response) => response.json())
    .then((goal) => goal);
}

export const createGoal = (goal) => {
    return fetch('api/goals', {
        method: 'POST',
        body: JSON.stringify(goal),
        headers: {
            'content-type':'application/json; charset=UTF-8'
        }
    })
      .then((response) => response.json())
      .then((createdGoal) => createdGoal);
  }

  export const updateGoal = async (goal) => {

    return fetch(`/api/goals/${goal.id}`, {
          method: 'PUT',
          body: JSON.stringify(goal),
          headers: {
              'content-type': 'application/json; charset=UTF-8'
          }
      })
     .then((response) => response.json())
     .then((goalUpdate) => goalUpdate);
  }

  export const deleteGoal = async (id) => {
    await fetch(`/api/goals/${id}`, {
      method: 'DELETE'
    });
  };

