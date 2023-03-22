

export const Verify = (form) => {


    let allconditions = true;
    let condition1 = true
    let condition2 = true
    let condition3 = true

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const formattoday = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;

    if (formattoday > form.duedate) {
      condition1=false
      allconditions = false;
    }

    if (form.complete > form.goal) {
        condition2=false
      allconditions = false;
    }

    if (form.details.length === 0) {
        condition3 = false
      allconditions = false;
    }

    return { allconditions, condition1, condition2, condition3 };
  };