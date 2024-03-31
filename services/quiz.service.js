const {axiosInstance} = require('../libs/axios.instance');
const axios = require('axios')
let self;
function QuizService(){
    self = this;
    self.Axios = axiosInstance;
}

QuizService.prototype = {
    getQuizzes: () => {
        return new Promise(async(resolve, reject)=> {
            try{
                const response = await self.Axios.get('/stable/bots/labs/2245/entries');
                response.data.dataSource.forEach(async question=> {
                    const options = await self.getOptions(question.id)
                    resolve({
                        questionId: question.id,
                        questionText: question['5762'],
                        options: options
                    })
                })
            }catch(err){
                reject(err)
            }
        })
    },
    getOptions: (questionId) => {
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
    }
}

module.exports = QuizService;