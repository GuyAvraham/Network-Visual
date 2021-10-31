export const returnCurrentNodeColor = (status: string) => {
  switch (status) {
    case "bad": {
      return "red";
    }
    case "good": {
      return "green";
    }
    case "suspicious": {
      return "orange";
    }
    default: {
      return "#1F95FF";
    }
  }
};
