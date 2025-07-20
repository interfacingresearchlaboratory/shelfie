'use client';

import { useState, useEffect } from 'react';

interface Book {
  id: string;
  title: string;
  authors: string[];
  description?: string;
  published_year?: number;
}

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch('/api/books?q=Gatsby');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) {
    return <div className="p-4">Loading books...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Books from Vercel Functions</h2>
      <p className="text-sm text-gray-600 mb-4">
        These API routes are deployed as serverless functions on Vercel
      </p>
      {books.length === 0 ? (
        <p className="text-gray-600">No books found.</p>
      ) : (
        <div className="space-y-4">
          {books.map((book) => (
            <div key={book.id} className="border p-4 rounded-lg">
              <h3 className="text-lg font-semibold">{book.title}</h3>
              {book.authors && (
                <p className="text-gray-600">By: {book.authors.join(', ')}</p>
              )}
              {book.published_year && (
                <p className="text-gray-500">{book.published_year}</p>
              )}
              {book.description && (
                <p className="text-sm mt-2">{book.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 