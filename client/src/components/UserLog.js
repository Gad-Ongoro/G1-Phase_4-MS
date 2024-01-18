import React, {useState, useRef} from 'react';
import ReCAPTCHA from "react-google-recaptcha";

export default function UserLog() {
	let [userLog, setUserLog] = useState(false)

	let first_name_label = useRef()
	let last_name_label = useRef()
	let email_label = useRef()
	let username_label = useRef()

	function onInputClick(){
		first_name_label.current.style.cssText = `top: ${-60}%; background-color: powderblue; color: navy; border-radius: 1000px;`;
		last_name_label.current.style.cssText = `top: ${-60}%; background-color: powderblue; color: navy; border-radius: 1000px;`;
		email_label.current.style.cssText = `top: ${-60}%; background-color: powderblue; color: navy; border-radius: 1000px;`;
		username_label.current.style.cssText = `top: ${-60}%; background-color: powderblue; color: navy; border-radius: 1000px;`;
	}

	function onUserLog(){
		setUserLog(current => !current)
		console.log(userLog);
	};

  	return(
    	<div className='account_div d-flex justify-content-center align-items-center my-3'>
			<form className='log_form d-flex flex-column justify-content-center align-items-center'>
				<div className='log_inputs_div m-2'>
					<label ref={first_name_label} className='log_labels' htmlFor='first_name'>First name</label>
					<input typeof='text' id="first_name" name='first_name' onClick={onInputClick}></input>
				</div>

				<div className='log_inputs_div mt-4 m-2'>
					<label ref={last_name_label} className='log_labels' htmlFor='last_name'>Last name</label>
					<input typeof='text' id="last_name" name='last_name' onClick={onInputClick}></input>
				</div>

				<div className='log_inputs_div mt-4 m-2'>
					<label ref={email_label} className='log_labels' htmlFor='log_email'>Email</label>
					<input typeof='text' id="log_email" name='email' onClick={onInputClick}></input>
				</div>

				<div className='log_inputs_div mt-4 m-2'>
					<label ref={username_label} className='log_labels' htmlFor='user_name'>Username</label>
					<input typeof='text' id="user_name" name='user_name' onClick={onInputClick}></input>
				</div>

				<ReCAPTCHA className='mt-4 m-2' sitekey="6LdeE1MpAAAAAEfpO0m3ZVvfjnAVGJU4-Nr0HpSq" onChange={onUserLog}/>
			</form>
    	</div>
  	)
}