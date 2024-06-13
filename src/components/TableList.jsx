import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Thead,
  Table,
  Tr,
  Th,
  Td,
  Tbody,
  chakra,
  Box,
  Button,
  Flex,
} from "@chakra-ui/react";
import React from "react";

const TableList = () => {
  return (
    <Box mt={10}>
      <Flex gap={6}>
        <Button colorScheme="blue">Маленький обьем</Button>
        <Button colorScheme="blue">Большой обьем</Button>
      </Flex>

      <Table mt={8}>
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Title 2</Th>
            <Th>Title 3</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Text</Td>
            <Td>Text 2</Td>
            <Td>Text 3</Td>
          </Tr>
          <Tr>
            <Td>Text</Td>
            <Td>Text 2</Td>
            <Td>Text 3</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableList;
