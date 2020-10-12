using MySql.Data.MySqlClient;
using ProductTask.Models;
using ServiceStack;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ProductTask.Class
{
    public class DBHandler : IDisposable
    {
        readonly string connString = "server=localhost;Database=producttask;Uid=root;Pwd=root;";
        public OrmLiteConnectionFactory OrmLite;

        public DBHandler()
        {
            OrmLite = new OrmLiteConnectionFactory(connString, MySqlDialect.Provider);
        }

        public DataTable GetProductList()
        {
            DataTable dt = new DataTable();
            string Query = string.Format(@"SELECT 
                                                P.PId,
                                                P.PName,
                                                P.Cost,
                                                P.Status,
                                                P.Description,
                                                GROUP_Concat(C.CName) AS Categories
                                           FROM PRODUCT AS P 
                                           Left JOIN PCMAPP AS M ON M.PId = P.PId
                                           Left JOIN CATEGORY AS C ON C.CId = M.CId
                                           WHERE C.Status = 1 OR C.Status is null
                                           Group BY P.PId");

            MySqlConnection conn = new MySqlConnection(connString);
            conn.Open();
            MySqlCommand cmd = new MySqlCommand(Query, conn);
            MySqlDataAdapter adpt = new MySqlDataAdapter(cmd);
            adpt.Fill(dt);
            return dt;
        }

        public DataTable GetProductById(int PID)
        {
            DataTable dt = new DataTable();
            string Query = string.Format(@"SELECT 
                                                P.PId,
                                                P.PName,
                                                P.Cost,
                                                CONVERT(P.Status,SIGNED) AS Status,
                                                P.Description,
                                                GROUP_Concat(C.CName) AS Categories
                                           FROM PRODUCT AS P 
                                           Left JOIN PCMAPP AS M ON M.PId = P.PId
                                           Left JOIN CATEGORY AS C ON C.CId = M.CId
                                           WHERE P.PId = {0} AND (C.Status = 1 OR C.Status is null)
                                           Group BY P.PId", PID);

            MySqlConnection conn = new MySqlConnection(connString);
            conn.Open();
            MySqlCommand cmd = new MySqlCommand(Query, conn);
            MySqlDataAdapter adpt = new MySqlDataAdapter(cmd);
            adpt.Fill(dt);
            return dt;
        }

        public void Dispose()
        {
            
        }
    }
}
