const {axiosInstance} = require('../libs/axios.instance');

let self;
function TeamService(){
    self = this;
    self.Axios = axiosInstance;
}

TeamService.prototype = {
    getTeams: (call) => {
        return new Promise(async(resolve, reject)=> {
            let response = await self.Axios.get('/stable/bots/labs/2261/entries');
            response.data.dataSource.sort((a, b) => {
                const nameA = a['5810'].toUpperCase(); // ignore upper and lowercase
                const nameB = b['5810'].toUpperCase(); // ignore upper and lowercase
              
                if (nameA < nameB) {
                  return -1; // nameA comes before nameB
                }
                if (nameA > nameB) {
                  return 1; // nameA comes after nameB
                }
              
                return 0; // names must be equal
            });
            //let data;
            // if(call==='first'){
            //     data = response.data.dataSource.filter((item, index) => {
            //         if(index <= response.data.dataSource.length/2){
            //             return item;
            //         }
            //     })
            // }else{
            //     data = response.data.dataSource.filter((item, index) => {
            //         if(index > response.data.dataSource.length/2){
            //             return item;
            //         }
            //     })
            // }
            
            resolve(response.data.dataSource)
        })
    }
}

module.exports = TeamService;