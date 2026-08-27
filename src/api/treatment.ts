import axios from 'axios'
import type { ApiResponse } from './auth'
import {BASE_URL} from './config'

export interface TreatmentRequest {
    appointmentId: number
    medicalSubjectId: number
    content: string
}

export interface TreatmentResponseData {
    id: number
}

export const treatment = async (data: TreatmentRequest) => {
    const response = await axios.post<ApiResponse<TreatmentResponseData>>(
        `${BASE_URL}/api/v1/treatments`,
        data,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
    )
    return response.data
}