import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function useLogInForm () {
    const BASE_URL = 'http://localhost:5000'

    const [logInInfo, setLogInInfo] = useState({})

    const handleInputChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value

        setLogInInfo({
            ...logInInfo,
            [name]: value
        }
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${BASE_URL}/user`, logInInfo,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => {
                if (response.status === 200) {
                    toast.success('Review added successfully !')
                    // window.location.href = `/campgrounds/${response.data.reviewedCampgroundId}`
                }
            })
            .catch(err => {
                const { statusCode, message, stack } = err.response.data
                toast.error('Ooops ! Something went wrong ... ')
                window.location.href = `/error?statusCode=${statusCode}&message=${message}&stack=${stack}`
            })
    }
    return { handleInputChange, handleSubmit }
}
