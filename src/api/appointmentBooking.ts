import axios from 'axios'
import {BASE_URL} from './config'
import type { ApiResponse } from './auth'

export interface AppointmentBookingRequest {
    slotId: number
    symptom: string
    picture: string
    callType: string
}

export interface AppointmentBookingResponseData {
    id: number
}

export const appointmentBooking = async (data: AppointmentBookingRequest) => {
    const response = await axios.post<ApiResponse<AppointmentBookingResponseData>>(
        `${BASE_URL}/api/v1/appointments`,
        data,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
    )
    return response.data
}