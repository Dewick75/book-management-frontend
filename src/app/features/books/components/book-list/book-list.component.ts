import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { BookService } from '../../services/book';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private bookService: BookService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.isLoading = true;
    this.error = null;

    this.bookService.getAllBooks()
      .subscribe({
        next: (data: Book[]) => {
          console.log('Successfully fetched books:', data);
          this.books = data;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          console.error('Error fetching books:', err);
          this.error = 'Failed to load books. Please ensure the backend is running and accessible.';
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
  }

  addBook(): void {
    this.router.navigate(['/books/add']);
  }

  editBook(id: number): void {
    this.router.navigate([`/books/edit/${id}`]);
  }

  deleteBook(id: number, title: string): void {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.books = this.books.filter(book => book.id !== id);
          alert('Book deleted successfully!');
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          this.error = 'Failed to delete book. ' + (err.message || '');
          console.error('Error deleting book:', err);
          this.cdr.detectChanges();
        }
      });
    }
  }
}