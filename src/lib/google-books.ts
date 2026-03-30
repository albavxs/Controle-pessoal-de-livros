import {
  GoogleBookSearchResult,
  GoogleBooksSearchResponse,
} from "@/types/book";
import {
  isLikelyIsbn,
  normalizeBookCover,
  normalizeOptionalString,
  parsePublishedYear,
} from "./books";

const GOOGLE_BOOKS_URL = "https://www.googleapis.com/books/v1/volumes";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getString(value: unknown) {
  return typeof value === "string" ? normalizeOptionalString(value) : null;
}

function getStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getIndustryIdentifier(value: unknown, type: "ISBN_10" | "ISBN_13") {
  if (!Array.isArray(value)) return null;

  for (const item of value) {
    if (!isRecord(item) || item.type !== type) continue;

    const identifier = getString(item.identifier);
    if (identifier) return identifier;
  }

  return null;
}

export function buildGoogleBooksUrl(query: string, apiKey: string) {
  const url = new URL(GOOGLE_BOOKS_URL);
  const normalizedQuery = query.trim();

  url.searchParams.set(
    "q",
    isLikelyIsbn(normalizedQuery)
      ? `isbn:${normalizedQuery.replace(/[^0-9Xx]/g, "").toUpperCase()}`
      : normalizedQuery
  );
  url.searchParams.set("projection", "lite");
  url.searchParams.set("printType", "books");
  url.searchParams.set("orderBy", "relevance");
  url.searchParams.set("maxResults", "10");
  url.searchParams.set("key", apiKey);

  return url;
}

export function normalizeGoogleBook(item: unknown): GoogleBookSearchResult | null {
  if (!isRecord(item)) return null;

  const googleBookId = getString(item.id);
  if (!googleBookId) return null;

  const volumeInfo = isRecord(item.volumeInfo) ? item.volumeInfo : {};
  const imageLinks = isRecord(volumeInfo.imageLinks) ? volumeInfo.imageLinks : {};
  const publishedDate = getString(volumeInfo.publishedDate);

  return {
    googleBookId,
    title: getString(volumeInfo.title) ?? "Untitled",
    authors: getStringArray(volumeInfo.authors),
    thumbnail: normalizeBookCover(
      getString(imageLinks.thumbnail) ?? getString(imageLinks.smallThumbnail)
    ),
    publishedDate,
    year: parsePublishedYear(publishedDate),
    publisher: getString(volumeInfo.publisher),
    description: getString(volumeInfo.description),
    language: getString(volumeInfo.language),
    previewLink: getString(volumeInfo.previewLink),
    isbn10: getIndustryIdentifier(volumeInfo.industryIdentifiers, "ISBN_10"),
    isbn13: getIndustryIdentifier(volumeInfo.industryIdentifiers, "ISBN_13"),
  };
}

export function normalizeGoogleBooksResponse(
  payload: unknown
): GoogleBooksSearchResponse {
  const items = isRecord(payload) && Array.isArray(payload.items) ? payload.items : [];

  return {
    items: items
      .map((item) => normalizeGoogleBook(item))
      .filter((item): item is GoogleBookSearchResult => item !== null),
  };
}
