'use client';
import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import Input from '../../Form/Input';
import Button from '../../Form/Button';
import cookie from 'js-cookie';

// import
import {
	requiredValidator,
	maxValidator,
	minValidator,
} from '../../validator/validators';
import { useRouter } from 'next/navigation';

// import './Login.css';

export default function Login() {
	// const [isRecaptcha, setIsRecaptcha] = useState(false);
	const [formValidMasage, setFormValidMasage] = useState<boolean>(false);
	const router = useRouter()
	const [formState, onInputHandeler] = useForm(
		{
			username: {
				value: '',
				isValid: false,
			},
			password: {
				value: '',
				isValid: false,
			},
		},
		false
	);

	const userLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (
			formState.isFormValid
			// && isRecaptcha
		) {
			console.log('✅ ورود موفقیت‌آمیز بود!');
			setFormValidMasage(true);
			// const response = axios({
			//    url:'',
			//    method:'POST',
			//    data:{
			//       username,
			//       password
			//    }
			// })
			const response = {
				token: 'asdasda833rkwy3rsd',
				expaier: 5,
			};
			cookie.set('token', response.token, { expires: 5 });
			router.push('/dashboard')
		} else {
			console.log('❌ اطلاعات ناقص یا ریکپچا تایید نشده است.');
			setFormValidMasage(false);
		}
	};

	// const onChangeRecaptcha = () => {
	// 	console.log('شما ربات نیستید 😊');
	// 	setIsRecaptcha(true);
	// };

	return (
		<section className="login-register">
			<div className="login">
				<span className="login__title">ورود به حساب کاربری</span>
				<span className="login__subtitle">
					خوشحالیم دوباره می‌بینیمت دوست عزیز :)
				</span>
				<form
					className="login-form"
					onSubmit={e => {
						userLogin(e);
					}}
				>
					<div className="login-form__username">
						<Input
							className="border-b border-sky-600"
							type="text"
							placeholder="نام کاربری یا آدرس ایمیل"
							element="input"
							id="username"
							validations={[
								requiredValidator(),
								minValidator(6),
								maxValidator(20),
							]}
							onInputHandeler={onInputHandeler}
						/>
						<i className="login-form__username-icon fa fa-user"></i>
					</div>

					<div className="login-form__password">
						<Input
							className="login-form__password-input"
							type="password"
							placeholder="رمز عبور"
							element="input"
							id="password"
							validations={[
								requiredValidator(),
								minValidator(6),
								maxValidator(18),
							]}
							onInputHandeler={onInputHandeler}
						/>
						<i className="login-form__password-icon fa fa-lock-open"></i>

						{/* <ReCAPTCHA
							sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
							onChange={onChangeRecaptcha}
							style={{ marginTop: '1.5rem' }}
						/> */}
					</div>
					{formState.isFormValid ? (
						<div className="bg-green-400 rounded-lg px-1 py-2 ">
							<p>مقدار ورودی ها معتبر است</p>
						</div>
					) : (
						<div className="bg-red-400 rounded-lg px-1 py-2 ">
							<p>مقادیر وارد شده نا معتبر است</p>
						</div>
					)}
					<Button
						className={`login-form__btn ${
							formState.isFormValid
								? // && isRecaptcha
								  'login-form-btn-succes'
								: 'login-form-btn-error'
						}`}
						type={'submit'}
						disabled={
							!formState.isFormValid
							// || !isRecaptcha
						}
					>
						<i className="login-form__btn-icon fas fa-sign-out-alt"></i>
						<span className="login-form__btn-text">ورود</span>
					</Button>
				</form>
			</div>
		</section>
	);
}
