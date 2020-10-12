using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ProductTask.Class
{
    public class CustomResponse
    {
        /// <summary>
        /// Return Data
        /// </summary>
        public object Item { get; set; }

        /// <summary>
        /// Success OR Warning Message
        /// </summary>
        public string Message { get; set; }
        
        /// <summary>
        /// Error Message
        /// </summary>
        public string Error { get; set; }

    }
}
