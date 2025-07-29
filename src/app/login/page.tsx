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
	const router = useRouter();
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
			router.push('/dashboard');
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
		<section
			id="login-register"
			className=" w-10/12 mx-auto  md:flex md:justify-center md:items-center py-5 my-24 "
		>
			<form
				onSubmit={e => {
					userLogin(e);
				}}
				id="login"
				className=" border-2 rounded-md border-textMain shadow-md shadow-textMainMuted px-4 py-8 flex flex-col"
			>
				{/* top-form */}
				<div className="mb-6" id="top-form">
					<div className=" border-2 border-dashed border-textMain rounded-md px-2 py-3 mb-3 text-center">
						<h2 className="text-2xl mb-2">فرم ورود</h2>
					</div>
					<span id="login__subtitle" className="text-textMain mb-7">
						خوشحالم دوباره می‌بینیمت دوست من :)
					</span>
				</div>
				{/* input-aria */}
				<div id="login-form-input" className="flex flex-col gap-4">
					<div id="username-input" className="flex gap-2 items-center">
						<label>نام کاربری/ ایمیل: </label>
						<Input
							className="rounded-md p-2 bg-bg"
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
					</div>

					<div
						id="password-input"
						className="flex gap-2 mb-5 items-center"
					>
						<label htmlFor="">رمز عبور: </label>
						<Input
							className="rounded-md p-2 bg-bg"
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
						<i className="login-form__password-icon fa fa-lock-open bg-bg"></i>

						{/* <ReCAPTCHA
							sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
							onChange={onChangeRecaptcha}
							style={{ marginTop: '1.5rem' }}
						/> */}
					</div>
					{formState.isFormValid ? (
						<div className="shadow-md shadow-green-700 border-2 border-green-800 rounded-lg px-1 py-2 w-10/12 text-center mx-auto ">
							<p>مقدار ورودی ها معتبر است</p>
						</div>
					) : (
						<div className="shadow-md shadow-rose-700 border-2 border-rose-800 rounded-lg px-1 py-2 w-10/12 text-center mx-auto ">
							<p>مقادیر وارد شده نا معتبر است</p>
						</div>
					)}
					<Button
						className={`border-2 rounded-md py-2 w-8/12 mx-auto  ${
							!formState.isFormValid
								? // && isRecaptcha
								  ' bg-hover'
								: ' border-textMain shadow-md shadow-textMainMuted'
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
				</div>
			</form>
		</section>
	);
}
