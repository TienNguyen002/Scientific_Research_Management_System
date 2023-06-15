using Core.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Feedback : IEntity
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Content { get; set; }
    }
}
