"use client"
import Link from "next/link";
import { useState} from "react";

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
			></input>
			<input 
				placeholder="Password"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			></input>
			{action === "signup"
				? <button type="submit" className="filled-button">Signup</button>
				: <button type="submit" className="empty-button">Login</button>
			}
			<p>
			{action === "signup" ? (
				<p className="flex gap-1">
					Or you can
					<Link href="/auth/login" className="text-violet-200">login</Link>
				</p>
			) : (
				<p className="flex gap-1">
					Or you can
					<Link href="/auth/signup" className="text-violet-200">signup</Link>
				</p>
			)}
			</p>
			<Link href="/" className="text-violet-200">To homage</Link>
		</form>
	)
}
export default AuthForm;