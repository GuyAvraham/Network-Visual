export const returnCurrentNodeColor = (inputValue: string) => {
  switch (inputValue) {
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

export const returnCurrentNodeColorFor2D = (
  isBuyer: boolean,
  isSeller: boolean,
  colorForBuyer: string,
  colorForSeller: string,
  colorForBuyerAndSeller: string,
  colorForOther: string
) => {
  if (isBuyer && isSeller) {
    return colorForBuyerAndSeller || 0;
  } else if (isBuyer && !isSeller) {
    return colorForBuyer || 0;
  } else if (!isBuyer && isSeller) {
    return colorForSeller || 0;
  } else if (!isBuyer && !isSeller) {
    return colorForOther || 0;
  }
};
