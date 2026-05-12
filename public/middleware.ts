import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const cookie = req.cookies.get("admin_session");

    if (!cookie) {
        return NextResponse.redirect(new URL("/admin", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/paineladm/:path*"],
};