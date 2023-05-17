using Core.Entities;
using Data.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Seeders
{
    public class DataSeeder : IDataSeeder
    {
        private readonly WebDbContext _context;

        public DataSeeder(WebDbContext context)
        {
            _context = context;
        }

        public void Initialize()
        {
            _context.Database.EnsureCreated();

            if (_context.Topics.Any()) return;

            var typeaccounts = AddTypeAccounts();
            var status = AddStatus();
            var processes = AddProcesses();
            var departments = AddDepartments();

            var students = AddStudents(departments);
            var lecturers = AddLecturers(departments);
            var groups = AddGroups(students, departments);
            var accounts = AddAccounts(students, lecturers, typeaccounts);
            var topics = AddTopics(groups, lecturers, departments, status, processes);
        }

        private IList<TypeAccount> AddTypeAccounts()
        {
            var typeAccounts = new List<TypeAccount>()
            {
                new()
                {
                    Type = "admin",
                    UrlSlug = "admin",
                },
                new()
                {
                    Type = "Sinh viên",
                    UrlSlug = "sinh-vien",
                },
                new()
                {
                    Type = "Giảng viên",
                    UrlSlug = "giang-vien",
                }
            };
            var typeAccountAdd = new List<TypeAccount>();
            foreach(var typeAccount in typeAccounts)
            {
                if(!_context.TypeAccounts.Any(t => t.UrlSlug == typeAccount.UrlSlug))
                {
                    typeAccountAdd.Add(typeAccount);
                }
            }
            _context.AddRange(typeAccountAdd);
            _context.SaveChanges();
            return typeAccounts;
        }

        private IList<Status> AddStatus()
        {
            var status = new List<Status>()
            {
                new()
                {
                    Name = "Chưa đăng ký",
                    UrlSlug = "chua-dang-ky"
                },
                new()
                {
                    Name = "Đã đăng ký",
                    UrlSlug = "da-dang-ky"
                },
            };
            var statusAdd = new List<Status>();
            foreach (var item in status)
            {
                if (!_context.Status.Any(s => s.UrlSlug == item.UrlSlug))
                {
                    statusAdd.Add(item);
                }
            }
            _context.AddRange(statusAdd);
            _context.SaveChanges();
            return status;
        }

        private IList<Process> AddProcesses()
        {
            var processes = new List<Process>()
            {
                new()
                {
                    Name = "Bắt đầu làm",
                    UrlSlug = "bat-dau-lam"
                },
                new()
                {
                    Name = "Đang làm",
                    UrlSlug = "dang-lam",
                },
                new()
                {
                    Name = "Tạm dừng",
                    UrlSlug = "tam-dung",
                },
                new()
                {
                    Name = "Đang viết báo cáo",
                    UrlSlug = "viet-bao-cao",
                },
                new()
                {
                    Name = "Chưa hoàn thành",
                    UrlSlug = "chua-hoan-thanh"
                },
                new()
                {
                    Name = "Hoàn thành",
                    UrlSlug = "hoan-thanh"
                },
            };
            var processAdd = new List<Process>();
            foreach (var process in processes)
            {
                if (!_context.Processes.Any(p => p.UrlSlug == process.UrlSlug))
                {
                    processAdd.Add(process);
                }
            }
            _context.AddRange(processAdd);
            _context.SaveChanges();
            return processes;
        }

        private IList<Department> AddDepartments()
        {
            var departments = new List<Department>()
            {
                new()
                {
                    Name = "Khoa Công nghệ thông tin",
                    UrlSlug = "cong-nghe-thong-tin"
                },
                new()
                {
                    Name = "Khoa Luật",
                    UrlSlug = "luat"
                },
                new()
                {
                    Name = "Khoa Sư phạm",
                    UrlSlug = "su-pham",
                },
                new()
                {
                    Name = "Khoa Du lịch",
                    UrlSlug = "du-lich",
                },
                new()
                {
                    Name = "Khoa Ngoại ngữ",
                    UrlSlug = "ngoai-ngu",
                },
                new()
                {
                    Name = "Khoa Nông lâm",
                    UrlSlug = "nong-lam"
                },
            };
            var departmentAdd = new List<Department>();
            foreach (var department in departments)
            {
                if (!_context.Departments.Any(p => p.UrlSlug == department.UrlSlug))
                {
                    departmentAdd.Add(department);
                }
            }
            _context.AddRange(departmentAdd);
            _context.SaveChanges();
            return departments;
        }

        private IList<Student> AddStudents(
            IList<Department> departments)
        {
            var students = new List<Student>()
            {
                new()
                {
                    StudentId = "2015749",
                    FullName = "Nguyễn Hoàng Nhật Tiến",
                    UrlSlug = "nguyen-hoang-nhat-tien",
                    DoB = new DateTime(2002, 12, 18),
                    Phone = "0819104319",
                    Class = "CTK44-PM",
                    Year = "2020 - 2024",
                    Address = "63 Đống Đa - P3 - Tp. Đà Lạt - Tỉnh Lâm Đồng",
                    Department = departments[0]
                },
                new()
                {
                    StudentId = "2011382",
                    FullName = "Trần Trung Hiếu",
                    UrlSlug = "tran-trung-hieu",
                    DoB = new DateTime(2002, 7, 1),
                    Phone = "0869820809",
                    Class = "CTK44-PM",
                    Year = "2020 - 2024",
                    Address = "Đào Duy Từ - Tp. Đà Lạt - Tỉnh Lâm Đồng",
                    Department = departments[0]
                },
                new()
                {
                    StudentId = "2015840",
                    FullName = "Nguyễn Ngọc Minh Tiến",
                    UrlSlug = "nguyen-ngoc-minh-tien",
                    DoB = new DateTime(2002, 2, 17),
                    Phone = "0918277182",
                    Class = "CTK44-PM",
                    Year = "2020 - 2024",
                    Address = "Tp. Đà Lạt - Tỉnh Lâm Đồng",
                    Department = departments[0]
                },
                new()
                {
                    StudentId = "2011928",
                    FullName = "Test 1",
                    UrlSlug = "test-1",
                    DoB = new DateTime(2002, 2, 2),
                    Phone = "0123456789",
                    Class = "Luật",
                    Year = "2020 - 2024",
                    Address = "Tp. Đà Lạt - Tỉnh Lâm Đồng",
                    Department = departments[1]
                },
                new()
                {
                    StudentId = "2011927",
                    FullName = "Test 2",
                    UrlSlug = "test-2",
                    DoB = new DateTime(2002, 2, 2),
                    Phone = "0123456789",
                    Class = "Sư phạm",
                    Year = "2020 - 2024",
                    Address = "Tp. Đà Lạt - Tỉnh Lâm Đồng",
                    Department = departments[2]
                },
                new()
                {
                    StudentId = "2011926",
                    FullName = "Test 3",
                    UrlSlug = "test-3",
                    DoB = new DateTime(2002, 2, 2),
                    Phone = "0123456789",
                    Class = "Du lịch",
                    Year = "2020 - 2024",
                    Address = "Tp. Đà Lạt - Tỉnh Lâm Đồng",
                    Department = departments[3]
                },
                new()
                {
                    StudentId = "2011925",
                    FullName = "Test 4",
                    UrlSlug = "test-4",
                    DoB = new DateTime(2002, 2, 2),
                    Phone = "0123456789",
                    Class = "Ngoại ngữ",
                    Year = "2020 - 2024",
                    Address = "Tp. Đà Lạt - Tỉnh Lâm Đồng",
                    Department = departments[4]
                },
                new()
                {
                    StudentId = "2011924",
                    FullName = "Test 5",
                    UrlSlug = "test-5",
                    DoB = new DateTime(2002, 2, 2),
                    Phone = "0123456789",
                    Class = "Nông lâm",
                    Year = "2020 - 2024",
                    Address = "Tp. Đà Lạt - Tỉnh Lâm Đồng",
                    Department = departments[5]
                },
            };
            var studentAdd = new List<Student>();
            foreach (var student in students)
            {
                if (!_context.Students.Any(s => s.UrlSlug == student.UrlSlug && s.StudentId == student.StudentId))
                {
                    studentAdd.Add(student);
                }
            }
            _context.AddRange(studentAdd);
            _context.SaveChanges();
            return students;
        }

        private IList<Group> AddGroups(
            IList<Student> students,
            IList<Department> departments)
        {
            var groups = new List<Group>()
            {
                new()
                {
                    Name = "Nhóm Công nghệ thông tin 1",
                    UrlSlug = "cntt-1",
                    Department = departments[0],
                    Students = new List<Student>()
                    {
                        students[0],
                        students[1],
                        students[2]
                    }
                },
                new()
                {
                    Name = "Nhóm Luật",
                    UrlSlug = "luat",
                    Department = departments[1],
                    Students = new List<Student>()
                    {
                        students[3],
                    }
                },
                new()
                {
                    Name = "Nhóm Sư phạm",
                    UrlSlug = "su-pham",
                    Department = departments[2],
                    Students = new List<Student>()
                    {
                        students[4],
                    }
                },
                new()
                {
                    Name = "Nhóm Du lịch",
                    UrlSlug = "du-lich",
                    Department = departments[3],
                    Students = new List<Student>()
                    {
                        students[5],
                    }
                },
                new()
                {
                    Name = "Nhóm Ngoại ngữ",
                    UrlSlug = "ngoai-ngu",
                    Department = departments[4],
                    Students = new List<Student>()
                    {
                        students[6],
                    }
                },
                new()
                {
                    Name = "Nhóm Nông lâm",
                    UrlSlug = "nong-lam",
                    Department = departments[5],
                    Students = new List<Student>()
                    {
                        students[7],
                    }
                },
            };
            var groupAdd = new List<Group>();
            foreach (var group in groups)
            {
                if (!_context.Groups.Any(g => g.UrlSlug == group.UrlSlug))
                {
                    groupAdd.Add(group);
                }
            }
            _context.AddRange(groupAdd);
            _context.SaveChanges();
            return groups;
        }

        private IList<Lecturer> AddLecturers(
            IList<Department> departments)
        {
            var lecturers = new List<Lecturer>()
            {
                new()
                {
                    FullName = "GV1",
                    UrlSlug = "gv1",
                    Qualification = "Tiến sĩ",
                    DoB = new DateTime(1990, 1, 1),
                    Department = departments[0]
                },
                new()
                {
                    FullName = "GV2",
                    UrlSlug = "gv2",
                    Qualification = "Tiến sĩ",
                    DoB = new DateTime(1990, 1, 1),
                    Department = departments[1]
                },
                new()
                {
                    FullName = "GV3",
                    UrlSlug = "gv3",
                    Qualification = "Tiến sĩ",
                    DoB = new DateTime(1990, 1, 1),
                    Department = departments[2]
                },
                new()
                {
                    FullName = "GV4",
                    UrlSlug = "gv4",
                    Qualification = "Tiến sĩ",
                    DoB = new DateTime(1990, 1, 1),
                    Department = departments[3]
                },
                new()
                {
                    FullName = "GV5",
                    UrlSlug = "gv5",
                    Qualification = "Tiến sĩ",
                    DoB = new DateTime(1990, 1, 1),
                    Department = departments[4]
                },
                new()
                {
                    FullName = "GV6",
                    UrlSlug = "gv6",
                    Qualification = "Tiến sĩ",
                    DoB = new DateTime(1990, 1, 1),
                    Department = departments[5]
                },
            };
            var lecturerAdd = new List<Lecturer>();
            foreach (var lecturer in lecturers)
            {
                if (!_context.Lecturers.Any(s => s.UrlSlug == lecturer.UrlSlug))
                {
                    lecturerAdd.Add(lecturer);
                }
            }
            _context.AddRange(lecturerAdd);
            _context.SaveChanges();
            return lecturers;
        }

        private IList<Account> AddAccounts(
            IList<Student> students,
            IList<Lecturer> lecturers,
            IList<TypeAccount> typeAccounts)
        {
            var accounts = new List<Account>()
            {
                new()
                {
                    Name = "Admin",
                    Email = "admin@gmail.com",
                    Password = "admin",
                    TypeAccount = typeAccounts[0]
                },
                new()
                {
                    Name = "Tiến Nguyễn",
                    Email = "2015749@dlu.edu.vn",
                    Password = "tien123",
                    TypeAccount = typeAccounts[1],
                    Student = students[0]
                },
                new()
                {
                    Name = "Hiếu",
                    Email = "2011382@dlu.edu.vn",
                    Password = "hieu123",
                    TypeAccount = typeAccounts[1],
                    Student = students[1]
                },
                new()
                {
                    Name = "Minh Tiến",
                    Email = "2015840@dlu.edu.vn",
                    Password = "tien123",
                    TypeAccount = typeAccounts[1],
                    Student = students[2]
                },
                new()
                {
                    Name = "Test 1",
                    Email = "test1@dlu.edu.vn",
                    Password = "test1",
                    TypeAccount = typeAccounts[1],
                    Student = students[3]
                },
                new()
                {
                    Name = "Test 2",
                    Email = "test2@dlu.edu.vn",
                    Password = "test2",
                    TypeAccount = typeAccounts[1],
                    Student = students[4]
                },
                new()
                {
                    Name = "Test 3",
                    Email = "test3@dlu.edu.vn",
                    Password = "test3",
                    TypeAccount = typeAccounts[1],
                    Student = students[5]
                },
                new()
                {
                    Name = "Test 4",
                    Email = "test4@dlu.edu.vn",
                    Password = "test4",
                    TypeAccount = typeAccounts[1],
                    Student = students[6]
                },
                new()
                {
                    Name = "Test 5",
                    Email = "test5@dlu.edu.vn",
                    Password = "test5",
                    TypeAccount = typeAccounts[1],
                    Student = students[7]
                },
                new()
                {
                    Name = "GV1",
                    Email = "gv1@dlu.edu.vn",
                    Password = "gv1",
                    TypeAccount = typeAccounts[2],
                    Lecturer = lecturers[0]
                },
                new()
                {
                    Name = "GV2",
                    Email = "gv2@dlu.edu.vn",
                    Password = "gv2",
                    TypeAccount = typeAccounts[2],
                    Lecturer = lecturers[1]
                },
                new()
                {
                    Name = "GV3",
                    Email = "gv3@dlu.edu.vn",
                    Password = "gv3",
                    TypeAccount = typeAccounts[2],
                    Lecturer = lecturers[2]
                },
                new()
                {
                    Name = "GV4",
                    Email = "gv4@dlu.edu.vn",
                    Password = "gv4",
                    TypeAccount = typeAccounts[2],
                    Lecturer = lecturers[3]
                },
                new()
                {
                    Name = "GV5",
                    Email = "gv5@dlu.edu.vn",
                    Password = "gv5",
                    TypeAccount = typeAccounts[2],
                    Lecturer = lecturers[4]
                },
                new()
                {
                    Name = "GV6",
                    Email = "gv6@dlu.edu.vn",
                    Password = "gv6",
                    TypeAccount = typeAccounts[2],
                    Lecturer = lecturers[5]
                },
            };
            var accountAdd = new List<Account>();
            foreach (var account in accounts)
            {
                if (!_context.Accounts.Any(a => a.Email == account.Email))
                {
                    accountAdd.Add(account);
                }
            }
            _context.AddRange(accountAdd);
            _context.SaveChanges();
            return accounts;
        }

        private IList<Topic> AddTopics(
            IList<Group> groups,
            IList<Lecturer> lecturers,
            IList<Department> departments,
            IList<Status> status,
            IList<Process> processes)
        {
            var topics = new List<Topic>()
            {
                new()
                {
                    Title = "Nghiên cứu khoa học - CNTT",
                    UrlSlug = "nckh-cntt",
                    Description = "Nghiên cứu khoa học - CNTT",
                    RegistrationDate = new DateTime(2023, 4, 23),
                    StudentNumbers = 3,
                    Price = "1,000,000 VNĐ",
                    Group = groups[0],
                    Lecturer = lecturers[0],
                    Department = departments[0],
                    Status = status[1],
                    Process = processes[0]
                },
                new()
                {
                    Title = "Nghiên cứu khoa học - Luật",
                    UrlSlug = "nckh-luat",
                    Description = "Nghiên cứu khoa học - Luật",
                    RegistrationDate = new DateTime(2023, 4, 23),
                    StudentNumbers = 1,
                    Price = "500,000 VNĐ",
                    Lecturer = lecturers[1],
                    Department = departments[1],
                    Status = status[0],
                },
                new()
                {
                    Title = "Nghiên cứu khoa học - Sư phạm",
                    UrlSlug = "nckh-su-pham",
                    Description = "Nghiên cứu khoa học - Sư phạm",
                    RegistrationDate = new DateTime(2023, 4, 23),
                    StudentNumbers = 1,
                    Price = "500,000 VNĐ",
                    Lecturer = lecturers[2],
                    Department = departments[2],
                    Status = status[0],
                },
                new()
                {
                    Title = "Nghiên cứu khoa học - Du lịch",
                    UrlSlug = "nckh-du-lich",
                    Description = "Nghiên cứu khoa học - Du lịch",
                    RegistrationDate = new DateTime(2023, 4, 23),
                    StudentNumbers = 1,
                    Price = "500,000 VNĐ",
                    Lecturer = lecturers[3],
                    Department = departments[3],
                    Status = status[0],
                },
                new()
                {
                    Title = "Nghiên cứu khoa học - Ngoại ngữ",
                    UrlSlug = "nckh-ngoai-ngu",
                    Description = "Nghiên cứu khoa học - Ngoại ngữ",
                    RegistrationDate = new DateTime(2023, 4, 23),
                    StudentNumbers = 1,
                    Price = "500,000 VNĐ",
                    Lecturer = lecturers[4],
                    Department = departments[4],
                    Status = status[0],
                },
                new()
                {
                    Title = "Nghiên cứu khoa học - Nông lâm",
                    UrlSlug = "nckh-nong-lam",
                    Description = "Nghiên cứu khoa học - Nông lâm",
                    RegistrationDate = new DateTime(2023, 4, 23),
                    StudentNumbers = 1,
                    Price = "500,000 VNĐ",
                    Lecturer = lecturers[5],
                    Department = departments[5],
                    Status = status[0],
                },
            };
            var topicAdd = new List<Topic>();
            foreach (var topic in topics)
            {
                if (!_context.Topics.Any(t => t.UrlSlug == topic.UrlSlug))
                {
                    topicAdd.Add(topic);
                }
            }
            _context.AddRange(topicAdd);
            _context.SaveChanges();
            return topics;
        }
    }
}
