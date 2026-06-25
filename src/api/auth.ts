import axios from 'axios'

const BASE_URL = 'http://localhost:8080'

export interface PatientSignupRequest {
    name: string
    email: string
    password: string
    passwordConfirm: string
    birthDay: string
    address: string
    role: string
    phone: string
    bloodType: string
    medicalHistory: string
    currentMedications: string
}

export const signupPatient = async (data: PatientSignupRequest) => {
    const response = await axios.post(
        `${BASE_URL}/api/v1/users/signup/patient`,
        data
    )
    return response.data
}