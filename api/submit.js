let scores = []; // 内存保存

export default function handler(req, res) {
  if (req.method === "POST") {
    const { name, operations, time } = req.body;
    if (scores.find(s => s.name === name)) {
      return res.status(400).json({ message: "Name already exists" });
    }
    scores.push({ name, operations, time });
    scores.sort((a,b) => a.operations - b.operations || a.time - b.time);
    return res.status(200).json({ message: "Score submitted" });
  }
  res.status(405).json({ message: "Method not allowed" });
}
