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

export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponseData {
    role: string
    accessToken: string
    refreshToken: string
}

export interface ApiResponse<T> {
    status: boolean
    data: T | null
    code: string | null
    message: string | null
}

export const signupPatient = async (data: PatientSignupRequest) => {
    const response = await axios.post(
        `${BASE_URL}/api/v1/users/signup/patient`,
        data
    )
    return response.data
}

export const loginUser = async (data: LoginRequest) => {
    const response = await axios.post<ApiResponse<LoginResponseData>>(
        `${BASE_URL}/api/v1/auth/login`,
        data
    )
    return response.data
}