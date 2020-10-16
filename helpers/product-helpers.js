var db=require('../config/connection')
var collection=require('../config/collection');
const { ObjectId } = require('mongodb');
var objectId= require('mongodb').ObjectID
module.exports={
    addProduct:(product,callback)=>{
         console.log(product);
         db.get().collection('product').insertOne(product).then((data)=>{
            console.log(data)
            callback(data.ops[0]._id)
         })
    },
    
    getAllProducts:()=>{
       return new Promise(async(resolve,reject)=>{
           let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
           resolve(products)
       })
        
    },

    deleteProduct:(prodId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).removeOne({_id:objectId(prodId)}).then((response)=>{
                console.log(response)
                resolve(response)
            })
        })
    },
    getProductDetail:(proId)=>{
      return new Promise((resolve,reject)=>{
          db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
              resolve(product)
          })
      })
    },
    updateProduct:(proId,productDetail)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).updateOne({_id:ObjectId(proId)},{
                $set:{
                     name:productDetail.name,
                     category:productDetail.category,
                     description:productDetail.description,
                     price:productDetail.price
                }
            }).then((response)=>{
                resolve()
            })
        })
    }
}