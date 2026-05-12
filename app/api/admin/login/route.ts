import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const { email, password, inviteCode } = body;

    if (
        email === "admin@camara.gov.br" &&
        password === "123456" &&
        inviteCode === "ABC-123"
    ) {
        const response = NextResponse.json({
            success: true,
        });

        response.cookies.set("admin_session", "true");

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