const {axiosInstance} = require('../libs/axios.instance');
const axios = require('axios')
let self;
function QuizService(){
    self = this;
    self.Axios = axiosInstance;
}

QuizService.prototype = {
    getQuizzes: (totalAnswer) => {
        return new Promise(async(resolve, reject)=> {
            try{
                const response = await self.Axios.get(`/stable/bots/labs/2295/entries`);
                if(totalAnswer < 10){
                    resolve(response.data.dataSource.filter(item=> item['6136'] !== "Finished").sort((a, b) => a['6004'] - b['6004'])[totalAnswer])
                }else{
                    resolve();
                }
            }catch(err){
                reject(err)
            }
        })
    },
    getOptions: (totalAnswer) => {
        return new Promise(async(resolve, reject)=> {
            try{
                const response = await self.Axios.get('/stable/bots/labs/2246/entries')
                resolve(response.data.dataSource.filter(option=> {
                    if(option['5763']===questionId){
                        return {
                            questionId: option['5763'],
                            answer: option['5764'],
                            isCorrect: option['5765'],
                            optionId: option.id
                        }
                    }
                }))
            }catch(err){
                reject(err)
            }
        })
    },
    checkQuizAnswer: (quizId) => {
        return new Promise(async(resolve, reject)=> {
            console.log("Hello Quizzz")
            const quiz = await self.getQuizById(quizId);
            resolve(quiz)
        })
    },
    getQuizById: (quizId) => {
        return new Promise(async(resolve, reject) => {
            const quizzes = await self.Axios.get(`/stable/bots/labs/2295/entries`);
            resolve(quizzes.data.dataSource.filter(item=> item.id === quizId)[0])
        })
    }, 
    updateQuizScoreUser: (creatorId) => {
        return new Promise(async(resolve, reject) => {
            const user = await self.getUserByUid(creatorId)
            console.log("update user", user)
            var scores = user['6137']===undefined? 1 : (parseInt(user['6137'])+1)
            await self.updateUserQuizScore(scores, user.id)
            resolve()
        })
    },
    getUserByUid: (creatorId) => {
        return new Promise(async(resolve, reject)=> {
            const userResponse = await self.Axios.get(`/stable/bots/labs/2241/entries`);
            console.log(userResponse.data.dataSource)
            resolve(userResponse.data.dataSource.filter(user=> user.creator_id === creatorId)[0])
        })
    }, 
    updateUserQuizScore: (scores, userId) => {
        return new Promise(async(resolve, reject) => {
            self.Axios.put(`/stable/bots/labs/2241/entries/${userId}`, {
                "6137": scores
            }).then(response=> {
                console.log("updated quiz score")
                resolve()
            })
        })
    },
    updateQuizEntryStatus: () => {
        return new Promise(async(resolve, reject) => {
            const sortedQuiz = await self.getAllQuizEntries();
            const latestBatchQuizzes = await self.findLatestBatchQuizzes(sortedQuiz[0]['6004'], sortedQuiz)
            latestBatchQuizzes.filter(async item=> {
                await self.updateLatestBatchStatus(item.id)
            })
            resolve(latestBatchQuizzes)
        })
    },
    findLatestBatchQuizzes: (latestBatch, sortedQuiz) => {
        return new Promise(async(resolve, reject) => {
            resolve(sortedQuiz.filter(item=> item['6004'] === latestBatch))
        })
    },
    updateLatestBatchStatus: (quizId) => {
        return new Promise(async(resolve, reject) => {
            self.Axios.put(`/stable/bots/labs/2295/entries/${quizId}`, {
                "6136": 'Finished'
            }).then(response=> {
                console.log("updated quiz status")
                resolve()
            })
        })
    },
    getAllQuizEntries: () => {
        return new Promise(async(resolve, reject)=> {
            const quizResponse = await self.Axios.get(`/stable/bots/labs/2295/entries`);
            resolve(quizResponse.data.dataSource.filter(item=> item['6136'] !== 'Finished').sort((a,b) => a['6004']- b['6004']))
        })
    },
    batchMessage: () => {
        return new Promise(async(resolve, reject) => {
            const sortedQuiz = await self.getAllQuizEntries();
            resolve({
                currentBatch: parseInt(sortedQuiz[0]['6004']),
                nextBatch: parseInt(sortedQuiz[0]['6004']) + 1,
                maxBatch: parseInt(sortedQuiz[sortedQuiz.length -1]['6004'])
            })
        })
    }
}

module.exports = QuizService;