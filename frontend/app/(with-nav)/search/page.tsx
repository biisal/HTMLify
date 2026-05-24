import React from "react";

interface SearchPageProps {
  searchParams: Promise<{ q: string }>;
}

async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  return <div>{q}</div>;
}

export default SearchPage;
