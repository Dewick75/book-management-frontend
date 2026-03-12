import { Routes } from '@angular/router';

import { BookListComponent } from './features/books/components/book-list/book-list.component';
import { BookFormComponent } from './features/books/components/book-form/book-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: BookListComponent },
  { path: 'books/add', component: BookFormComponent },
  { path: 'books/edit/:id', component: BookFormComponent }
];