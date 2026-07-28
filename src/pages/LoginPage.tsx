import { useState } from "react";
import axios from "axios";
import { loginUser } from "../api/auth";

function LoginPage() {
    const [form, setForm] = useState({
        email: '',
        password: ''
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

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        setIsSubmitting(true)
        try {
            const response = await loginUser(form)
            localStorage.setItem('accessToken', response.data!.accessToken)
            localStorage.setItem('refreshToken', response.data!.refreshToken)
            alert('로그인 성공!')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('상태 코드: ', error.response?.status)
                console.log('백엔드 응답 내용: ', error.response?.data)
                alert(`로그인 실패: ${JSON.stringify(error.response?.data)}`)
            } else {
                console.log('알 수 없는 에러: ', error)
                alert('로그인 중 알 수 없는 에러가 발생하였습니다.')
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <h1>로그인</h1>

            <label htmlFor="email">이메일</label>
            <input id="email" name="email" type="email" placeholder="이메일" value={form.email} onChange={handleChange} required />

            <label htmlFor="password">비밀번호</label>
            <input id="password" name="password" type="password" placeholder="비밀번호" value={form.password} onChange={handleChange} required />

            <button type="submit" disabled={isSubmitting}>{isSubmitting ? '로그인 중 ...' : '로그인'}</button>
        </form>
    )
}

export default LoginPage