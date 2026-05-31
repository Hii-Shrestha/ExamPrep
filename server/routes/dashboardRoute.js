const Admin = require('../models/Admin');
const Examinee = require('../models/Examinee');
const Question = require('../models/Questionbank');
const Examination = require('../models/ExamAttempted');
const Exam = require('../models/Examination');
const Subject = require('../models/Subject');
const express = require('express');
const router = express.Router();
const ExamAttempted = require('../models/ExamAttempted');

router.get('/', async (req, res) => {
    try {
        const totalExaminees = await Examinee.countDocuments();
        const totalQuestions = await Question.countDocuments();
        const totalExams = await Exam.countDocuments();
        const totalSubject = await Subject.countDocuments();

        return res.status(200).json({
            totalExaminees,
            totalQuestions,
           
            totalExams,
            totalSubject
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return res.status(500).json({ message: "Server error while fetching dashboard data" });
    }
});

router.get('/exams/:id', async (req, res) => {
    try {
        const examineeId = req.params.id;

        // 1. Check karein ki id 'null' string toh nahi hai
        if (!examineeId || examineeId === 'null' || examineeId === 'undefined') {
            return res.status(400).json({ message: "Invalid Examinee ID provided" });
        }

        const examCount = await Examination.countDocuments({ examineeId: examineeId });
        
        // Agar examCount 0 hai, toh 404 bhejne ke bajaye 0 return karna behtar hota hai
        return res.status(200).json({ count: examCount });

    } catch (error) {
        console.error('Error fetching exam details:', error);
        return res.status(500).json({ message: "Server error while fetching exam details" });
    }
});

// status for the examinee router
router.get('/examinee-result/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const examination = await ExamAttempted.countDocuments({
      resultStatus: 'Completed',
      status:'Passed',
      examineeId: id,
    });

    return res.json({ message: examination });
  } catch (error) {
    console.error('Error fetching examinee result:', error);
    return res.status(500).json({ error: 'Failed to fetch result' });
  }
});
module.exports = router;