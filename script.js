const container = document.querySelector('.container');
const button = document.querySelector('button');
const addBookForm = document.querySelector('.add-book-form');
const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formPages = document.querySelector('#pages');
const formRead = document.querySelector('#read');
const submitButton = document.querySelector('.submit');
const form = document.querySelector('#form');
const bookCardWrapper = document.querySelector('.book-card-wrapper');

const myLibrary = [];

// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
// }

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

const addBookToLibrary = () => {
  const newBook = new Book(formTitle.value, formAuthor.value, formPages.value, formRead.checked);
  myLibrary.push(newBook);
  console.log(newBook.read);
};

// const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
// const dune = new Book('Dune', 'Frank Herbert', 412, false);

// myLibrary.push(theHobbit);
// myLibrary.push(dune);

button.addEventListener('click', () => {
  addBookForm.style.display = 'inline';
});

function clearDom() {
  let lastChild = bookCardWrapper.lastElementChild;
  while (lastChild) {
    bookCardWrapper.removeChild(lastChild);
    lastChild = bookCardWrapper.lastElementChild;
  }
  container.appendChild(bookCardWrapper);
}

function createLibrary(array) {
  let i = 0;
  if (myLibrary.length > 0) {
    array.forEach(book => {
      const bookCard = document.createElement('div');
      bookCard.classList.add('book-card');
      bookCard.setAttribute('id', i);
      bookCardWrapper.appendChild(bookCard);
      i += 1;

      const bookTitle = document.createElement('h3');
      bookTitle.textContent = book.title;
      bookCard.appendChild(bookTitle);

      const bookAuthor = document.createElement('h4');
      bookAuthor.textContent = `By ${book.author}`;
      bookCard.appendChild(bookAuthor);

      const bookPages = document.createElement('p');
      bookPages.textContent = `${book.pages} pages`;
      bookCard.appendChild(bookPages);

      const bookRead = document.createElement('p');
      if (book.read == true) {
        bookRead.textContent = 'Read';
      } else {
        bookRead.textContent = 'Not read yet';
      }

      bookCard.appendChild(bookRead);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      bookCard.appendChild(deleteButton);
      deleteButton.addEventListener('click', (e) => {
        const childIndex = e.target.parentNode.id;
        const childToRemove = document.getElementById(childIndex);
        bookCardWrapper.removeChild(childToRemove);
        myLibrary.splice(childIndex, 1);
      });

      const checkboxDiv = document.createElement('div');
      bookCard.appendChild(checkboxDiv);

      const changeReadLabel = document.createElement('label');
      changeReadLabel.setAttribute('for', 'change-read');
      changeReadLabel.textContent = 'Mark as read';
      checkboxDiv.appendChild(changeReadLabel);

      const changeReadInput = document.createElement('input');
      changeReadInput.setAttribute('type', 'checkbox');
      changeReadInput.setAttribute('id', 'change-read');
      changeReadInput.setAttribute('name', 'change-read');
      checkboxDiv.appendChild(changeReadInput);
      changeReadInput.addEventListener('click', () => {
        if (bookRead.textContent === 'Read') {
          bookRead.textContent = 'Not read yet';
          changeReadInput.checked = false;
          changeReadLabel.textContent = 'Mark as read';
        } else if (bookRead.textContent === 'Not read yet') {
          bookRead.textContent = 'Read';
          changeReadInput.checked = false;
          changeReadLabel.textContent = 'Mark as unread';
        }
      });
    });
  }
}

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  addBookToLibrary();
  clearDom();
  createLibrary(myLibrary);
  addBookForm.style.display = 'none';
  form.reset();
});
