const {axiosInstance} = require('../libs/axios.instance');

let self;
function ProfileService(){
    self=this;
    self.Axios = axiosInstance;
}
ProfileService.prototype = {
    profile: (data) => {
        return new Promise(async(resolve, reject) => {
            try{
                const response = await self.Axios.get(`/stable/bots/labs/2241/entries`);
                const user = await self.filterByUid(data.uid, response.data.dataSource)
                resolve(user)
            }catch(err){
                console.log(err)
            }
        })
    },
    filterByUid: (uid, data) => {
        return new Promise(async(resolve, reject)=> {
            console.log(data.length)
            resolve(data.filter(item=> item.creator_id == uid))
        })
    }
}

module.exports = ProfileService;