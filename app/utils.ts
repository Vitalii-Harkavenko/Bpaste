export const checkUser = () => {
	const storedUser = localStorage.getItem('user');
	return storedUser;
};