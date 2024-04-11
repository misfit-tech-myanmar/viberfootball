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
                console.log("total anaserrrr")
                const response = await self.Axios.get('/stable/bots/labs/2295/entries');
                resolve(response.data.dataSource[totalAnswer])
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