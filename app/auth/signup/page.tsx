"use client"
import { navigateToBaseUrl } from "@/app/utils";
import { useRouter } from 'next/navigation';
import AuthForm, { UserObject } from "@/components/AuthForm";
import { useState } from "react";

const SignUp = () => {
	const [message, setMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState(false);

	const router = useRouter();
	const handleSubmit = async ({name, password}: UserObject) => {
		const response = await fetch('/api/create-user', {
			method: 'POST',
			body: JSON.stringify({name, password}),
		});
		const result = await response.json();
		if (typeof result !== "object") {
			setErrorMessage(true);
			setMessage(result);

			setTimeout(() => {
				setErrorMessage(false);
				setMessage('');
			}, 3000);

			return;
		}
		localStorage.setItem('user', JSON.stringify(result));
		navigateToBaseUrl(router);
	};

	return (
		<div className="relative">
			{errorMessage && ( <p className="text-red-400 absolute top-0 left-1/2 -translate-y-[150%] -translate-x-1/2 whitespace-nowrap">{message}</p> )}
			<AuthForm 
				action="signup"
				submitFunction={handleSubmit}
			/>
		</div>
	)
}
export default SignUp;