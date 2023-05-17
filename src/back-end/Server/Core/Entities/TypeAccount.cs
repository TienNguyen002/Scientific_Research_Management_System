using Core.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class TypeAccount : IEntity
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string UrlSlug { get; set; }
        public IList<Account> Accounts { get; set; }
    }
}
