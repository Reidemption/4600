import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Checkbox,
	FormControl,
	FormLabel,
	Input,
	Select,
	Spacer,
	Stack,
	Textarea,
	useDisclosure,
	Flex,
	Icon,
	IconButton,
} from '@chakra-ui/react'
import { useState } from 'react'
import { getStorage, ref, uploadBytes } from 'firebase/storage'

const AddPhotoModal: React.FC<any> = ({chore}) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const storage = getStorage()

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	const [selectedImage, setSelectedImage] = useState(null)

	const handleImageChange = (e: any) => {
		setSelectedImage(e.target.files[0])
	}

	const handleUploadImage = () => {
		const timestamp = Date.now()

		const imageRef = ref(storage, `${timestamp}.jpg`)

		if (selectedImage) {
			uploadBytes(imageRef, selectedImage).then((snapshot) => {
				console.log('Uploaded a blob or file!')
			})
		}
	}

	return (
		<Flex>
			<Checkbox
				w='10%'
				isChecked={chore.checked}
				onChange={() => onOpen()}
			></Checkbox>
			<Modal onClose={onClose} isOpen={isOpen}>
				<ModalOverlay />
				<form onSubmit={onSubmit}>
					<ModalContent maxW='40rem'>
						<ModalHeader>Add Photo to Shared Chore</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Input type='file' onChange={handleImageChange} />
							<Button onClick={handleUploadImage}>Upload Image</Button>
						</ModalBody>
						<ModalFooter>
							<Button colorScheme={'purple'} type='submit'>
								Update Chore
							</Button>
							<Spacer />
							<Button onClick={onClose}>Close</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</Flex>
	)
}

export default AddPhotoModal
