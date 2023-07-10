"use client"
import { navigateToBaseUrl } from "@/app/utils";
import { useRouter } from 'next/navigation';
import AuthForm, { UserObject } from "@/components/AuthForm";

const LogIn = () => {
	
	const router = useRouter();
	const handleSubmit = async ({name, password}: UserObject) => {
		const response = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify({name, password}),
		});
		const user = await response.json()
		localStorage.setItem('user', JSON.stringify(user));
		navigateToBaseUrl(router);
	};

	return (
		<AuthForm 
			title="Login to your account"
			buttonText="Login"
			submitFunction={handleSubmit}
		/>
	)
}
export default LogIn;