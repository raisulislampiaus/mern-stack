const Products = require('../models/productModel1')



class APIfeature {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    filtering(){
        const queryObject = {...this.queryString}
        
        const excledFields = ['page', 'sort', 'limit']
        excledFields.forEach(el => delete(queryObject[el]))

       

        let queryStr = JSON.stringify(queryObject)
        
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        
        this.query.find(JSON.parse(queryStr))
        return this;

    }
    sorting(){
        if(this.queryString.sort){
            const sortPiaus = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortPiaus)
        }else{
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }
    paginating(){
      
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
                 

        return this;
    }
}

const productCtrl = {
   getProducts: async(req,res)=>{
       try {
           const features = new APIfeature(Products.find(), req.query).filtering().sorting().paginating()
           const products = await features.query
           res.json({
               status: 'success',
               result: products.length,
               products: products
           })
         } catch (err) {
           return res.status(500).json({mag: err.message})
       }
   },
   createProducts: async(req,res)=>{
    try {
        const {product_id,title,price,description,content,images,category} = req.body;
        if(!images) return res.status(400).json({msg: "NO IMAGE UPLOAD"})

        const product = await Products.findOne({product_id})
        if(product)
            return  res.status(400).json({msg: "THIS IMAGE ALREADY EXISTS"})

       const newProduct =new Products({
        product_id,title:title.toLowerCase(),price,description,content,images,category
       })  

       await newProduct.save()
       res.json({msg: "CREATED A PRODUCT"})
    } catch (err) {
        return res.status(500).json({mag: err.message})
    }
},
deleteProducts: async(req,res)=>{
    try {
        await Products.findByIdAndDelete(req.params.id)
        res.json({msg: "DELETE A PRODUCT"})

    } catch (err) {
        return res.status(500).json({mag: err.message})
    }
},
updateProducts: async(req,res)=>{
    try {
        const {product_id,title,price,description,content,images,category} = req.body;
        if(!images) return res.status(400).json({msg: "NO IMAGE UPLOAD"})

        await Products.findByIdAndUpdate({_id: req.params.id},{
            title:title.toLowerCase(),price,description,content,images,category
        })

        res.json({msg: "UPDATE A PRODUCT"})
    } catch (err) {
        return res.status(500).json({mag: err.message})
    }
}
}

module.exports = productCtrl