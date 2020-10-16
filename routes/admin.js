var express = require('express');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelper.getAllProducts().then((products)=>{
    console.log(products)
    res.render('admin/view-products',{admin:true,products})
  })
  
});
router.get('/add-products',function(req,res){
  res.render('admin/add-products',{admin:true})
})
router.post('/add-products',(req,res)=>{
  console.log(req.body)
  console.log(req.files.image)
  productHelper.addProduct(req.body,(id)=>{
    console.log(id)
    let image=req.files.image
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.redirect('/admin')
      } else {
        console.log(err)
      }
    })
   
  })
})
router.get('/delete-product',function(req,res){
  let proId=req.query.id
  console.log(proId)
  productHelper.deleteProduct(proId).then((response)=>{
    res.redirect('/admin/')
  })
})
router.get('/edit-product/:id',async function(req,res){
  let product=await productHelper.getProductDetail(req.params.id)
  console.log(product)
   res.render('admin/edit-product',{product})
})

router.post('/edit-product/:id',function(req,res){
 productHelper.updateProduct(req.params.id,req.body).then(()=>{
   let id=req.params.id
   res.redirect('/admin')
   if(req.files.image){
     let image=req.files.image
     image.mv('./public/product-images/'+id+'.jpg')
 
   }
 })
})
module.exports = router;
