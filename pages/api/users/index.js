import dbConnect from "../../../library/connect";
import User from "../../../library/models/User";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const users = await User.find();

    return response.status(200).json(users);
  }

  //   if (request.method === "POST") {
  //     try {
  //       const userData = request.body;
  //       await User.create(userData);

  //       response.status(201).json({ status: "User created" });
  //     } catch (error) {
  //       response.status(400).json({ error: error.message });
  //     }
  //   }
}
