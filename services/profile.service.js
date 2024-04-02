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
                resolve(response.data.dataSource.filter(item=> data.uid === item.creator_id)[0])
            }catch(err){
                console.log(err)
            }
        })
    }
}

module.exports = ProfileService;