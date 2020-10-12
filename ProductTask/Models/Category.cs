using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductTask.Models
{
    public class Category
    {
        public int CId { get; set; }

        public string CName { get; set; }

        public int Status { get; set; }

        public string  Description { get; set; }
    }
}
