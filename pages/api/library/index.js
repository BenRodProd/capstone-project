import dbConnect from "../../../library/connect";
import Wisdom from "../../../library/models/Wisdom";

export default async function handler(request, response) {
  await dbConnect();
  console.log("connected");
  if (request.method === "GET") {
    const library = await Wisdom.find();
    console.log(library);
    return response.status(200).json(library);
  }

  if (request.method === "POST") {
    try {
      const wisdomData = request.body;
      await Wisdom.create(wisdomData);

      response.status(201).json({ status: "Wisdom created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
