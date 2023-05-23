import dbConnect from "../../../library/connect";
import User from "../../../library/models/User";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const users = await User.find();

    return response.status(200).json(users);
  }
  if (request.method === "PUT") {
    await User.find();

    response.status(200).json({ status: `User ${id} updated!` });
  }
  if (request.method === "POST") {

    try {
      const { name, books, sound, subtitle, currentBook, password } = request.body;

      // Create a new user document
      const user = new User({
        name,
        books,
        sound,
        subtitle,
        currentBook,
        password,
      });
  
      // Save the user document to the database
      await user.save();

      response.status(200).json({ status: "User created successfully" });
    } catch (error) {
      response.status(500).json({ error: "Failed to create user" });
    }
  }
}
