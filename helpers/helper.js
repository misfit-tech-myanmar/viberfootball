const User = require('../models/User');
const passwordHash = require('password-hash');

const createAdminUser = async ()=>{
    return new Promise(async(resolve, reject)=> {
        try {
            // Username ကိုရှာဖွေပါ
            const user = await User.findOne({ username: 'admin' }).exec();
            
            if (user) {
              console.log('User already exists:', user);
              return
            }
        
            // User မရှိပါက အသစ် create လုပ်ပါ
            const newUser = new User({
              username: 'admin',
              password: passwordHash.generate('admin@123'),
            });
        
            await newUser.save();
            console.log('Admin created successfully:', newUser);
            return
          } catch (err) {
            console.error('Error finding or creating user:', err.message);
            throw err;
          }
    })
}

module.exports = {
    createAdminUser
}