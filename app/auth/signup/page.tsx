"use client"
import { useState} from "react";
import { navigateToBaseUrl } from "@/app/utils";
import { useRouter } from 'next/navigation';

const SignUp = () => {
	
	const router = useRouter();
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response = await fetch('/api/create-user', {
			method: 'POST',
			body: JSON.stringify({name, password}),
		});
		const user = await response.json()
		localStorage.setItem('user', JSON.stringify(user));
		navigateToBaseUrl(router);
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