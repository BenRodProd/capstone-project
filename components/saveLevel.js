export default async function saveLevel  (userIndex, userBookIndex, level) {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userIndex,
          userBookIndex,
          level,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save level");
      }
  
      const data = await response.json();
      console.log(data); // User updated successfully
    } catch (error) {
      console.error(error);
    }
  };