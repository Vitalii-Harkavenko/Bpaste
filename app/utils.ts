export const checkUser = () => {
	if (typeof window === "undefined") {return false};
	const storedUser = localStorage.getItem('user');
	if (!storedUser) return false;
	return true;
};
export const returnUser = () => {
	if (typeof window !== "undefined") {
		const storedUser = localStorage.getItem('user');
		if (!storedUser) return false;
		return JSON.parse(storedUser);
	};
};
export const checkAndReturnUser = () => {
	const storedUser = localStorage.getItem('user');
	if (!storedUser) return false;
	return JSON.parse(storedUser);
};
export const navigateToBaseUrl = (router: any) => {
	if (checkUser()) {
		router.push('/');
	};
};