# Enhanzer Library - Book Management System

A premium, modern Angular application designed to manage a digital library of books. This frontend integrates with an ASP.NET backend to provide a seamless CRUD (Create, Read, Update, Delete) experience with a focus on high-end aesthetics and robust data handling.

## 🚀 Key Features

- **Dynamic Book Listing**: Real-time view of all available books with loading and error states.
- **Full CRUD Support**: Add new books, update existing details, and remove books from the system.
- **Smart Forms**: Validated reactive forms with intuitive feedback and date formatting.
- **Environment-Driven Configuration**: Secure API endpoint management using `.env` files.
- **Responsive Premium UI**: Optimized for all devices using a custom, modern CSS design system.

## 🛠 Technology Stack

- **Core**: Angular 19+ (Standalone Components)
- **State Management**: Reactive RxJS streams
- **Styling**: SCSS with a custom design system and Google Fonts (Inter)
- **HTTP Client**: Angular `HttpClient` for REST API consumption
- **Environment**: Custom Node.js script for `.env` to TypeScript translation
- **Testing**: Vitest for unit testing

## 📂 Project Architecture

The project follows a feature-based modular structure:
- `src/app/features/books`: Contains all book-related logic.
  - `components/book-list`: Displays the grid of books.
  - `components/book-form`: Unified form for adding and editing books.
  - `services/book.ts`: Centralized API communication layer.
  - `models/book.ts`: TypeScript interfaces for data consistency.
- `src/environments`: Generated environment files for different stages (Dev/Prod).

## 📡 Data Flow & Rendering

### Rendering Lifecycle
1. **Component Initialization**: On `ngOnInit`, components trigger the `BookService`.
2. **Asynchronous Fetching**: The service returns an `Observable<Book[]>`.
3. **Reactive Binding**: Data is bound to the template using the `*ngFor` directive.
4. **Manual Change Detection**: To ensure UI consistency in asynchronous callbacks, `ChangeDetectorRef` is used to trigger prompt updates.

### Data Interaction (API)
The `BookService` acts as the bridge to the backend:
- `GET /api/Book`: Retrieves the full library.
- `POST /api/Book`: Submits a new book object.
- `PUT /api/Book/{id}`: Updates an existing entry.
- `DELETE /api/Book/{id}`: Removes a book.

## ⚙️ Environment Configuration

The project uses a secure `.env` system to manage API URLs without hardcoding them into source control.

1. **`.env` files**: Create `.env` (local) and `.env.prod` (production) in the root.
2. **Generation Script**: `generate-env.js` reads these files and writes them to `src/environments/environment.ts`.
3. **Auto-Run**: The generation script runs automatically before `npm start` or `npm build`.

## 💻 Local Setup

1. **Clone and Install**:
   ```bash
   npm install
   ```
2. **Setup Environtment**:
   Create a `.env` file in the root:
   ```env
   API_URL=https://your-api-endpoint/api/Book
   ```
3. **Start Development Server**:
   ```bash
   npm run start
   ```
   Navigate to `http://localhost:4200/`.

## ☁️ Deployment (Vercel)

When deploying to Vercel:
1. Add the `API_URL` environment variable in the Vercel Dashboard.
2. The `generate-env.js` script is configured to automatically pick up the Vercel system variable during the build process.

## 🧪 Testing

The project uses **Vitest** for blistering fast unit tests. To run the suite:
```bash
npm run test
```
The tests are located as `.spec.ts` files alongside their respective components and services.

---
*Created for the Pre-Screening Enhanzer Assessment.*
