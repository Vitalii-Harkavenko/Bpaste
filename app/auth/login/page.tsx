"use client"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { checkUser } from "@/app/utils";

const LogIn = () => {

	const [user, setUser] = useState(checkUser());
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify({name, password}),
		});
		const user = await response.json()
		localStorage.setItem('user', JSON.stringify(user));
		setUser(checkUser())
	};

	const navigateToBaseUrl = () => {
		if (checkUser()) {
			router.push('/');
		}
	};
	useEffect(() => {
		if (user !== null) {
		navigateToBaseUrl();
		}
	}, [user]);

	return (
		<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
			<input 
				placeholder="Name"
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
			></input>
			<input 
				placeholder="password"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			></input>
			<button type="submit" className="w-8 h-8 bg-white"></button>
		</form>
	)
}
export default LogIn;