import { useState } from "react";
import { signupPatient } from "../api/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupPage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        birthDay: '',
        address: '',
        role: 'PATIENT',
        phone: '',
        bloodType: 'RHPlusA',
        medicalHistory: '',
        currentMedications: '',
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const navigate = useNavigate()

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const {name, value} = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()

        if (form.password !== form.passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.")
            return
        }

        setIsSubmitting(true)
        try {
            await signupPatient(form)
            alert('회원가입 성공!')
            navigate('/login')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('상태 코드: ', error.response?.status)
                console.log('백엔드 응답 내용: ', error.response?.data)
                alert(`회원가입 실패: ${JSON.stringify(error.response?.data)}`)
            } else {
                console.log('알 수 없는 에러: ', error)
                alert('회원가입 중 알 수 없는 오류가 발생했습니다.')
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSignup}>
            <h1>환자 회원가입</h1>

            <label htmlFor="name">이름</label>
            <input id="name" name="name" placeholder="이름" value={form.name} onChange={handleChange} required />

            <label htmlFor="email">이메일</label>
            <input id="email" name="email" type="email" placeholder="이메일" value={form.email} onChange={handleChange} required />

            <label htmlFor="password">비밀번호</label>
            <input id="password" name="password" type="password" placeholder="비밀번호" value={form.password} onChange={handleChange} required />

            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <input id="passwordConfirm" name="passwordConfirm" type="password" placeholder="비밀번호 확인" value={form.passwordConfirm} onChange={handleChange} required />
            
            <label htmlFor="birthDay">생년월일</label>
            <input id="birthDay" name="birthDay" type="date" value={form.birthDay} onChange={handleChange} required />

            <label htmlFor="address">주소</label>
            <input id="address" name="address" placeholder="주소" value={form.address} onChange={handleChange} />

            <label htmlFor="phone">전화번호</label>
            <input id="phone" name="phone" placeholder="전화번호" value={form.phone} onChange={handleChange} required />

            <label htmlFor="bloodType">혈액형</label>
            <select id="bloodType" name="bloodType" value={form.bloodType} onChange={handleChange}>
                <option value="RHPlusA">RH+ A</option>
                <option value="RHPlusB">RH+ B</option>
                <option value="RHPlusAB">RH+ AB</option>
                <option value="RHPlusO">RH+ O</option>
                <option value="RHMinusA">RH- A</option>
                <option value="RHMinusB">RH- B</option>
                <option value="RHMinusAB">RH- AB</option>
                <option value="RHMinusO">RH- O</option>
                <option value="UNKNOWN">모름</option>
            </select>

            <label htmlFor="medicalHistory">병력</label>
            <input id="medicalHistory" name="medicalHistory" placeholder="병력" value={form.medicalHistory} onChange={handleChange} />

            <label htmlFor="currentMedications">현재 복용 약물</label>
            <input id="currentMedications" name="currentMedications" placeholder="현재 복용 약물" value={form.currentMedications} onChange={handleChange} />

            <button type="submit" disabled={isSubmitting}>{isSubmitting ? '가입 중 ...' : '회원가입'}</button>
        </form>
    )
}

export default SignupPage