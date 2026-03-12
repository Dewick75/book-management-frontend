import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../../services/book';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  isEditMode = false;
  bookId: number | null = null;
  isLoading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      author: ['', [Validators.required, Validators.maxLength(100)]],
      isbn: ['', [Validators.required, Validators.maxLength(20)]],
      publicationDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.bookId = +idParam;
      this.loadBook(this.bookId);
    }
  }

  loadBook(id: number): void {
    this.isLoading = true;
    this.bookService.getBookById(id).subscribe({
      next: (book: Book) => {
        const dateObj = new Date(book.publicationDate);
        const dateValue = dateObj.toISOString().split('T')[0];
        
        this.bookForm.patchValue({
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          publicationDate: dateValue
        });
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.error = 'Failed to load book details. Make sure the backend supports CORS!';
        this.isLoading = false;
        console.error(err);
        this.cdr.detectChanges();
      }
    });
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      Object.keys(this.bookForm.controls).forEach(key => {
        const control = this.bookForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    const bookData: Book = this.bookForm.value;

    if (this.isEditMode && this.bookId) {
      bookData.id = this.bookId;
      this.bookService.updateBook(this.bookId, bookData).subscribe({
        next: () => {
          this.router.navigate(['/books']);
        },
        error: (err: any) => {
          this.error = 'Failed to update book. Make sure the backend supports CORS!';
          this.isLoading = false;
          console.error(err);
          this.cdr.detectChanges();
        }
      });
    } else {
      bookData.id = 0;
      this.bookService.createBook(bookData).subscribe({
        next: () => {
          this.router.navigate(['/books']);
        },
        error: (err: any) => {
          this.error = 'Failed to create book. Make sure the backend supports CORS!';
          this.isLoading = false;
          console.error(err);
          this.cdr.detectChanges();
        }
      });
    }
  }
}
