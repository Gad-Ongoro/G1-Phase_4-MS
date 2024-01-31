import React, {useState, useEffect, useRef, useContext} from 'react';
// import SignIn from './SignIn';
import { NavLink, useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { SafarisContext } from '../App';

export default function UserLog() {
	const navigate = useNavigate();
	let [user_name, setUserName] = useState();
	let [recaptchaCheck, setRecaptchaCheck] = useState(false);
	let [showPassword, setShowPassword] = useState(false);
	let [signUpData, setSignUpData] = useState({})
	let {signedIn, setSignedIn} = useContext(SafarisContext)

	let first_name_label = useRef();
	let last_name_label = useRef();
	let email_label = useRef();
	let username_label = useRef();
	let password_label = useRef();
	let password_input = useRef();
	let logSubmit = useRef();

	function onInputClick(){
		first_name_label.current.style.cssText = `transform: translate(-10%, -140%) scale(0.9); background-color: rgb(20, 0, 100); color: white; border-radius: 1000px;`;
		last_name_label.current.style.cssText = `transform: translate(-10%, -140%) scale(0.9); background-color: rgb(20, 0, 100); color: white; border-radius: 1000px;`;
		email_label.current.style.cssText = `transform: translate(-10%, -140%) scale(0.9); background-color: rgb(20, 0, 100); color: white; border-radius: 1000px;`;
		username_label.current.style.cssText = `transform: translate(-10%, -140%) scale(0.9); background-color: rgb(20, 0, 100); color: white; border-radius: 1000px;`;
		password_label.current.style.cssText = `transform: translate(-10%, -140%) scale(0.9); background-color: rgb(20, 0, 100); color: white; border-radius: 1000px;`;
	}

	function onInputChange(e){
		let name = e.target.name;
		let value = e.target.value;

		setSignUpData((current) => ({...current, [name]:value}))
	}

	// ON SUBMIT
	function onLogFormSubmit(e){
		e.preventDefault();
		e.target.reset();

		fetch("http://127.0.0.1:5000/customers",{
			method: "POST",
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(signUpData)
		})
		.then(response => {
			if (response.ok){
				return(
				response.json()
				)
			}
			else{
				window.alert('Account already exits!')
				navigate('/signin')
			}
		})
		.then((data)=> {
			if(data){
				navigate('/signin')
			}else{
				navigate('/signup')
			}
		})
	}
	//

	function toggle_show_password(){
		setShowPassword(current => !current);
		if (!showPassword) {
			password_input.current.type = 'text';
		}
		else{
			password_input.current.type = 'password';
		};
	}

	function onRecaptchaCheck(){
		setRecaptchaCheck(current => !current)
	};

	function handleLogSubmitBtn(){
		if (!recaptchaCheck) {
			logSubmit.current.style.cssText = `transform: scale(0.9); cursor: no-drop;`;
		}
		else{
			logSubmit.current.style.cssText = `transform: scale(1.1); cursor: pointer;`;
		}
	};
	useEffect(() => {
		setTimeout(()=> handleLogSubmitBtn(), 500)
	});

  	return(
    	<div className='account_div d-flex justify-content-center align-items-center my-3'>
			<form onSubmit={onLogFormSubmit} className='log_form d-flex flex-column justify-content-center align-items-center'>
				<div className='log_inputs_div m-2'>
					<label ref={first_name_label} className='log_labels' htmlFor='first_name'>First name</label>
					<input type='text' id="first_name" name='first_name' onClick={onInputClick} onChange={onInputChange} required></input>
				</div>

				<div className='log_inputs_div mt-4 m-2'>
					<label ref={last_name_label} className='log_labels' htmlFor='last_name'>Last name</label>
					<input type='text' id="last_name" name='last_name' onClick={onInputClick} onChange={onInputChange} required></input>
				</div>

				<div className='log_inputs_div mt-4 m-2'>
					<label ref={email_label} className='log_labels' htmlFor='log_email'>Email</label>
					<input type='text' id="log_email" name='email' onClick={onInputClick} onChange={onInputChange} required></input>
				</div>

				<div className='log_inputs_div mt-4 m-2'>
					<label ref={username_label} className='log_labels' htmlFor='user_name'>Username</label>
					<input type='text' id="user_name" name='user_name' onClick={onInputClick} onChange={onInputChange} required></input>
				</div>

				<div className='log_inputs_div password_div mt-4 m-2'>
					<label ref={password_label} className='log_labels' htmlFor='password'>Password</label>
					<input ref={password_input} type='password' id="password" name='password' onClick={onInputClick} onChange={onInputChange} required></input>
					<img src={ showPassword ? "https://cdn-icons-png.flaticon.com/128/10308/10308728.png" : "https://cdn-icons-png.flaticon.com/128/3178/3178307.png"} onClick={toggle_show_password} alt="NA"></img>
				</div>

				<ReCAPTCHA className='recaptcha mt-4 m-2' sitekey="6LdeE1MpAAAAAEfpO0m3ZVvfjnAVGJU4-Nr0HpSq" onChange={onRecaptchaCheck}/>

				<div className='log_inputs_div mt-4 m-2'>
					<input ref={logSubmit} type='submit' className='log_submit' disabled={!recaptchaCheck} value={'Sign Up'}></input>
				</div>

				<p className='log_p text-white'>
					Already have an account?<NavLink to={'/signin'} ><span>Login</span></NavLink>
				</p>
			</form>
    	</div>
  	)
}