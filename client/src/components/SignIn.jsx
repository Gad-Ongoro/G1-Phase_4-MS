import React, {useState, useEffect, useRef, useContext} from 'react';
// import SignIn from './SignIn';
import { useNavigate, NavLink } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { SafarisContext } from '../App';

export default function SignIn() {
	const navigate = useNavigate();
	let [user_name, setUserName] = useState();
	let [recaptchaCheck, setRecaptchaCheck] = useState(false);
	let [showPassword, setShowPassword] = useState(false);
	let [signInData, setSignInData] = useState({})
	let {signedIn, setSignedIn} = useContext(SafarisContext)

	let email_label = useRef();
	let password_label = useRef();
	let password_input = useRef();
	let logSubmit = useRef();

	function onInputClick(){
		email_label.current.style.cssText = `transform: translate(-10%, -140%) scale(0.9); background-color: rgb(20, 0, 100); color: white; border-radius: 1000px;`;
		password_label.current.style.cssText = `transform: translate(-10%, -140%) scale(0.9); background-color: rgb(20, 0, 100); color: white; border-radius: 1000px;`;
	}

	function onInputChange(e){
		let name = e.target.name;
		let value = e.target.value;

		setSignInData((current) => ({...current, [name]:value}))
	}

	// ON SUBMIT
	function onLogFormSubmit(e){
		e.preventDefault();
		e.target.reset();

		fetch("http://127.0.0.1:5000/login",{
			method: "POST",
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(signInData)
		})
		.then(response => {
			if (response.ok){
				return(
				response.json()
				)
			}
			else{
				window.alert('No users found!')
				// navigate("/signup")
			}
		})
		.then((data)=> {
			if(data){
				localStorage.setItem("customer_auth_token", data.JWT_token)
				console.log(data.JWT_token);
				window.alert('Successfully Logged In')
				navigate("/accommodations")
				window.location.reload();
				console.log(data);
			}
		})
	}
	//

	// function to get cookie value
	function getCookie()  
    {  
        if(document.cookie.length!==0)  
        {  
            var array=document.cookie.split("=");
			let customer_user_name = array[1]
			return customer_user_name
        	// alert("Name="+array[0]+" "+"Value="+array[1]);  
        }
    };
	let customer_user_name = getCookie();
	user_name = customer_user_name
	if (user_name === undefined){
		setSignedIn(false)
	}else{
		setSignedIn(true)
	}
	console.log(user_name);
	//

	// SHOW/HIDE PASSWORD
	function toggle_show_password(){
		setShowPassword(current => !current);
		if (!showPassword) {
			password_input.current.type = 'text';
		}
		else{
			password_input.current.type = 'password';
		};
	}

	console.log(signedIn);

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
					<img src={ showPassword ? "https://cdn-icons-png.flaticon.com/128/10308/10308728.png" : "https://cdn-icons-png.flaticon.com/128/3178/3178307.png"} onClick={toggle_show_password} alt="NA"></img>
				</div>

				<ReCAPTCHA className='recaptcha mt-4 m-2' sitekey="6LdeE1MpAAAAAEfpO0m3ZVvfjnAVGJU4-Nr0HpSq" onChange={onRecaptchaCheck}/>
				
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