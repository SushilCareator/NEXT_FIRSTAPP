import { MongoClient } from "mongodb";

async function handle(req: any, res: any) {
    if (req.method === "POST") {
        const data = req.body;

        // try {
        const client = await MongoClient.connect(
            "mongodb+srv://susil:eANHXhY0HIvOIR3i@cluster0.z9lyl.mongodb.net/testnext?retryWrites=true&w=majority"
        );

        const db = client.db();
        const collection = db.collection("user");

        const result = await collection.insertOne({ data });

        console.log(result);

        client.close();

        res.status("201").json({ message: "Added Data" });
        // } finally {
        //     // console.log(errer)
        //     console.log(Error);
        // }
    }
}

export default handle;
