export const checkUser = () => {
	const storedUser = localStorage.getItem('user');
	if (!storedUser) return false; 
	return true;
};
export const returnUser = () => {
	const storedUser = localStorage.getItem('user');
	if (!storedUser) return false; 
	return JSON.parse(storedUser);
};
export const navigateToBaseUrl = (router: any) => {
	if (checkUser()) {
		router.push('/');
	}
};