"use client"
import { navigateToBaseUrl } from "@/app/utils";
import { useRouter } from 'next/navigation';
import AuthForm, { UserObject } from "@/components/AuthForm";

const SignUp = () => {
	
	const router = useRouter();
	const handleSubmit = async ({name, password}: UserObject) => {
		const response = await fetch('/api/create-user', {
			method: 'POST',
			body: JSON.stringify({name, password}),
		});
		const user = await response.json()
		localStorage.setItem('user', JSON.stringify(user));
		navigateToBaseUrl(router);
	};

	return (
		<AuthForm
			action="signup"
			submitFunction={handleSubmit}
		/>
	)
}
export default SignUp;