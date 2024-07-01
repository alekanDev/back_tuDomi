import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  personal_data: {
    first_name: {
      type: String,
      require: true
    },
    last_name: {
      type: String,
      require: true
    },
    birthday: {
      type: Number,
      require: true
    }, 
    pic_profile: {
      type: String, 
      require: true
    }
  }
})

export default model('users', userSchema)