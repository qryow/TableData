export const lowDataAPI =
  "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";

export const bigDataAPI =
  "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";

export const thArray = [
  { id: 1, key: "id" },
  {
    id: 2,
    key: "firstName",
  },
  { id: 3, key: "lastName" },
  { id: 4, key: "email" },
  { id: 5, key: "phone" },
];

export const INIT_STATE = {
  data: [],
  sortedData: [],
  loading: false,
  searchData: "",
  currentPage: 1,
  itemsPerPage: 50,
  sortOrders: {
    firstName: 0,
    lastName: 0,
    id: 0,
    email: 0,
    phone: 0,
  },
};
