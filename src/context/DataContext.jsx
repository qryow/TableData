import { bigDataAPI, lowDataAPI } from "@/helpers/const";
import { compareValues } from "@/helpers/functions";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import axios from "axios";
import { createContext, useReducer } from "react";

export const dataContext = createContext();

const DataContextProvider = ({ children }) => {
  //* потом перенесу в константы
  const INIT_STATE = {
    data: [],
    sortedData: [],
    loading: false,
    sortOrders: {
      firstName: 0,
      lastName: 0,
      id: 0,
      email: 0,
      phone: 0,
    },
    searchData: "",
    currentPage: 1,
    itemsPerPage: 50,
  };

  //* потом перенесу в фунции
  const reducer = (state, action) => {
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

  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getLowData = async () => {
    dispatch({ type: "startLoading" });
    const { data } = await axios(lowDataAPI);
    dispatch({
      type: "getData",
      payload: data,
    });
  };

  const getBigData = async () => {
    dispatch({ type: "startLoading" });
    const { data } = await axios(bigDataAPI);
    dispatch({
      type: "getData",
      payload: data,
    });
  };

  //* потом можно оптимизировать в данную функцию
  //const fetchData = async (api) => {
  //  dispatch({ type: "startLoading" });
  //  const { data } = await axios(api);
  //  dispatch({ type: "getData", payload: data });
  //};

  //* используем эти константы в самом компоненте лист
  //const getLowData = () => fetchData(lowDataAPI);
  //const getBigData = () => fetchData(bigDataAPI);

  const setOneData = (data) => {
    dispatch({
      type: "setOneData",
      payload: data,
    });
  };

  //* с начало напишем так
  const sortData = (key) => {
    const newSortOrder = (state.sortOrders[key] + 1) % 3;
    const sorted = [...state.data];

    //* проверка, если цифра равно 1 то сортировка по возрастанию
    if (newSortOrder === 1) {
      sorted.sort((a, b) =>
        typeof a[key] === "string"
          ? //* если a должно быть спереди б то возвращает отрицательное и а идет выше по порядку
            a[key].localeCompare(b[key]) // 1
          : a[key] - b[key]
      );
      //* если цифра 2 то сортировка по убыванию
    } else if (newSortOrder === 2) {
      sorted.sort((a, b) =>
        typeof a[key] === "string"
          ? //* а здесь наоборот просто, если сверху а постоянно идет вверх, то здесь наоборот b идет вверх а b и получается наоборот
            b[key].localeCompare(a[key])
          : b[key] - a[key]
      );
    }

    //* оптимизируем вот так
    //if (newSortOrder === 1) {
    //  sorted.sort((a, b) => compareValues(a[key], b[key]));
    //} else if (newSortOrder === 2) {
    //  sorted.sort((a, b) => compareValues(b[key], a[key]));
    //}

    // Сбросить порядок сортировки всех остальных столбцов
    const newSortOrders = { ...state.sortOrders, [key]: newSortOrder };

    for (const k in newSortOrders) {
      if (k !== key) {
        newSortOrders[k] = 0;
      }
    }

    dispatch({
      type: "sortData",
      payload: { sortedData: sorted, sortOrders: newSortOrders },
    });
  };

  //* эту функцию потом вынесем в функции
  //const compareValues = (a, b) => {
  //  if (typeof a === "string" && typeof b === "string") {
  //    return a.localeCompare(b);
  //  }
  //  return a - b;
  //};

  const setSearchQuery = (query) => {
    dispatch({ type: "setSearchQuery", payload: query });
  };

  const setCurrentPage = (pageNumber) => {
    dispatch({ type: "setCurrentPage", payload: pageNumber });
  };

  const getSortIcon = (sortOrder) => {
    console.log(sortOrder);
    if (sortOrder === 1) return <TriangleUpIcon />;
    if (sortOrder === 2) return <TriangleDownIcon />;
    return null;
  };

  const searchTerm = state.searchData.toLowerCase();

  const filteredData = state.sortedData.filter((item) =>
    Object.values(item).some((value) => {
      if (typeof value === "number" || typeof value === "string") {
        return value.toString().toLowerCase().includes(searchTerm);
      }
      return false;
    })
  );

  const lastItem = state.currentPage * state.itemsPerPage;
  const firstItem = lastItem - state.itemsPerPage;
  const currentItems = filteredData.slice(firstItem, lastItem);

  return (
    <dataContext.Provider
      value={{
        getLowData,
        getBigData,
        sortData,
        getSortIcon,
        setSearchQuery,
        setCurrentPage,
        data: state.data,
        sortedData: currentItems, //* потом уже такая чтобы пагинация была
        //sortedData: filteredData, //* потом такая чтобы поиск работал
        //sortedData: state.sortedData, //* изначально использовать это, после поиска уже ту
        loading: state.loading,
        sortOrders: state.sortOrders,
        searchData: state.searchData,
        currentPage: state.currentPage,
        itemsPerPage: state.itemsPerPage,
        setOneData,
        oneData: state.oneData,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

export default DataContextProvider;
