const TOKEN = "ntn_Ye2675220988m6KFLklM17s2ubuRFiGSIIVfG41noKT0yP";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { path, method, body } = req.body;
    const response = await fetch(`https://api.notion.com/v1${path}`, {
      method: method || "GET",
      headers: {
        "Authorization": "Bearer " + TOKEN,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28"
      },
      body: body ? JSON.stringify(body) : undefined
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(200).json({ error: err.message });
  }
}
