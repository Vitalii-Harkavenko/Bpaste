"use client"
import { useState } from "react";

const SignUp = () => {

	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		await fetch('/api/create-user', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({name, password}),
		});
	};

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
export default SignUp;