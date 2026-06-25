import { useState } from "react";
import { signupPatient } from "../api/auth";
import axios from "axios";

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

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const {name, value} = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    
    const handleSignup = async () => {
        try {
            await signupPatient(form)
            alert('회원가입 성공!')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('상태 코드: ', error.response?.status)
                console.log('백엔드 응답 내용: ', error.response?.data)
                alert(`회원가입 실패: ${JSON.stringify(error.response?.data)}`)
            } else {
                console.log('알 수 없는 에러: ', error)
                alert('회원가입 중 알 수 없는 오류가 발생했습니다.')
            }
        }
    }

    return (
        <div>
            <h1>환자 회원가입</h1>

            <input name="name" placeholder="이름" value={form.name} onChange={handleChange} />
            <input name="email" type="email" placeholder="이메일" value={form.email} onChange={handleChange} />
            <input name="password" type="password" placeholder="비밀번호" value={form.password} onChange={handleChange} />
            <input name="passwordConfirm" type="password" placeholder="비밀번호 확인" value={form.passwordConfirm} onChange={handleChange} />
            <input name="birthDay" type="date" value={form.birthDay} onChange={handleChange} />
            <input name="address" placeholder="주소" value={form.address} onChange={handleChange} />

            <select name="role" value={form.role} onChange={handleChange}>
                <option value="PATIENT">환자</option>
                <option value="DOCTOR">의사</option>
                <option value="PHARMACIST">약사</option>
            </select>

            <input name="phone" placeholder="전화번호" value={form.phone} onChange={handleChange} />
            <select name="bloodType" value={form.bloodType} onChange={handleChange}>
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
            <input name="medicalHistory" placeholder="병력" value={form.medicalHistory} onChange={handleChange} />
            <input name="currentMedications" placeholder="현재 복용 약물" value={form.currentMedications} onChange={handleChange} />

            <button onClick={handleSignup}>회원가입</button>
        </div>
    )
}

export default SignupPage