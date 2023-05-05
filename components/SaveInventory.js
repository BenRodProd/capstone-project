async function sendRequest(url, { arg }) {
  // here we set the request method
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.error(`Error: ${response.status}`);
  }
}

export default async function SaveInventory({ item, user, currentBook }) {
  const currentBookIndex = user.books.findIndex(
    (book) => book.bookname === currentBook
  );
  const { trigger } = useSWRMutation(`/api/user/${id}`, sendRequest);
  await trigger({
    ...user,
    books: {
      ...user.books,
      currentBook: {
        ...user.books[currentBookIndex],
        inventory: { ...user.books[currentBookIndex].inventory, item },
      },
    },
  });
}
