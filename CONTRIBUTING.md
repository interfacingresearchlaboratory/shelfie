# Contributing to Shelfie

Let us make contribution easy, collaborative and fun.

## Submit your Contribution through PR

To make a contribution, follow these steps:

1. Fork and clone this repository
2. Do the changes on your fork with dedicated feature branch `feature/your-feature`
3. If you modified the code (new feature or bug-fix), please add tests for it
4. Include proper documentation and examples to run the feature
5. Ensure that all tests pass
6. Submit a pull request

For more details about pull requests, please read [GitHub's guides](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

### 📝 Making Changes

Create a new branch for your changes

```bash
git checkout -b feature/your-feature
```

Make your changes and test them locally

Commit your changes using clear [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) messages

```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve database connection issue"
git commit -m "docs: update README with setup instructions"
git commit -m "refactor: simplify database queries"
git commit -m "test: add unit tests for user service"
```

Keep your fork up to date

```bash
git fetch upstream
git merge upstream/main
```

### 📦 Development Environment

We use `npm` for managing dependencies. To set up:

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### 🔧 Environment Setup

You'll need to configure a few environment variables:

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/shelfie"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your_publishable_key_here"
CLERK_SECRET_KEY="sk_test_your_secret_key_here"
```

**Getting your Clerk keys:**
1. Create a Clerk account at [clerk.com](https://clerk.com/)
2. Create a new application in your Clerk dashboard
3. Copy your publishable key and secret key from the API keys section

### 🚀 Running the Application

```bash
# Run database migrations
npm run db:push

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### 🧪 Testing

We use TypeScript and ESLint for code quality. You can run checks using:

```bash
# Run linting
npm run lint

# Type checking
npm run type-check
```

Make sure that all checks pass before submitting a pull request.

Looking forward to your pull requests and can't wait to see your contributions! 