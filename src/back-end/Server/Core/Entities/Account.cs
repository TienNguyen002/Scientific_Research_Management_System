using Core.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Account : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int TypeAccountId { get; set; }
        public TypeAccount TypeAccount { get; set; }
        public int StudentId { get; set; }
        public Student Student { get; set; }
        public int LecturerId { get; set; }
        public Lecturer Lecturer { get; set; }
    }
}
