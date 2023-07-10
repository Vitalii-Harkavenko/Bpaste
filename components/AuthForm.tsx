"use client"
import { useState} from "react";

export interface UserObject {
  name: string;
  password: string;
}
const AuthForm = ({ 
	title, buttonText, submitFunction 
}: {
	title: string, buttonText: string, submitFunction: ({name, password}: UserObject) => void
}) => {
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		submitFunction({name, password});
	}
	return (
		<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
			<p>{title}</p>
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
			<button type="submit" className="w-8 h-8 bg-white">{buttonText}</button>
		</form>
	)
}
export default AuthForm;