import {
  Thead,
  Table,
  Tr,
  Th,
  Tbody,
  Box,
  Button,
  Flex,
  chakra,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import LoadingTable from "./LoadingTable";
import { dataContext } from "@/context/test";
import TableRow from "./TableRow";
import { thArray } from "@/helpers/const";

const TableList = () => {
  const {
    getLowData,
    getBigData,
    sortedData,
    data,
    loading,
    sortData,
    getSortIcon,
    sortOrders,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    oneData,
  } = useContext(dataContext);
  console.log(sortOrders);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    getLowData(); //* можно сделать без него
  }, []);

  return (
    <Box mt={10}>
      <Flex gap={6}>
        <Button onClick={getLowData} colorScheme="blue">
          Маленький обьем
        </Button>
        <Button onClick={getBigData} colorScheme="blue">
          Большой обьем
        </Button>
      </Flex>

      <Table mt={8}>
        <Thead>
          <Tr>
            {thArray.map((elem) => (
              <Th key={elem.id} onClick={() => sortData(elem.key)}>
                {elem.key}
                <chakra.span pl="4">
                  {getSortIcon(sortOrders[elem.key])}
                </chakra.span>
              </Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {loading ? (
            <LoadingTable />
          ) : (
            <>
              {sortedData.map((elem, index) => (
                //<TableRow key={`${elem.id}`} {...elem} /> //* сначало покажу что у них могут быть одинаковые айди и будут ошибки
                <TableRow key={`${elem.id}-${index}`} elem={elem} />
              ))}
            </>
          )}
        </Tbody>
      </Table>

      <Flex gap={5} mt={10} flexWrap={"wrap"}>
        {pageNumbers.map((num) => (
          <Button
            onClick={() => setCurrentPage(num)}
            key={num}
            w="40px"
            colorScheme={`${num === currentPage ? "blue" : "green"}`}
          >
            {num}
          </Button>
        ))}
      </Flex>

      {oneData && (
        <Flex flexDirection={"column"} gap={4} id="detail" mt={10}>
          <h1>
            Имя Фамилия: {oneData.firstName} {oneData.lastName}
          </h1>
          <h2>Email: {oneData.email}</h2>
          <h2>Номер телефона: {oneData.phone}</h2>
          <h2>
            Адрес: {oneData.address.streetAddress}, {oneData.address.city}
          </h2>
          <h2>Описание: {oneData.description}</h2>
        </Flex>
      )}
    </Box>
  );
};

export default TableList;
