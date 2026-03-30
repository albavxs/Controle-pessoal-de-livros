import { NextRequest } from "next/server";
import { isLikelyIsbn } from "@/lib/books";
import {
  buildGoogleBooksUrl,
  normalizeGoogleBooksResponse,
} from "@/lib/google-books";
import { GoogleBooksSearchErrorCode } from "@/types/book";

function errorResponse(status: number, code: GoogleBooksSearchErrorCode) {
  return Response.json({ code }, { status });
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (query.length < 3 && !isLikelyIsbn(query)) {
    return errorResponse(400, "QUERY_TOO_SHORT");
  }

  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  if (!apiKey) {
    return errorResponse(503, "MISSING_API_KEY");
  }

  const url = buildGoogleBooksUrl(query, apiKey);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return errorResponse(502, "UPSTREAM_ERROR");
    }

    const payload: unknown = await response.json();
    return Response.json(normalizeGoogleBooksResponse(payload));
  } catch {
    return errorResponse(502, "UPSTREAM_ERROR");
  }
}
