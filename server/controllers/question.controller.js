import fs from 'fs';

const data = fs.readFileSync('./questions.json', 'utf-8');
const questions = JSON.parse(data);
const userProgress = {
    userId: "123",
    solvedQuestions: [], // List of { questionId, attempts, topic, remark }
    totalSolved: {}, // { topic: count of solved questions per topic }
    weakAreas: {}, // { topic: total attempts }
  };
const getRandomUnsolvedQuestion = (userId) => {
      const solvedIds = userProgress.solvedQuestions.map((q) => q.questionId);
      const unsolvedQuestions = questions.filter((q) => !solvedIds.includes(q.id));
    
      if (unsolvedQuestions.length === 0) {
        return null; 
      }
    
      const randomIndex = Math.floor(Math.random() * unsolvedQuestions.length);
      return unsolvedQuestions[randomIndex];
};
const getRecommendedQuestion = (userId) => {
    const attemptsByTopic = {};
    const questionCountByTopic = {};
  
    // Calculate total attempts and count of solved questions for each topic
    userProgress.solvedQuestions.forEach((q) => {
      const question = questions.find((ques) => ques.id === q.questionId);
      if (!attemptsByTopic[question.topic]) {
        attemptsByTopic[question.topic] = 0;
        questionCountByTopic[question.topic] = 0;
      }
      attemptsByTopic[question.topic] += q.attempts;
      questionCountByTopic[question.topic] += 1;
    });
  
    // Calculate average attempts per topic
    const averageAttemptsByTopic = {};
    Object.keys(attemptsByTopic).forEach((topic) => {
      averageAttemptsByTopic[topic] = attemptsByTopic[topic] / questionCountByTopic[topic];
    });
  
    // Find the topic with the highest average attempts (weakest topic)
    const weakestTopic = Object.keys(averageAttemptsByTopic).reduce((a, b) =>
      averageAttemptsByTopic[a] > averageAttemptsByTopic[b] ? a : b
    );
  
    console.log(weakestTopic);
  
    // Find unsolved questions in that weak topic
    const solvedIds = userProgress.solvedQuestions.map((q) => q.questionId);
    const unsolvedInWeakTopic = questions.filter(
      (q) => q.topic === weakestTopic && !solvedIds.includes(q.id)
    );
  
    if (unsolvedInWeakTopic.length === 0) {
      return getRandomUnsolvedQuestion(userId); // If no more weak topic questions, fallback to random unsolved
    }
  
    const randomIndex = Math.floor(Math.random() * unsolvedInWeakTopic.length);
    return unsolvedInWeakTopic[randomIndex];
};
export const nextQuestion = (req,res) => {
    const userId = req.query.userId;
    console.log(userProgress)
  // After solving 10 questions, use recommendation logic, otherwise use random
  if (userProgress.solvedQuestions.length >= 10) {
    const recommendedQuestion = getRecommendedQuestion(userId);
    res.json(recommendedQuestion);
  } else {
    const randomQuestion = getRandomUnsolvedQuestion(userId);
    res.json(randomQuestion);
  }
}

export const submitQuestion = (req,res) =>{
    const { userId, questionId, attempts, remark } = req.body;

  // Find the question in the JSON data
  const question = questions.find(q => q.id === questionId);

  if (!question) {
    return res.status(404).json({ message: "Question not found" });
  }

  // Check if question was already solved
  const solvedQuestion = userProgress.solvedQuestions.find((q) => q.questionId === questionId);

  if (solvedQuestion) {
    // Update attempts and remark if already solved
    solvedQuestion.attempts = attempts;
    solvedQuestion.remark = remark;
  } else {
    // Add new solved question
    userProgress.solvedQuestions.push({
      questionId,
      attempts,
      topic: question.topic,
      remark
    });

    // Update totalSolved for the topic
    if (userProgress.totalSolved[question.topic]) {
      userProgress.totalSolved[question.topic]++;
    } else {
      userProgress.totalSolved[question.topic] = 1;
    }

    // Update weakAreas based on attempts
    if (userProgress.weakAreas[question.topic]) {
      userProgress.weakAreas[question.topic] += attempts;
    } else {
      userProgress.weakAreas[question.topic] = attempts;
    }
  }

  res.status(200).json({ message: "Attempts submitted successfully" });
}

