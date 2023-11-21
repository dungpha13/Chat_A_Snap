import { AddIcon } from '@chakra-ui/icons'
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'

const GroupChatModal = () => {

    const [fullName, setFullName] = useState('')

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button
                d="flex"
                fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                rightIcon={<AddIcon />}
                onClick={onOpen}
            >
                New Group Chat
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center">Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id='full-name' isRequired isInvalid={fullName === ""}>
                            <FormLabel>
                                Name
                            </FormLabel>
                            <Input
                                placeholder='Enter Your Name'
                                onChange={(e) => setFullName(e.target.value)}
                            >
                            </Input>
                            <FormErrorMessage>*Name is required</FormErrorMessage>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>Save</Button>
                        <Button variant='ghost' onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )

}

export default GroupChatModal