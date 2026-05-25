const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const path = require('path');

const app = express();
const server = http.createServer(app);

// 🎯 [উইনগো কালার ট্রেড সিঙ্ক - মেগা সকেট প্রোটোকল লক]
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use(express.static(path.join(__dirname, './')));

// 🔓 [আইফ্রেম সিকিউরিটি পলিসি বাইপাস ২.০ ভাই]
app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader("Content-Security-Policy", "frame-ancestors *; default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob:; style-src * 'unsafe-inline'; font-src * data:;");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// 🎰 [উইনগো কালার ট্রেড ওরিজিনাল ডোমেইন সিঙ্ক]: আপনার ওরিজিনাল মেইন সাইটের ডাটাবেজ ব্যাকএন্ড লিঙ্ক
const MAIN_SITE_URL = "https://betlover247.onrender.com"; 

// 📥 আপনার ফোল্ডারে থাকা ওরিজিনাল ১০টি প্রতীকের নাম সিঙ্ক লিস্ট ভাই
const symbolsList = ['apple', 'banana', 'beer-bottle', 'begun', 'coin', 'dollar', 'jambura', 'rose', 'seven', 'water-bottle'];

// 💰 ১. লাইভ অ্যাকাউন্ট ব্যালেন্স নিয়ে আসার ডেডিকেটেড গেটওয়ে (উইনগো কালার ট্রেড প্রোটোকল সিঙ্ক ভাই)
app.get('/api/slot-balance', async (req, res) => {
    const { userId, wallet } = req.query;
    try {
        const response = await axios.get(`${MAIN_SITE_URL}/api_callback.php?action=get_balance&username=${userId}&wallet=${wallet}`, { timeout: 10000 });
        if (response.data && response.data.status === "ok") {
            return res.json({ success: true, balance: response.data.balance });
        }
        return res.json({ success: false, balance: 0 });
    } catch (e) {
        return res.json({ success: false, balance: 0 });
    }
});

// 🛫 ২. স্লট স্পিন মেগা এপিআই রাউট (POST Route - হুবহু কালার ট্রেডের ডেটা অবজেক্ট ও উইন লজিক সিঙ্ক ভাই)
app.post('/api/slot-spin', async (req, res) => {
    const { userId, amount, wallet } = req.body;
    const targetWallet = wallet || "main";

    try {
        // 🎰 ক্যাসিনো রুলস অনুযায়ী ৩x৪ গ্রিডের জন্য ১২টি র‍্যান্ডম প্রতীক জেনারেট হলো ভাই
        let matrix = [];
        for (let i = 0; i < 12; i++) {
            let randomIndex = Math.floor(Math.random() * symbolsList.length);
            matrix.push(symbolsList[randomIndex]);
        }

        // 🎯 উইন ম্যাথমেটিক্স লজিক (৩টি একই প্রতীক পাশাপাশি মিললে প্লেয়ার জিতবে ভাই)
        let winLines = [];
        let multiplier = 0;

        // ৪টি লাইনে পাশাপাশি ৩টি ঘর চেকিং প্রোটোকল লক ভাই
        const rows = [
            [0, 1, 2],   // Row 1
            [3, 4, 5],   // Row 2
            [6, 7, 8],   // Row 3
            [9, 10, 11]  // Row 4
        ];

        rows.forEach(line => {
            if (matrix[line[0]] === matrix[line[1]] && matrix[line[1]] === matrix[line[2]]) {
                winLines.push(...line);
                multiplier += 3.50; // ৩টি মিললে সাড়ে ৩ গুণ লাভ ভাই ভাই!
            }
        });

        // স্পেশাল লাকি 'seven' বা 'dollar' মিললে জ্যাকপট ডবল বুস্ট ভাই
        if (matrix[0] === 'seven' || matrix[4] === 'dollar' || matrix[8] === 'seven') {
            multiplier += 0.50;
        }

        let winAmount = 0;
        let dbAction = "bet";
        let dbAmount = parseFloat(amount);

        if (multiplier > 0) {
            winAmount = Math.floor(parseFloat(amount) * multiplier);
            dbAction = "win";
            dbAmount = parseFloat(winAmount);
        }

        // 🎯 সরাসরি আপনার পিএইচপি callback ইঞ্জিনে হিট করা হলো ভাই
        let phpPayload = {
            action: dbAction,
            username: userId,
            amount: dbAmount,
            wallet: targetWallet
        };

        // যদি উইন হয়, তবে কালার ট্রেড ও এভিয়েটরের ওরিজিনাল ১৬৫-১৮০ নম্বর লাইনের মেগা উইন প্যারামিটার লক ভাই
        if (dbAction === "win") {
            phpPayload.bet_amount = parseFloat(amount);
            phpPayload.multiplier = parseFloat(multiplier).toFixed(2);
            phpPayload.status = "win";
            phpPayload.type = "win";
            phpPayload.is_win = 1;
            phpPayload.win_status = "win";
            phpPayload.log_status = "win";
        }

        const response = await axios.post(MAIN_SITE_URL + '/api_callback.php', phpPayload, { timeout: 15000 });

        if (response.data && response.data.status === "ok") {
            // 🎰 [উইনগো কালার ট্রেড ১৫৮ নম্বর লাইনের হুবহু ওরিজিনাল সকেট ব্রডকাস্ট ফায়ার ভাই]
            io.emit("balanceUpdate", { username: userId, balance: response.data.balance });

            return res.json({
                success: true,
                balance: response.data.balance,
                matrix: matrix,
                winAmount: winAmount,
                winLines: [...new Set(winLines)]
            });
        } else {
            return res.json({ success: false, message: response.data.message || "❌ Database Decline!" });
        }

    } catch (e) {
        console.error("Slot Core Database Synced Error:", e.message);
        return res.json({ success: false, message: "⚠️ Timeout! Try again." });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log("Player connected to Pro Slot Master Engine!");
});

// 🌐 ৪ নম্বর নতুন গেমের পোর্টের জ্যাম এড়াতে এটি ফ্রেশ কাস্টম পোর্ট ১১০০০ এ লক করা হলো ভাই ভাই!
const PORT = process.env.PORT || 11000;
server.listen(PORT, () => {
    console.log(`🎰 Lucky 777 Slot Engine Running on port ${PORT}`);
});
