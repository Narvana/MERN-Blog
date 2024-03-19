const mongoose=require('mongoose')
const validator=require('validator')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validate:{
            validator(value){
                if(!validator.isEmail(value)){
                    throw new Error("Write a Valid Email")
                }    
            } 
        }
    },
    password:{ 
        type:String,
        require:true,
        trim:true,
        // validate: {
        //     validator: (value)=>{
        //       return /^\d{8}$/.test(value);
        //     },
        //     message: 'Invalid password. Please enter a valid 8-character password.',
        //   },
    },
})

const Users=new mongoose.model('Users',userSchema)
module.exports=Users;