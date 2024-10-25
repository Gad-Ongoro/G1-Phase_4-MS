import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import api from "./api";

const AppProvider = createContext();

export const useAppContext = () => useContext(AppProvider);

export default function AppContext({children}){
	const navigate = useNavigate();
	const accessToken = localStorage.getItem('access');
  const refreshToken = localStorage.getItem('refresh');
  const user_id = accessToken !== null || undefined ? jwtDecode(accessToken).user_id : null;
	const [ user, setUser ] = useState({});
	const [ vacations, setVacations ] = useState([]);
	const [ accommodationsAndHotels, setAccommodationsAndHotels ] = useState([]);
	let [ auth, setAuth ] = useState(false);
	let [ inputs, setInputs ] = useState({});
	let [ loading, setLoading ] = useState(false);

	// GET user
  async function fetchUser() {
		try {
				const res = await api.get(`users/${user_id}/`);
			 if (res.status === 200) {
				 	setUser(res.data);
			 	}
		}
		catch (error) {
			console.error(error);
		}
	};

	// auth check
	useEffect( () => {
    if (accessToken) {
      setAuth(true);
      fetchUser();
    } else {
      setAuth(false);
    }
  }, [accessToken]);

	// handle input change
	const handleInputChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}

	// handle signup
	const handleSignUp = async () => {
		console.log(inputs);
		try {
			setLoading(true);
			const response = await api.post('users/register/', inputs);
			if (response.status === 201) {
				navigate('/signin');
			}
		} catch (error) {
			console.log(error);
		} finally {
			setInputs({});
			setLoading(false);
		}
	};

	// handle login
	const handleLogin = async () => {
		console.log(inputs);
		if (!inputs.email || !inputs.password) {
			return;
		}

		try {
			setLoading(true);
			const response = await api.post('token/', inputs);
			if (response.status === 200) {
				localStorage.setItem('access', response.data.access);
				localStorage.setItem('refresh', response.data.refresh);
				const user = jwtDecode(response.data.access);
				setAuth(true);
				navigate('/');
			}
		} catch (error) {
			console.log(error);
		} finally {
			setInputs({});
			setLoading(false);
		}
	};

	// handle logout
	const handleLogout = () => {
		try {
			setLoading(true);
			const response = api.post('users/logout/', {
				refresh_token: refreshToken,
			})

			if (response.status === 204) {
				localStorage.removeItem('access');
				localStorage.removeItem('refresh');
				localStorage.clear();
				setUser({});
				setAuth(false);
				navigate('/signin');
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
		localStorage.clear();
		setAuth(false);
		navigate('/signin');
	};

	// scroll to top
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}

	// GET Vacations
	const getVacations = async () => {
		try {
			const res = await api.get('services/');
			if (res.status === 200) {
				const data = res.data;
				const vacs = data.filter(record => record.service_type === "Vacations");
				setVacations(vacs);
			}
		} catch (error) {
			console.error(error);
		}
	}

	// GET accommodations & Hotels
	const getAccommodationsAndHotels = async () => {
		try {
			const res = await api.get('services/');
			if (res.status === 200) {
				const data = res.data;
				const accomAndHotels = data.filter(record => record.service_type === "Accommodations & Hotels");
				setAccommodationsAndHotels(accomAndHotels);
			}
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		getVacations();
		getAccommodationsAndHotels();
	}, [])

	const contextValues = {
		auth,
		user,
		loading, scrollToTop,
		navigate,
		handleInputChange,
		handleSignUp,
		handleLogin,
		handleLogout,
		vacations, setVacations,
		accommodationsAndHotels, setAccommodationsAndHotels,
	}

	return (
		<AppProvider.Provider
			value={contextValues}
		>
			{children}
		</AppProvider.Provider>
	);
};