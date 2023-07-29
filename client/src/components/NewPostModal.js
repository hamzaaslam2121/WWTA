import React, {useEffect, useRef, useState} from 'react'
import {
	Alert,
	Button,
	Col,
	Row,
	Form,
	FormGroup,
	FormLabel,
	FormControl,
	FormSelect,
	FormCheck,
	Modal,
	ModalHeader,
	ModalTitle,
	ModalBody,
} from 'react-bootstrap'
import axios from 'axios'
import useToken from '../utilities/useToken'

const NewPostModal = ({modalShow, postId, initLat, initLng, handlePostUpdate}) => {
	const [show, setShow] = useState(false)
	const [post, setPost] = useState({})
	const [formDisabled, setFormDisabled] = useState(false)
	const [errorShow, setErrorShow] = useState(false)
	const [errorContent, setErrorContent] = useState('')
	const [successShow, setSuccessShow] = useState(false)
	const [successContent, setSuccessContent] = useState('')
	const formRef = useRef()
	const validFormRef = useRef(false)
	const {setToken, getToken, removeToken} = useToken()

	const [title, setTitle] = useState('')
	const [url, setUrl] = useState('')

	const [latitude, setLatitude] = useState(0)
	const [longitude, setLongitude] = useState(0)

	const defaultPost = {
		title: '',
		url: 'google.co.uk',
		latitude: initLat,
		longitude: initLng,
	}

	useEffect(() => {
		if (modalShow > 0) {
			handleMenuClick()
		}
	}, [modalShow])

	useEffect(() => {
		setTitle(post.title)
		setUrl(post.url)
		setLatitude(post.latitude)
		setLongitude(post.longitude)
	}, [post])


	const handleMenuClick = () => {
		if (postId !== 0) {
			axios.get(process.env.REACT_APP_FLASK_API_URL + '/posts/' + postId).then(
				(response) => {
					setPost(response.data)
				}
			).then(
				() => {setShow(true)}
			).catch((error) => {
				if (error.response.status === 404) {
					window.alert("Post not found! It may have been deleted.")
					handlePostUpdate()
				}
			})
		} else {
			setPost(defaultPost)
			setShow(true)
		}
	}

	const handleClose = () => {
		setPost(defaultPost)
		setErrorContent('')
		setErrorShow(false)
		setSuccessContent('')
		setSuccessShow(false)
		setFormDisabled(false)
		setShow(false)
	}

  const validateForm = (event) => {
    event.preventDefault()
    setErrorShow(false)
    setSuccessShow(false)
    const form = formRef.current
    validFormRef.current = form.checkValidity()
    form.reportValidity()
  }

	const handleSubmit = (event) => {
        setFormDisabled(true)

				axios.post(
						process.env.REACT_APP_FLASK_API_URL + "/add-post",
						{
							update_id: postId,
							title: title,
                            url: url,
							latitude: latitude,
							longitude: longitude
						},
						
					).then((response) => {
						setSuccessContent(response.data.message)
						setSuccessShow(true)
						handlePostUpdate()
						setTimeout(() => {handleClose()}, 2000)
					})
			
				
			
		}
	

	const handleCoordinatesChanged = (event) => {
		let {name, value, min, max} = event.target
		value = Math.max(parseFloat(min), Math.min(parseFloat(value), parseFloat(max)))
		if (name === 'latitudeControl') { setLatitude(value) }
		else { setLongitude(value) }
	}

	const optionRows = (obj) => {
		let rows = []
		for (const [key, value] of
			Object.entries(obj).sort((a, b) => a[1].localeCompare(b[1]))
		) {
			rows.push(<option key={key}>{value}</option>)
		}
		return rows
	}

	return (
		<Modal show={show} onHide={handleClose}>
			<ModalHeader closeButton>
				<ModalTitle>Enter post details</ModalTitle>
			</ModalHeader>
			<ModalBody>
        <Alert show={errorShow} variant='danger'>
          {errorContent}
        </Alert>
        <Alert show={successShow} variant='success'>
          {successContent}
        </Alert>
				<Form ref={formRef} onSubmit={handleSubmit}>
					<FormGroup className='mb-2' controlId='formGroupPostTitle'>
						<FormLabel className='fw-semibold'>Title*</FormLabel>
						<FormControl type='text'
						             disabled={formDisabled}
						             required maxLength='180'
						             defaultValue={post.title}
						             onChange={(e) => setTitle(e.target.value)}/>
					</FormGroup>
					<FormGroup className='mb-2' controlId='formGroupPostURL'>
						<FormLabel className='fw-semibold'>URL*</FormLabel>
						<FormControl type='url'
						             disabled={formDisabled}
						             required maxLength='2048'
						             defaultValue={post.url}
						             onChange={(e) => setUrl(e.target.value)}/>
					</FormGroup>
					
					<Row>
						<FormGroup as={Col} controlId='formGroupLatitude'>
							<FormLabel className='fw-semibold'>Latitude*</FormLabel>
							<FormControl name='latitudeControl'
							             type='number' step='0.00001'
							             min='-85.0' max='85.0'
							             required
							             disabled={formDisabled}
							             defaultValue={post.latitude}
							             onChange={handleCoordinatesChanged}>
							</FormControl>
						</FormGroup>
						<FormGroup as={Col} controlId='formGroupLongitude'>
							<FormLabel className='fw-semibold'>Longitude*</FormLabel>
							<FormControl name='longitudeControl'
							             type='number' step='0.00001'
							             min='-179.99999' max='180.0'
							             required
							             disabled={formDisabled}
							             defaultValue={post.longitude}
							             onChange={handleCoordinatesChanged}>
							</FormControl>
						</FormGroup>
					</Row>
					<Button className="mt-3" type="submit" disabled={formDisabled}>Submit</Button>
				</Form>
			</ModalBody>
		</Modal>
	)


    }
	

export default NewPostModal