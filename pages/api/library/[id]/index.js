import dbConnect from "../../../../library/connect";
import Wisdom from "../../../../library/models/Wisdom";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === "GET") {
    const wisdom = await Wisdom.findById(id);
    console.log(wisdom);
    if (!wisdom) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(wisdom);
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
  if (request.method === "PUT") {
    await Wisdom.findByIdAndUpdate(id, {
      $set: request.body,
    });

    response.status(200).json({ status: `Wisdom ${id} updated!` });
  }
  if (request.method === "DELETE") {
    await Wisdom.findByIdAndDelete(id);

    response.status(200).json({ status: `Wisdom ${id} successfully deleted.` });
  }
}
