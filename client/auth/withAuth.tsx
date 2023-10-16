"use client";

import { useRouter } from "next/navigation";

const withAuth = (Component: any) => {
	const AuthComponent = (props: any) => {
		const router = useRouter();

		// Check if the user has a valid token, if not, redirect to login
		if (typeof window !== "undefined") {
			if (!localStorage.getItem("user")) {
				router.push("/login");
				return null;
			}

			return <Component {...props} />;
		}
	};

	return AuthComponent;
};

export default withAuth;
