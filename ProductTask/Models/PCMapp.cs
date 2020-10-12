using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductTask.Models
{
    public class PCMapp
    {
        /// <summary>
        /// AI Primary Key
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Product Id
        /// </summary>
        public int PId { get; set; }

        /// <summary>
        /// category ID
        /// </summary>
        public int CId { get; set; }
    }
}
