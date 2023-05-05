import dbConnect from "../../../../library/connect";
import User from "../../../../library/models/User";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === "GET") {
    const user = await User.findById(id);

    if (!user) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(user);
  }

  if (request.method === "PUT") {
    console.log("REQUEST BODY", request.body);
    await User.findByIdAndUpdate(id, {
      $set: request.body,
    });

    response.status(200).json({ status: `User ${id} updated!` });
  }
}
