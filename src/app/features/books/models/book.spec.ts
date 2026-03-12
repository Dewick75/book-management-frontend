import { Book } from './book';

describe('Book', () => {
  it('should be defined', () => {
    const b: Partial<Book> = {};
    expect(b).toBeTruthy();
  });
});
