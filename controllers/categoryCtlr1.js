const Category = require('../models/categoriModel1')

const cetegoryCtrl1 = {
   getCategories: async(req, res) =>{
       try {
           const categories = await Category.find()
           res.json(categories)
       } catch (err) {
           return res.status(500).json({msg: err.message})
       }
   },
   createCategory: async (req, res) =>{
       try {

            const {name} = req.body;
            const category = await Category.findOne({name})
            if(category) return res.status(400).json({msg: "the category already exists"})
            const newCategory = new Category({name})
            await newCategory.save()
           res.json({msg: "created Category"})
       } catch (err) {
        return res.status(500).json({msg: err.message})
       }
   },
   deleteCategory: async (req, res) =>{
       try {
           await Category.findByIdAndDelete(req.params.id)
           res.json({msg: "Deleted category"})
       } catch (err) {
        return res.status(500).json({msg: err.message}) 
       }
   },
   updateCategory: async (req, res) =>{
    try {
        const {name} = req.body;
        await Category.findOneAndUpdate({_id: req.params.id}, {name})

        res.json({msg: "Update category"})
    } catch (err) {
     return res.status(500).json({msg: err.message}) 
    }
}
}

module.exports = cetegoryCtrl1