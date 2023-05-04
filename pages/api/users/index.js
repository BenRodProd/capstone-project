import dbConnect from "../../../library/connect";
import User from "../../../library/models/User";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const users = await User.find();

    return response.status(200).json(users);
  }
}
