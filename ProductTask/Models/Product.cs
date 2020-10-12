using ServiceStack.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductTask.Models
{
    public class Product
    {
        public int PId { get; set; }

        public string PName { get; set; }

        public double Cost { get; set; }

        public int Status { get; set; }

        public string Description { get; set; }

        [Ignore]
        public string[] Categories { get; set; }
    }
}
