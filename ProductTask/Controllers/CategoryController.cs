﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductTask.Class;
using ProductTask.Models;
using ServiceStack.OrmLite;

namespace ProductTask.Controllers
{
    [ApiController]
    public class CategoryController : ControllerBase
    {
        [HttpGet]
        [Route("api/Category/CategoryList")]
        public IEnumerable<Models.Category> GetList()
        {
            using (var db = new DBHandler().OrmLite.Open())
            {
                return db.Select<Models.Category>();
            }
        }

        [HttpGet]
        [Route("api/Category/GetDDL")]
        public IEnumerable<string> GetDDL()
        {
            using (var db = new DBHandler().OrmLite.Open())
            {
                return db.Select(db.From<Category>().Where(x => x.Status > 0).Select(x => x.CName)).Select(x => x.CName);
            }
        }

        [HttpGet]
        [Route("api/Category/GetById/{id}")]
        public ActionResult<Models.Category> GetById(int id)
        {
            CustomResponse response = new CustomResponse();
            try
            {
                using (var db = new DBHandler().OrmLite.Open())
                {
                    response.Item =  db.SingleById<Models.Category>(id);
                }
            }
            catch (Exception ex)
            {
                response.Error = ex.Message;
            }
            return Ok(response);
        }

        [HttpPost]
        [Route("api/Category/AddCategory")]
        public ActionResult PostAddCategory([FromBody] Category objCat)
        {
            CustomResponse response = new CustomResponse();
            try
            {
                using (var db = new DBHandler().OrmLite.Open())
                {
                    db.Insert<Category>(objCat);
                    response.Message = "Record Saved Successfully";
                }
            }
            catch (Exception ex)
            {
                response.Error = ex.Message;
            }
            return Ok(response);
        }

        [HttpPut]
        [Route("api/Category/UpdateCategory")]
        public ActionResult UpdateCategory([FromBody]Category objCat)
        {
            CustomResponse response = new CustomResponse();
            try
            {
                using (var db = new DBHandler().OrmLite.Open())
                {
                    db.Update<Category>(objCat);
                    response.Message = "Record Updated Successfully";
                }
            }
            catch (Exception ex)
            {
                response.Error = ex.Message;
            }
            return Ok(response);
        }

        [HttpDelete]
        [Route("api/Category/DeleteCategory/{id}")]
        public ActionResult DeleteCategory(int id)
        {
            CustomResponse response = new CustomResponse();
            try
            {
                using (var db = new DBHandler().OrmLite.Open())
                {
                    if (ValidateBeforeDelete(db, id))
                    {
                        db.DeleteById<Category>(id);
                        response.Message = "Deleted Successfully";
                    }
                    else
                    {
                        response.Error = "Category Reference Exist in Products. Can't Delete it";
                    }
                }
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Error = ex.Message;
                return Ok(response);
            }
        }

        private bool ValidateBeforeDelete(System.Data.IDbConnection db, int catId)
        {
            return db.Count<PCMapp>(x => x.CId == catId) == 0;
        }
    }
}
