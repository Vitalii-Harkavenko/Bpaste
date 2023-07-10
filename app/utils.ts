export const checkUser = () => {
	if (!window) return;
	const storedUser = localStorage.getItem('user');
	if (!storedUser) return false; 
	return true;
};
export const returnUser = () => {
	if (!window) return;
	const storedUser = localStorage.getItem('user');
	if (!storedUser) return false; 
	return JSON.parse(storedUser);
};
export const navigateToBaseUrl = (router: any) => {
	if (checkUser()) {
		router.push('/');
	}
};