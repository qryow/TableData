export const reducer = (state, action) => {
  switch (action.type) {
    case "startLoading":
      return { ...state, loading: true };
    case "getData":
      return {
        ...state,
        data: action.payload,
        sortedData: action.payload,
        loading: false,
        searchData: "",
        oneData: "",
        sortOrders: {
          firstName: 0,
          lastName: 0,
          id: 0,
          email: 0,
          phone: 0,
        },
        currentPage: 1,
      };
    case "sortData":
      return {
        ...state,
        sortedData: action.payload.sortedData,
        sortOrders: action.payload.sortOrders,
      };
    case "setSearchQuery":
      return {
        ...state,
        searchData: action.payload,
        currentPage: 1,
      };
    case "setCurrentPage":
      return {
        ...state,
        currentPage: action.payload,
      };
    case "setOneData":
      return {
        ...state,
        oneData: action.payload,
      };
    default:
      return state;
  }
};

export const compareValues = (a, b) => {
  if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b);
  }
  return a - b;
};
