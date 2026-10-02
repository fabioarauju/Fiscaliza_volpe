import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const { email, password, inviteCode } = body;

    const adminEmail = process.env.ADMIN_EMAIL ?? "admin@camara.gov.br";
    const adminPassword = process.env.ADMIN_PASSWORD ?? "123456";
    const adminInviteCode = process.env.ADMIN_INVITE_CODE ?? "ABC-123";

    if (
        email === adminEmail &&
        password === adminPassword &&
        inviteCode === adminInviteCode
    ) {
        const response = NextResponse.json({
            success: true,
        });

        response.cookies.set("admin_session", "true", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24,
        });

        return response;
    }

    return NextResponse.json(
        {
            success: false,
            message: "Credenciais inválidas",
        },
        {
            status: 401,
        }
    );
}