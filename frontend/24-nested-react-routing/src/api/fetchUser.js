export const fetchUser = async () => {
  // Simulate fetching data from API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "John Doe", email: "john@example.com" });
    }, 500);
  });
};
