import axios from 'axios'
import type { ApiResponse } from './auth'
import {BASE_URL} from './config'


export interface AppointmentSlotRequest {
    date: string
    startTime: string
    endTime: string
}

export interface AppointmentSlotResponseData {
    id: number
}

export const appointmentSlot = async (data: AppointmentSlotRequest) => {
    const response = await axios.post<ApiResponse<AppointmentSlotResponseData>>(
        `${BASE_URL}/api/v1/appointment-slots`,
        data,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
    )
    return response.data
}