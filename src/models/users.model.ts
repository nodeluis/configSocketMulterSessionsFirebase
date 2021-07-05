import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  facebook:{
    avaible: {
      type: Boolean,
      default: false
    },
    name: String,
    email: {
      type: String,
      default: ''
    },
    picture: String,
    facebookId: String,
    phone: {
      type: String,
      default: ''
    },
    country: {
      type: String,
      default: 'Bolivia'
    },
    city: {
      type: String,
      default: ''
    },
  },
  google:{
    avaible: {
      type: Boolean,
      default: false
    },
    name: String,
    email: String,
    picture: String,
    googleId: String,
    phone: {
      type: String,
      default: ''
    },
    country: {
      type: String,
      default: 'Bolivia'
    },
    city: {
      type: String,
      default: ''
    },
  },
  xpress:{
    avaible: {
      type: Boolean,
      default: false
    },
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    phone: String,
    path: {
      type: String,
      default: ''
    },
    realPath: {
      type: String,
      default: ''
    },
    country: {
      type: String,
      default: 'Bolivia'
    },
    city: String,
  },
  tokenFirebase:[{
    token: String,
  }],
  stores:[{
    storeId: String,
    creattor: Boolean,
  }],
  forgotAccount:[{
    codegen: String,
    state: Boolean,
    date: Date,
  }],
  sessionConnections:[{
    date:Date
  }],
  shoppingCart:[{
    date:Date,
    quantity: Number,
    productId: String,
    qr: Boolean,
    cash: Boolean,
  }],
  address:[{
    state: Boolean,
    departament: String,
    city: String,
    street: String,
    nro: Number,
    reference: String,
    codeplus: String,
  }],
  history:[{
    historyId: String
  }],
  verificationUser:{
    dataIdentificationCard:{
      avaible: {
        type: Boolean,
        default: false
      },
      path: {
        type: String,
        default: ''
      },
      realPath: {
        type: String,
        default: ''
      },
      textCard: {
        type: String,
        default: ''
      },
    },
    dataProfile:{
      avaible: {
        type: Boolean,
        default: false
      },
      path: {
        type: String,
        default: ''
      },
      realPath: {
        type: String,
        default: ''
      },
    },
    fingerPrint:{
      avaible: {
        type: Boolean,
        default: false
      },
      code: {
        type: String,
        default: ''
      },
    },
    codeDigit:{
      avaible: {
        type: Boolean,
        default: false
      },
      code: {
        type: String,
        default: ''
      }
    }
  },
  likeStore:[{
    storeId: String,
  }],
  notify:[{
    notifyId: String
  }],
  products:[{
    productId: String,
  }]
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
