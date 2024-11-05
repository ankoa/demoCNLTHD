import express from "express";
import fs from "fs";

const app = express();
const PORT = 5555;

// Middleware to handle CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// Get history by ID
app.get("/api/History/:id", (req, res) => {
    const historyId = parseInt(req.params.id); // Parse ID from URL

    fs.readFile("mockData.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({
                EC: 1,
                EM: "Error reading data",
                DT: null
            });
        }

        let histories;
        try {
            histories = JSON.parse(data); // Chuyển đổi dữ liệu từ JSON
            console.log("Parsed histories:", histories); // Kiểm tra object histories
        } catch (parseError) {
            return res.status(500).json({
                EC: 1,
                EM: "Error parsing data",
                DT: null
            });
        }

        // Kiểm tra kiểu dữ liệu của histories.DT
        if (!Array.isArray(histories.DT)) {
            return res.status(500).json({
                EC: 1,
                EM: "Data format error: DT is not an array",
                DT: null
            });
        }

        // Tìm kiếm history với id
        const history = histories.DT.find(item => parseInt(item.id) === historyId);

        if (!history) {
            return res.status(404).json({
                EC: 1,
                EM: `No history found with Id = ${historyId}`,
                DT: null
            });
        }

        res.json({
            EC: 0,
            EM: "Fetch history successfully",
            DT: history
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
