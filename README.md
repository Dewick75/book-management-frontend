# Library - Book Management System Frontend

A premium, modern Angular application designed to manage a digital library of books. This frontend integrates with an ASP.NET backend to provide a seamless CRUD (Create, Read, Update, Delete) experience with a focus on high-end aesthetics and robust data handling.

---

## 🚀 Key Features

*   **Dynamic Book Listing**: Real-time view of all available books, featuring loading states, error handling, and manual refresh capabilities.
*   **Full CRUD Support**: Add new books, update existing details, and remove books from the system with confirmation prompts.
*   **Smart Forms**: Validated reactive forms with intuitive user feedback, custom validation messages, and date formatting.
*   **Environment-Driven Configuration**: Secure API endpoint management via `.env` files, automatically integrated during build.
*   **Responsive Premium UI**: An aesthetically pleasing and responsive user interface built with SCSS, leveraging Google Fonts (Inter) for a modern look and feel.

---

## 🛠 Technology Stack

*   **Core Framework**: Angular 19+ with Standalone Components
*   **Routing**: Angular Router for seamless Single Page Application navigation.
*   **State Management**: Reactive RxJS streams for asynchronous data handling.
*   **Styling**: SCSS with a custom design system and Google Fonts (Inter).
*   **HTTP Client**: Angular `HttpClient` for robust REST API consumption.
*   **Environment Management**: Custom Node.js script (`generate-env.js`) for `.env` to `environment.ts` translation.
*   **Testing**: Vitest for fast unit testing.

---

## 📂 Project Architecture

The project adheres to a **Feature-Based Modular Architecture**, which promotes separation of concerns, maintainability, and scalability.

*   **`src/app/`**: The root of the Angular application's source code.
    *   **`app.component.*`**: The root component of the application, containing the main layout, navigation, and the `<router-outlet>`.
    *   **`app.config.ts`**: Configures application-level providers like the Router and `HttpClient`. This is the modern approach for standalone applications, replacing `AppModule` for many setup tasks.
    *   **`app.routes.ts`**: Defines the URL paths and the corresponding components that should be rendered, enabling navigation within the SPA.
    *   **`main.ts`**: The application's entry point, responsible for bootstrapping the `AppComponent` and applying global configurations.
    *   **`index.html`**: The single HTML page that the application loads.
    *   **`styles.scss`**: Global SCSS styles, including framework resets and custom design system variables.
    *   **`environments/`**: Contains environment-specific configuration files (`environment.ts` for development, `environment.prod.ts` for production) that hold values like the `apiUrl`.
    *   **`features/`**: A top-level folder to group distinct functional areas of the application.
        *   **`books/`**: Encompasses all functionality related to managing books.
            *   **`components/`**: Contains UI components specific to the books feature.
                *   **`book-list/`**: The component responsible for displaying the list of books. It handles fetching data, displaying it, and providing actions like Edit/Delete.
                    *   `book-list.component.ts`: Component logic, data fetching, and event handling.
                    *   `book-list.component.html`: The template for displaying the book list and actions.
                    *   `book-list.component.scss`: Styles specific to the book list.
                    *   `book-list.component.spec.ts`: Unit tests for the book list component.
                *   **`book-form/`**: The component used for both adding new books and editing existing ones. It utilizes Angular's Reactive Forms for validation and data management.
                    *   `book-form.component.ts`: Component logic, form setup, validation, and API interactions for saving/updating.
                    *   `book-form.component.html`: The template for the book input form.
                    *   `book-form.component.scss`: Styles specific to the book form.
                    *   `book-form.component.spec.ts`: Unit tests for the book form component.
            *   **`models/`**: Houses TypeScript interfaces (`book.ts`) that define the data structures, ensuring consistency with the backend DTOs.
            *   **`services/`**: Contains reusable services, primarily `book.service.ts`, which encapsulates all HTTP requests to the backend API.
            *   **`shared/`**: (Optional but recommended) For components, directives, or pipes that are reusable across multiple features.

---

### 📈 Data Flow & Rendering

*   **Rendering Lifecycle:**
    1.  **Application Bootstrap**: `main.ts` bootstraps `AppComponent` using `app.config.ts` for providers and `app.routes.ts` for routing.
    2.  **Route Activation**: When a route is activated (e.g., `/books`), Angular instantiates the corresponding component (`BookListComponent`).
    3.  **Component Initialization**: The component's `ngOnInit` lifecycle hook is called.
    4.  **Service Call**: `ngOnInit` calls a method in `BookService` (e.g., `getAllBooks()`).
    5.  **Asynchronous Fetching**: `BookService` uses `HttpClient` to make an API request, returning an `Observable`.
    6.  **Subscription and Data Binding**: The component subscribes to the observable. Upon receiving data (or an error), it updates its properties. Angular's change detection (or manual trigger with `ChangeDetectorRef` for advanced scenarios) updates the HTML template.
    7.  **Template Rendering**: The `*ngIf` and `*ngFor` directives in the HTML template render the book list or loading/error messages based on the component's data.

*   **Data Interaction (API Communication):**
    The `BookService` is the sole handler of API requests. It follows a consistent pattern for each CRUD operation:
    *   `GET /api/Book`: Retrieves the full library.
    *   `POST /api/Book`: Submits a new book object (created from form data).
    *   `PUT /api/Book/{id}`: Updates an existing entry with new data.
    *   `DELETE /api/Book/{id}`: Removes a book by its ID.
    All methods return RxJS `Observables` for handling asynchronous responses and errors.

---

### ⚙️ Environment Configuration

The project employs a robust system for managing environment-specific configurations, primarily the backend API URL, ensuring security and flexibility.

1.  **`.env` Files**:
    *   `.env` (root): Stores local development environment variables (e.g., `API_URL=https://localhost:7123/api/Book`).
    *   `.env.prod` (root): Stores production environment variables (e.g., `API_URL=https://your-deployed-backend.com/api/Book`).
    *   These files are added to `.gitignore` to prevent accidental commits of sensitive information.

2.  **Generation Script (`generate-env.js`):**
    *   A custom Node.js script that reads the `.env` or `.env.prod` files.
    *   It uses the `dotenv` package to parse these files.
    *   It programmatically generates `src/environments/environment.ts` and `src/environments/environment.prod.ts` files, populating them with the values from the `.env` files.

3.  **Auto-Run Script Integration**:
    *   The `package.json` scripts (`start`, `build`, `test`) are configured to run the `generate-env.js` script **before** executing the Angular CLI commands. This ensures that the correct environment configuration is available at build time.

---

### 💻 Local Setup & Development

1.  **Clone and Install Dependencies**:
    ```bash
    git clone <repository-url>
    cd book-management-frontend
    npm install
    ```
2.  **Environment Setup**:
    *   Create a `.env` file in the project root with your local backend API URL:
        ```dotenv
        API_URL=https://localhost:7123/api/Book
        ```
    *   Create a `.env.prod` file in the project root for production settings:
        ```dotenv
        API_URL=https://your-backend-api-url.com/api/Book
        ```
3.  **Start Development Server**:
    ```bash
    npm run start
    ```
    This command automatically runs the environment script and then starts the Angular development server. Navigate to `http://localhost:4200/` in your browser.

---

### ☁️ Deployment (Vercel)

1.  **Backend Deployment**: Ensure your ASP.NET backend API is deployed to a public URL and configured with CORS enabled for your Vercel frontend domain.
2.  **Frontend Configuration**:
    *   Commit your latest changes, ensuring `environment.prod.ts` has the correct deployed backend URL.
    *   Add your backend API URL as an **Environment Variable** in your Vercel project settings (e.g., `API_URL` or `NG_APP_API_URL`).
    *   *(Note: Vercel's build process typically uses the `environment.prod.ts` file. If you rely on Vercel's environment variables more directly, you might need to adjust `main.ts` or `app.config.ts` to read them, but sticking to `environment.prod.ts` is cleaner if possible.)*
3.  **Vercel Deployment**:
    *   Import your Git repository into Vercel.
    *   Vercel will auto-detect Angular and set up the build command (`ng build --configuration production`).
    *   Trigger a deployment.

---

### 🧪 Testing

The project is set up with **Vitest** for fast unit tests.

*   **Run Unit Tests**:
    ```bash
    npm run test
    ```
    Test files (`.spec.ts`) are located alongside their corresponding components and services, allowing for isolated testing of individual units.

---
