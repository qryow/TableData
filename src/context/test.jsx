import { INIT_STATE, bigDataAPI, lowDataAPI } from "@/helpers/const";
import { compareValues, reducer } from "@/helpers/functions";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import axios from "axios";
import { createContext, useReducer } from "react";

export const dataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const fetchData = async (api) => {
    dispatch({ type: "startLoading" });
    const { data } = await axios(api);
    dispatch({ type: "getData", payload: data });
  };

  const getLowData = () => fetchData(lowDataAPI);
  const getBigData = () => fetchData(bigDataAPI);

  const setOneData = (data) => {
    dispatch({
      type: "setOneData",
      payload: data,
    });
  };

  const sortData = (key) => {
    //* высшитываем какой раз нажимается кнопка сортировки, деление на 3 дает нам вычисление что диапазон цифры будет всегда от 0 до 2
    const newSortOrder = (state.sortOrders[key] + 1) % 3;
    console.log("newSortOrder", newSortOrder);
    //* присваиваем переменной все наши обьекты
    const sorted = [...state.data];

    if (newSortOrder === 1) {
      sorted.sort((a, b) => compareValues(a[key], b[key]));
    } else if (newSortOrder === 2) {
      sorted.sort((a, b) => compareValues(b[key], a[key]));
    }

    //* создаем переменную где будет обьект с изменнеым ключом
    const newSortOrders = { ...state.sortOrders, [key]: newSortOrder };
    //* обнуляем сортировку для всех остальных ключей кроме ключа на который сейчас идет сорт
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

  const searchQ = state.searchData.toLowerCase();

  const filteredData = state.sortedData.filter((item) =>
    //* хотим отфильтровать основываясь на вводе инпута, и вытаскиваем все значения из обьекта
    Object.values(item).some((value) => {
      //* и с помощью some возврашаем только те которые совпадают с условием, а условие у нас включают ли значения ввод из инпута
      if (value.toString().toLowerCase().includes(searchQ)) {
        return value;
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
