import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { SafarisContext } from '../App';
import api from '../services/api';

export default function SignIn() {
	const navigate = useNavigate();
	let [user_name, setUserName] = useState();
	let [recaptchaCheck, setRecaptchaCheck] = useState(false);
	let [showPassword, setShowPassword] = useState(false);
	let [signInData, setSignInData] = useState({})
	let { signedIn, setSignedIn } = useContext(SafarisContext)

	let email_label = useRef();
	let password_label = useRef();
	let password_input = useRef();
	let logSubmit = useRef();

	function onInputClick() {
		email_label.current.style.cssText = `transform: translate(-10%, -140%) scale(0.9); background-color: rgb(20, 0, 100); color: white; border-radius: 1000px;`;
		password_label.current.style.cssText = `transform: translate(-10%, -140%) scale(0.9); background-color: rgb(20, 0, 100); color: white; border-radius: 1000px;`;
	}

	function onInputChange(e) {
		let name = e.target.name;
		let value = e.target.value;

		setSignInData((current) => ({ ...current, [name]: value }))
	}

	// ON SUBMIT
	function onLogFormSubmit(e) {
		e.preventDefault();
		e.target.reset();

		try {
			const response = api.post('token/', signInData);

			if (response.status === 200) {
				localStorage.setItem('access', response.data.access);
				localStorage.setItem('refresh', response.data.refresh);
				setSignedIn(true);
				navigate('/accommodations');
			}
		} catch (error) {
			return Error(error);
		}
	};

	// SHOW/HIDE PASSWORD
	function toggle_show_password() {
		setShowPassword(current => !current);
		if (!showPassword) {
			password_input.current.type = 'text';
		}
		else {
			password_input.current.type = 'password';
		};
	}

	console.log(signedIn);

	function onRecaptchaCheck() {
		setRecaptchaCheck(current => !current)
	};

	function handleLogSubmitBtn() {
		if (!recaptchaCheck) {
			logSubmit.current.style.cssText = `transform: scale(0.9); cursor: no-drop;`;
		}
		else {
			logSubmit.current.style.cssText = `transform: scale(1.1); cursor: pointer;`;
		}
	};
	useEffect(() => {
		setTimeout(() => handleLogSubmitBtn(), 500)
	});


	return (
		<div className='account_div d-flex justify-content-center align-items-center my-3'>
			<form onSubmit={onLogFormSubmit} className='log_form d-flex flex-column justify-content-center align-items-center'>
				<div className='log_inputs_div mt-4 m-2'>
					<label ref={email_label} className='log_labels' htmlFor='log_email'>Email</label>
					<input type='text' id="log_email" name='email' onClick={onInputClick} onChange={onInputChange} required></input>
				</div>

				<div className='log_inputs_div password_div mt-4 m-2'>
					<label ref={password_label} className='log_labels' htmlFor='password'>Password</label>
					<input ref={password_input} type='password' id="password" name='password' onClick={onInputClick} onChange={onInputChange} required></input>
					<img src={showPassword ? "https://cdn-icons-png.flaticon.com/128/10308/10308728.png" : "https://cdn-icons-png.flaticon.com/128/3178/3178307.png"} onClick={toggle_show_password} alt="NA"></img>
				</div>

				<ReCAPTCHA className='recaptcha mt-4 m-2' sitekey="6LePsMgpAAAAAJhynm95qip9bv_GETF6ELsfCuZc" onChange={onRecaptchaCheck} />

				<div className='log_inputs_div mt-4 m-2'>
					<input ref={logSubmit} type='submit' className='log_submit' disabled={!recaptchaCheck} value={'Log In'}></input>
				</div>

				<p className='log_p text-white'>
					Don't have an account? <NavLink to={'/signup'} ><span>Sign Up</span></NavLink>
				</p>
			</form>
		</div>
	)
}