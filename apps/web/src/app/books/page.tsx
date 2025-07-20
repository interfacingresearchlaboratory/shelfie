import BookList from '../../components/BookList';

export default function BooksPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Books Database</h1>
      
      <div className="space-y-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Vercel Functions Architecture</h2>
          <p className="text-sm mb-2">
            This app uses Next.js API routes that are deployed as serverless functions on Vercel.
            This approach provides:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Automatic scaling with Vercel</li>
            <li>No separate API deployment needed</li>
            <li>Shared database logic across functions</li>
            <li>Easy mobile app integration</li>
          </ul>
        </div>

        <BookList />

        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Available API Endpoints</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold">Books API</h3>
              <ul className="space-y-1">
                <li><code>GET /api/books</code> - Search books</li>
                <li><code>POST /api/books</code> - Create book</li>
                <li><code>GET /api/books/[id]/editions</code> - Get editions</li>
                <li><code>POST /api/books/[id]/editions</code> - Create edition</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Users API</h3>
              <ul className="space-y-1">
                <li><code>GET /api/users/[id]</code> - Get user</li>
                <li><code>POST /api/users</code> - Create user</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Bookshelves API</h3>
              <ul className="space-y-1">
                <li><code>GET /api/bookshelves/[id]</code> - Get bookshelf</li>
                <li><code>POST /api/bookshelves</code> - Create bookshelf</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Deployment Benefits</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><strong>Single Deployment:</strong> Web app and API deploy together</li>
            <li><strong>Automatic Scaling:</strong> Vercel handles traffic spikes</li>
            <li><strong>Global CDN:</strong> Fast API responses worldwide</li>
            <li><strong>Cost Effective:</strong> Pay only for what you use</li>
            <li><strong>Mobile Ready:</strong> Same API endpoints for mobile apps</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 