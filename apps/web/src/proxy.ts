import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { privateRoutes, publicRoutes } from "./routes/routes";

export function proxy(request: NextRequest) {
	const token = request.cookies.get("token")?.value;
	const redirectLogin = publicRoutes.LOGIN;
	const { pathname } = request.nextUrl;
	const isAuthRoute = pathname === publicRoutes.LOGIN || pathname === publicRoutes.REGISTER;

	const redirect = (to: string) => {
		const url = request.nextUrl.clone();
		url.pathname = to;
		return NextResponse.redirect(url);
	};

	if (!token && request.nextUrl.pathname.startsWith(privateRoutes.DASHBOARD)) {
		return redirect(redirectLogin);
	}

	if (token && isAuthRoute) {
		return redirect(privateRoutes.DASHBOARD);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
