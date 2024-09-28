import {getcategorys,getCategoryByCode,addCategory,deleteCategory,updateCategory} from '../service/category.js';
export class Category {
    getAll = async (req, res) => {

        try {
            const result = await getcategory();
            console.log('successfully ');
            res.send(result);

        } catch (error) {
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);
        }
    };
    search = async (req, res) => {
        try {
            const id = req.params.code;
            console.log(id);
            const result = await getCategoryById(id);
            if (result) {
                res.send(result);
            } else {
                res.status(404).send('Category not found');
            }
        } catch (error) {
            console.error('There was an error:', error.message);
            res.status(500).send(error.message);
        }
    };
    add = async (req, res) => {

        try {
            let newCategory  = req.body; // Corrected variable name          
            let category= await addCategory(newCategory); // Corrected variable name           
            res.send(category);

        } catch (error) {
            console.log('there was an error:', error.message);
            res.status(500).send(error.message);

        }
    };
    delete=( async (req, res) => {
        try {
            const id = req.params.code;
            console.log(`Deleting category with id: ${id}`);
            const result = await deleteCategory(id);
            if (result.rowsAffected[0] === 0) {
                res.status(404).send("Category not found");
            } else {
                res.send({ message: "Category deleted successfully" });
            }
    
        } catch (error) {
            console.log('There was an error:', error.message);
            res.status(500).send(error.message);
        }
    });
    put = ( async (req, res) => {

        try {
            const id = req.params.code;
            let editcategory = req.body;
            const categorys = result.recordset;
            let editcategorys = await updateCategory(code, editcategory); 
            res.send(editcategorys);
        } catch (error) {
            console.log('There was an error:', error.message);
            res.status(404).send(error.message);
        }
    });
}