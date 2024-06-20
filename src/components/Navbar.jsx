import { dataContext } from "@/context/test";
import {
  Button,
  Flex,
  Input,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setSearchQuery } = useContext(dataContext);
  const [search, setSearch] = useState("");

  const handleSubmit = () => {
    setSearchQuery(search);
    setSearch("");
  };

  return (
    <Flex alignItems={"center"} justifyContent={"space-between"}>
      <Button colorScheme="teal" onClick={onOpen}>
        Добавить
      </Button>
      <Flex gap={4}>
        <Input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Поиск"
        />

        <Button onClick={handleSubmit} colorScheme="teal" px={6}>
          Найти
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить новые данные</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input placeholder="First name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Email" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Phone number</FormLabel>
              <Input type="number" placeholder="Phone number" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} colorScheme="green" mr={3}>
              Добавить
            </Button>
            <Button onClick={onClose} colorScheme="red">
              Отменить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Navbar;
