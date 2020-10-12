using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Odbc;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductTask.Class;
using ProductTask.Models;
using ServiceStack.OrmLite;
using ServiceStack.Web;

namespace ProductTask.Controllers
{
    [ApiController]
    public class ProductController : ControllerBase
    {
        [HttpGet]
        [Route("api/product/GetProductList")]
        public ActionResult GetProductList()
        {
            try
            {
                CustomResponse response = new CustomResponse();
                using (DBHandler db = new DBHandler())
                {
                    response.Item = db.GetProductList();
                    response.Message = "Ok";
                    return Ok(response);
                }
            }
            catch (Exception)
            {
                return Ok();
            }
        }

        [HttpGet]
        [Route("api/product/GetById/{id}")]
        public ActionResult GetById(int id)
        {
            CustomResponse response = new CustomResponse();
            try
            {
                using (var db = new DBHandler().OrmLite.Open())
                {
                    //response.Item = db.GetProductById(id);
                    var result = db.Single<Product>(x => x.PId == id);
                    int[] catID = db.Select<int>(db.From<PCMapp>().Where(x => x.PId == id).Select(x => x.CId)).ToArray();
                    result.Categories = db.Select<string>(db.From<Category>().Where(x => catID.Contains(x.CId)).Select(x => x.CName)).ToArray();
                    response.Item = result;
                }
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }

            return Ok(response);
        }

        [HttpPost]
        [Route("api/product/AddProduct")]
        public ActionResult PostAddProduct([FromBody]Product objProduct)
        {
            CustomResponse response = new CustomResponse();
            try
            {
                ProductHandler objBLProduct = new ProductHandler();
                objBLProduct.SaveProduct(objProduct);
                response.Message = "Saved Successfully";
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Error = ex.Message;
                return Ok(response);
            }
        }

        [HttpPut]
        [Route("api/product/UpdateProduct")]
        public ActionResult UpdateProduct([FromBody]Product objProduct)
        {
            CustomResponse response = new CustomResponse();
            try
            {
                ProductHandler objBLProduct = new ProductHandler();
                objBLProduct.SaveProduct(objProduct,true);
                response.Message = "Updated Successfully";
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Error = ex.Message;
                return Ok(response);
            }
        }

        [HttpDelete]
        [Route("api/product/DeleteProduct/{id}")]
        public ActionResult DeleteProduct(int id)
        {
            CustomResponse response = new CustomResponse();
            try
            {
                using (var db = new DBHandler().OrmLite.Open())
                {
                    db.DeleteById<Product>(id);
                    db.Delete<PCMapp>(x => x.PId == id);
                    response.Message = "Product Deleted Successfully";
                }
            }
            catch (Exception ex)
            {
                response.Error = ex.Message;
            }
            return Ok(response);
        }

    }
}
