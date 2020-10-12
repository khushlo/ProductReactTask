using ProductTask.Models;
using ServiceStack.OrmLite;
using System.Collections.Generic;
using System.Linq;

namespace ProductTask.Class
{
    public class ProductHandler
    {
        public void SaveProduct(Product objProduct, bool isEdit = false)
        {
            using (var db = new DBHandler().OrmLite.Open())
            {
                // Get Unique Category ID & Category Name
                Dictionary<int,string> lstCategory = db.Dictionary<int, string>(db.From<Category>().Select(x => new { x.CId, x.CName }));

                // Get Categories ID from Request
                var CatId = lstCategory.Where(x => objProduct.Categories.Contains(x.Value)).Select(x => x.Key);

                // For Insert Method
                if (!isEdit)
                {
                    var productID = (int)db.Insert(objProduct, selectIdentity: true);

                    List<PCMapp> lstMapping = new List<PCMapp>();

                    foreach (var category in CatId)
                    {
                        PCMapp objMapp = new PCMapp();
                        objMapp.PId = productID;
                        objMapp.CId = category;
                        lstMapping.Add(objMapp);
                    }

                    db.InsertAll(lstMapping); 
                }
                // For Update Method
                else
                {
                    db.Update(objProduct);

                    // Manage Mapping with Old Delete + New Insert 
                    db.Delete<PCMapp>(x => x.PId == objProduct.PId);
                    List<PCMapp> lstMapping = new List<PCMapp>();
                    foreach (var category in CatId)
                    {
                        PCMapp objMapp = new PCMapp();
                        objMapp.PId = objProduct.PId;
                        objMapp.CId = category;
                        lstMapping.Add(objMapp);
                    }
                    db.InsertAll(lstMapping);
                }
            }
        }
    }
}
