import { useState } from "react";
import axios from "axios";
import { appointmentSlot } from "../api/appointmentSlot";

function AppointmentSlotPage() {
    const [form, setForm] = useState({
        date: '',
        startTime: '',
        endTime: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const {name, value} = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setIsSubmitting(true)
        try {
            await appointmentSlot(form)
            alert('진료 시간 등록 성공!')
            setForm({ date: '', startTime: '', endTime: '' })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('상태 코드: ', error.response?.status)
                console.log('백엔드 응답 내용: ', error.response?.data)
                alert(`진료 시간 등록 실패: ${JSON.stringify(error.response?.data)}`)
            } else {
                console.log('알 수 없는 에러: ', error)
                alert('진료 시간 등록 중 알 수 없는 에러가 발생하였습니다.')
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>진료 시간 등록</h1>

            <label htmlFor="date">날짜</label>
            <input id="date" name="date" type="date" value={form.date} onChange={handleChange} required />

            <label htmlFor="startTime">시작 시간</label>
            <input id="startTime" name="startTime" type="time" value={form.startTime} onChange={handleChange} required />

            <label htmlFor="endTime">종료 시간</label>
            <input id="endTime" name="endTime" type="time" value={form.endTime} onChange={handleChange} required />

            <button type="submit" disabled={isSubmitting}>{isSubmitting ? '등록 중 ...' : '등록'}</button>
        </form>
    )
}

export default AppointmentSlotPage
