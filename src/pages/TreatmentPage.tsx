import { useState } from "react";
import axios from "axios";
import { treatment } from "../api/treatment";

function TreatmentPage() {
    const [form, setForm] = useState({
        appointmentId: '',
        medicalSubjectId: '',
        content: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
            await treatment({
                ...form,
                appointmentId: Number(form.appointmentId),
                medicalSubjectId: Number(form.medicalSubjectId)
            })
            alert('진료 등록 성공!')
            setForm({ appointmentId: '', medicalSubjectId: '', content: '' })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('상태 코드: ', error.response?.status)
                console.log('백엔드 응답 내용: ', error.response?.data)
                alert(`진료 등록 실패: ${JSON.stringify(error.response?.data)}`)
            } else {
                console.log('알 수 없는 에러: ', error)
                alert('진료 등록 중 알 수 없는 에러가 발생하였습니다.')
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>진료 진행</h1>

            <label htmlFor="appointmentId">예약 번호</label>
            <input id="appointmentId" name="appointmentId" type="number" placeholder="appointmentId" value={form.appointmentId} onChange={handleChange} required />

            <label htmlFor="medicalSubjectId">진료 과목 번호</label>
            <input id="medicalSubjectId" name="medicalSubjectId" type="number" placeholder="medicalSubjectId" value={form.medicalSubjectId} onChange={handleChange} required />

            <label htmlFor="content">진료 내용</label>
            <textarea id="content" name="content" placeholder="진료 내용을 입력하세요" value={form.content} onChange={handleChange} required />

            <button type="submit" disabled={isSubmitting}>{isSubmitting ? '등록 중 ...' : '등록'}</button>
        </form>
    )
}

export default TreatmentPage
