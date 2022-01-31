import express from "express";
import path from "path";
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.get("/*", function (req, res) {
    res.sendFile(process.cwd() + '/solana-client/public/index.html');
});

export default app ;