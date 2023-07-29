import React, {useState, useRef, useEffect} from 'react'
import {
  Alert,
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  InputGroup,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasTitle,
  OffcanvasBody,
} from 'react-bootstrap'
import axios from 'axios'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'



const MarkerButton  = (props) => {
    const [show, setShow] = useState(false)


const handleShow = () => {
    
  }

return (
    <div>
      <Button variant="primary" onClick={handleShow} className="btn-sm me-2">
        {'New post'}
      </Button>

    </div>

)
}

export default MarkerButton