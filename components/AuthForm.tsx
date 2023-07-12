"use client"
import Link from "next/link";
import { useState } from "react";

export interface UserObject {
  name: string;
  password: string;
}
const AuthForm = ({ 
	action, submitFunction 
}: {
	action: string, submitFunction: ({name, password}: UserObject) => void
}) => {
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		submitFunction({name, password});
	}
	return (
		<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
			<input 
				placeholder="Name"
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			></input>
			<input 
				placeholder="Password"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			></input>
			{action === "signup"
				? <button type="submit" className="filled-button">Signup</button>
				: <button type="submit" className="empty-button">Login</button>
			}
			<p className="flex gap-1 justify-between mt-4">
				{action === "signup"
					? <Link href="/auth/login" className="text-violet-200">login</Link>
					: <Link href="/auth/signup" className="text-violet-200">signup</Link>
				}
				<p>Or</p>
				<Link href="/" className="text-violet-200">To homage</Link>
			</p>
		</form>
	)
}
export default AuthForm;