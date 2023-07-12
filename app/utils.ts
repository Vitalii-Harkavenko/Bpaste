export const checkUser = () => {
	if (typeof window !== "undefined") {
		const storedUser = localStorage.getItem('user');
		if (!storedUser) return false; 
		return true;
	};
};
export const returnUser = async () => {
	if (typeof window !== "undefined") {
		const storedUser = localStorage.getItem('user') || "";
		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				body: storedUser,
			});
			const user = await response.json();
			if (typeof user !== 'object') return false;
			return user;
		} catch (error) {
			console.error("An error occurred checking user:", error)
		}
	};
};
export const navigateToBaseUrl = (router: any) => {
	if (checkUser()) {
		router.push('/');
	};
};