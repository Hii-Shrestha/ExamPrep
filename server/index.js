require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());
const url = process.env.MONGO_URL;
console.log("Connecting with URL:", process.env.MONGO_URL);
mongoose.connect(url)
    .then(() => {
        console.log("successfully Connected")
    })
    .catch((er) => {
        console.log(`Error is ${er}`)
    })
    
//apis started
app.use("/api/admin", require("./routes/adminRoute"));
app.use("/uploads", express.static("uploads"));
app.use("/api/examinee", require("./routes/examineeRoute"));
//  admin apis started
app.use('/api/admin', require('./routes/adminRoute'));
//  session api
app.use('/api/session/', require('./routes/sessionRoute'));
// subject api
app.use('/api/subject/', require('./routes/subjectRoute'));
// question api
app.use('/api/question/', require('./routes/questionRoute'));
//examination api
app.use('/api/exams/', require('./routes/examinationRoute'));
//message api
app.use('/api/message', require('./routes/messageRoute'));
// api for dashboard
app.use('/api/dashboard/', require('./routes/dashboardRoute'));
//apis ended

app.listen(5000, () => {
    console.log("Server Connected on http://localhost:5000");
})