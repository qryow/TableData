import { dataContext } from "@/context/test";
import { Td, Tr } from "@chakra-ui/react";
import React, { useContext } from "react";

const TableRow = ({ elem }) => {
  const { setOneData } = useContext(dataContext);
  const { id, firstName, lastName, email, phone } = elem;

  return (
    <Tr
      onClick={() => {
        setOneData(elem);
      }}
    >
      <Td>
        <a href="#detail">{id}</a>
      </Td>
      <Td>
        <a href="#detail">{firstName}</a>
      </Td>
      <Td>
        <a href="#detail">{lastName}</a>
      </Td>
      <Td>
        <a href="#detail">{email}</a>
      </Td>
      <Td>
        <a href="#detail">{phone}</a>
      </Td>
    </Tr>
  );
};

export default TableRow;
