import { useState } from "react";
import axios from "axios";
import { appointmentBooking } from "../api/appointmentBooking";

function AppointmentBookingPage() {
    // TODO: form state (slotId, symptom, picture, callType)
    const [form, setForm] = useState({
        slotId: '',
        symptom: '',
        picture: '',
        callType: ''
    })

    // TODO: handleChange
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setIsSubmitting(true)
        try {
            await appointmentBooking({
                ...form,
                slotId: Number(form.slotId)
            })
            alert('진료 예약 성공!')
            setForm({ slotId: '', symptom: '', picture: '', callType: '' })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('상태 코드: ', error.response?.status)
                console.log('백엔드 응답 내용: ', error.response?.data)
                alert(`진료 예약 실패: ${JSON.stringify(error.response?.data)}`)
            } else {
                console.log('알 수 없는 에러: ', error)
                alert('진료 예약 중 알 수 없는 에러가 발생하였습니다.')
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>진료 예약</h1>

            <label htmlFor="slotId">진료 시간</label>
            <input id="slotId" name="slotId" type="number" placeholder="slotId" value={form.slotId} onChange={handleChange} required />

            <label htmlFor="symptom">증상</label>
            <textarea id="symptom" name="symptom" placeholder="증상을 입력하세요" value={form.symptom} onChange={handleChange} required />

            <label htmlFor="picture">사진</label>
            <input id="picture" name="picture" type="text" placeholder="picture" value={form.picture} onChange={handleChange} />

            <label htmlFor="callType">진료 방식</label>
            <select id="callType" name="callType" value={form.callType} onChange={handleChange} required>
                <option value="">선택하세요</option>
                <option value="VOICE">음성통화</option>
                <option value="VIDEO">영상통화</option>
            </select>

            <button type="submit" disabled={isSubmitting}>{isSubmitting ? '예약 중 ...' : '예약'}</button>
        </form>
    )
}

export default AppointmentBookingPage
