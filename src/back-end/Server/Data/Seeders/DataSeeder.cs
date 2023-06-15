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

            var status = AddStatus();
            var departments = AddDepartments();
            var roles = AddRoles();
            var feedbacks = AddFeedbacks();

            var students = AddStudents(departments, roles);
            var lecturers = AddLecturers(departments, roles);
            var topics = AddTopics(students, lecturers, departments, status);
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
                new()
                {
                    Name = "Đã nghiệm thu",
                    UrlSlug = "da-nghiem-thu"
                },
                new()
                {
                    Name = "Tạm dừng",
                    UrlSlug = "tam-dung",
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
                    Name = "Khoa Quốc tế học",
                    UrlSlug = "quoc-te-hoc",
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

        private IList<Role> AddRoles()
        {
            var roles = new List<Role>()
            {
                new()
                {
                    Name = "Sinh viên",
                    UrlSlug = "sinh-vien",
                },
                new()
                {
                    Name = "Giảng viên",
                    UrlSlug = "giang-vien",
                }
            };
            var roleAdd = new List<Role>();
            foreach (var role in roles)
            {
                if (!_context.Roles.Any(r => r.UrlSlug == role.UrlSlug))
                {
                    roleAdd.Add(role);
                }
            }
            _context.AddRange(roleAdd);
            _context.SaveChanges();
            return roles;
        }

        private IList<Feedback> AddFeedbacks()
        {
            var feedbacks = new List<Feedback>()
            {
                new()
                {
                    Username = "Nguyễn Ngọc Minh Tiến",
                    Content = "Em gặp lỗi trong quá trình đăng ký đề tài",
                    CreateDate = DateTime.Now,
                },
            };
            _context.AddRange(feedbacks);
            _context.SaveChanges();
            return feedbacks;
        }

        private IList<Student> AddStudents(
            IList<Department> departments,
            IList<Role> roles)
        {
            var students = new List<Student>()
            {
                new()
                {
                    StudentId = "2015749",
                    FullName = "Nguyễn Hoàng Nhật Tiến",
                    Email = "2015749@dlu.edu.vn",
                    Password = "password",
                    UrlSlug = "nguyen-hoang-nhat-tien",
                    DoB = new DateTime(2002, 12, 18),
                    Phone = "0819104319",
                    Class = "CTK44-PM",
                    Year = "2020 - 2024",
                    Address = "63 Đống Đa - P3 - Tp. Đà Lạt - Tỉnh Lâm Đồng",
                    Department = departments[0],
                    Role = roles[0],
                },
                new()
                {
                    StudentId = "2011382",
                    FullName = "Trần Trung Hiếu",
                    Email = "2011382@dlu.edu.vn",
                    Password = "password",
                    UrlSlug = "tran-trung-hieu",
                    DoB = new DateTime(2002, 7, 1),
                    Phone = "0869820809",
                    Class = "CTK44-PM",
                    Year = "2020 - 2024",
                    Address = "Đào Duy Từ - Tp. Đà Lạt - Tỉnh Lâm Đồng",
                    Department = departments[0],
                    Role = roles[0],
                },
                new()
                {
                    StudentId = "2015840",
                    FullName = "Nguyễn Ngọc Minh Tiến",
                    Email = "2015840@dlu.edu.vn",
                    Password = "password",
                    UrlSlug = "nguyen-ngoc-minh-tien",
                    DoB = new DateTime(2002, 2, 17),
                    Phone = "0918277182",
                    Class = "CTK44-PM",
                    Year = "2020 - 2024",
                    Address = "Tp. Đà Lạt - Tỉnh Lâm Đồng",
                    Department = departments[0],
                    Role = roles[0],
                },
                new()
                {
                    StudentId = "2011928",
                    FullName = "Lê Đức Anh",
                    Email = "2011928@dlu.edu.vn",
                    Password = "password",
                    UrlSlug = "le-duc-anh",
                    DoB = new DateTime(2002, 2, 2),
                    Phone = "0123456789",
                    Class = "Luật",
                    Year = "2020 - 2024",
                    Address = "Tp. Đà Lạt - Tỉnh Lâm Đồng",
                    Department = departments[1],
                    Role = roles[0],
                },
                new()
                {
                    StudentId = "2011927",
                    FullName = "Đinh Văn Thanh Phước Khoa",
                    Email = "2011927@dlu.edu.vn",
                    Password = "password",
                    UrlSlug = "dinh-van-thanh-phuoc-khoa",
                    DoB = new DateTime(2002, 2, 2),
                    Phone = "0123456789",
                    Class = "Sư phạm",
                    Year = "2020 - 2024",
                    Address = "Tp. Đà Lạt - Tỉnh Lâm Đồng",
                    Department = departments[2],
                    Role = roles[0],
                },
                new()
                {
                    StudentId = "2011926",
                    FullName = "Nguyễn Văn Thuận",
                    Email = "2011926@dlu.edu.vn",
                    Password = "password",
                    UrlSlug = "nguyen-van-thuan",
                    DoB = new DateTime(2002, 2, 2),
                    Phone = "0123456789",
                    Class = "Du lịch",
                    Year = "2020 - 2024",
                    Address = "Tp. Đà Lạt - Tỉnh Lâm Đồng",
                    Department = departments[3],
                    Role = roles[0],
                },
                new()
                {
                    StudentId = "2011925",
                    FullName = "Trần Thái Linh",
                    Email = "2011925@dlu.edu.vn",
                    Password = "password",
                    UrlSlug = "tran-thai-linh",
                    DoB = new DateTime(2002, 2, 2),
                    Phone = "0123456789",
                    Class = "Ngoại ngữ",
                    Year = "2020 - 2024",
                    Address = "Tp. Đà Lạt - Tỉnh Lâm Đồng",
                    Department = departments[4],
                    Role = roles[0],
                },
                new()
                {
                    StudentId = "2011924",
                    FullName = "Nguyễn Minh Hoàng",
                    Email = "2011924@dlu.edu.vn",
                    Password = "password",
                    UrlSlug = "nguyen-minh-hoang",
                    DoB = new DateTime(2002, 2, 2),
                    Phone = "0123456789",
                    Class = "Nông lâm",
                    Year = "2020 - 2024",
                    Address = "Tp. Đà Lạt - Tỉnh Lâm Đồng",
                    Department = departments[5],
                    Role = roles[0],
                },
            };
            var studentAdd = new List<Student>();
            foreach (var student in students)
            {
                if (!_context.Students.Any(s => s.Email == student.Email))
                {
                    studentAdd.Add(student);
                }
            }
            _context.AddRange(studentAdd);
            _context.SaveChanges();
            return students;
        }

        private IList<Lecturer> AddLecturers(
            IList<Department> departments,
            IList<Role> roles)
        {
            var lecturers = new List<Lecturer>()
            {
                new()
                {
                    FullName = "Lê Hoàng Nghĩa",
                    Email = "nghiahoang@dlu.edu.vn",
                    Password = "Password",
                    UrlSlug = "le-hoang-nghia",
                    Qualification = "Tiến sĩ",
                    DoB = new DateTime(1990, 1, 1),
                    Department = departments[0],
                    Role = roles[1],
                },
                new()
                {
                    FullName = "Nguyễn Phương",
                    Email = "nguyenphuong@dlu.edu.vn",
                    Password = "Password",
                    UrlSlug = "nguyen-phuong",
                    Qualification = "Tiến sĩ",
                    DoB = new DateTime(1990, 1, 1),
                    Department = departments[1],
                    Role = roles[1],
                },
                new()
                {
                    FullName = "Lê Hải",
                    Email = "lehai@dlu.edu.vn",
                    Password = "Password",
                    UrlSlug = "le-hai",
                    Qualification = "Tiến sĩ",
                    DoB = new DateTime(1990, 1, 1),
                    Department = departments[2],
                    Role = roles[1],
                },
                new()
                {
                    FullName = "Lê Thanh Tịnh",
                    Email = "thanhtinh@dlu.edu.vn",
                    Password = "Password",
                    UrlSlug = "le-thanh-tinh",
                    Qualification = "Tiến sĩ",
                    DoB = new DateTime(1990, 1, 1),
                    Department = departments[3],
                    Role = roles[1],
                },
                new()
                {
                    FullName = "Nguyễn Đức Anh",
                    Email = "ducanhnguyen@dlu.edu.vn",
                    Password = "Password",
                    UrlSlug = "nguyen-duc-anh",
                    Qualification = "Tiến sĩ",
                    DoB = new DateTime(1990, 1, 1),
                    Department = departments[4],
                    Role = roles[1],
                },
                new()
                {
                    FullName = "Phan Sĩ Phương",
                    Email = "siphuong@dlu.edu.vn",
                    Password = "Password",
                    UrlSlug = "phan-si-phuong",
                    Qualification = "Tiến sĩ",
                    DoB = new DateTime(1990, 1, 1),
                    Department = departments[5],
                    Role = roles[1],
                },
            };
            var lecturerAdd = new List<Lecturer>();
            foreach (var lecturer in lecturers)
            {
                if (!_context.Lecturers.Any(s => s.Email == lecturer.Email))
                {
                    lecturerAdd.Add(lecturer);
                }
            }
            _context.AddRange(lecturerAdd);
            _context.SaveChanges();
            return lecturers;
        }

        private IList<Topic> AddTopics(
            IList<Student> students,
            IList<Lecturer> lecturers,
            IList<Department> departments,
            IList<Status> status)
        {
            var topics = new List<Topic>()
            {
                new()
                {
                    Title = "Triển khai hệ thống cân bằng tải cho hệ thống mã nguồn mở Moodle",
                    UrlSlug = "he-thong-ma-nguon-mo-moodle",
                    Description = "Moodle là một hệ thống quản lý học tập - LMS (Learning Management System) mã nguồn mở phù hợp cho các trường đại học cho việc tổ chức học tập trực tuyến. Việc thay đổi hình thức học tập truyền thống sang hình thức trực tuyến đang được chú trọng hơn trong thời gian mà dịch COVID 19 đang diễn ra",
                    RegistrationDate = new DateTime(2023, 4, 23),
                    EndDate = new DateTime(2023,7,25),
                    StudentNumbers = 3,
                    Price = 1000000,
                    Students = new List<Student>()
                    {
                        students[0],
                        students[1],
                        students[2]
                    },
                    Lecturer = lecturers[0],
                    Department = departments[0],
                    Status = status[1],
                },
                new()
                {
                    Title = "Pháp luật về phí trong bảo hiểm tài sản",
                    UrlSlug = "phap-luat-ve-phi-trong-bao-hiem-tai-san",
                    Description = "Pháp luật về phí trong bảo hiểm tài sản",
                    RegistrationDate = new DateTime(2023, 4, 23),
                    EndDate = new DateTime(2023,7,25),
                    StudentNumbers = 1,
                    Price = 500000,
                    Lecturer = lecturers[1],
                    Department = departments[1],
                    Status = status[0],
                },
                new()
                {
                    Title = "Sơ đồ hóa kiến thức một số phần chương sinh sản lớp 11 nhằm nâng cao kết quả học tập",
                    UrlSlug = "kien-thuc-11",
                    Description = "Sơ đồ hóa kiến thức một số phần chương sinh sản lớp 11 nhằm nâng cao kết quả học tập",
                    RegistrationDate = new DateTime(2023, 4, 23),
                    EndDate = new DateTime(2023,7,25),
                    StudentNumbers = 1,
                    Price = 500000,
                    Lecturer = lecturers[2],
                    Department = departments[2],
                    Status = status[0],
                },
                new()
                {
                    Title = "Tìm hiểu về kinh doanh du lịch bền vững tại hình mẫu làng văn hóa du lịch Sa Đéc",
                    UrlSlug = "du-lich-sa-dec",
                    Description = "Bài viết tập trung mô tả tổng quan nghiên cứu lý thuyết về kinh doanh du lịch bền vững, và đi vào nghiên cứu kinh doanh du lịch bền vững tại Làng văn hóa du lịch Sa Đéc, Đồng Tháp. Các vấn đề được đề cập bao gồm tổng quan về khái niệm, nguyên tắc đối với kinh doanh du lịch bền vững, những lợi ích cũng như rào cản đối với kinh doanh bền vững tại Làng văn hóa du lịch Sa Đéc. Từ đó, đề xuất những kiến nghị giải pháp phát triển kinh doanh du lịch bền vững tại đây.",
                    RegistrationDate = new DateTime(2023, 4, 23),
                    EndDate = new DateTime(2023,7,25),
                    StudentNumbers = 1,
                    Price = 500000,
                    Lecturer = lecturers[3],
                    Department = departments[3],
                    Status = status[0],
                },
                new()
                {
                    Title = "Tính cách người Nhật qua một số truyện cổ tích Nhật bản đã dịch ở Việt Nam",
                    UrlSlug = "tinh-cach-nguoi-nhat",
                    Description = "Tính cách người Nhật qua một số truyện cổ tích Nhật bản",
                    RegistrationDate = new DateTime(2023, 4, 23),
                    EndDate = new DateTime(2023,7,25),
                    StudentNumbers = 1,
                    Price = 500000,
                    Lecturer = lecturers[4],
                    Department = departments[4],
                    Status = status[0],
                },
                new()
                {
                    Title = "Thiết kế và thực hiện chính sách và dự án Các bon rừng ngập mặn hiệu quả, hiệu ích và công bằng",
                    UrlSlug = "du-an-rung-ngap-man",
                    Description = "Thiết kế và thực hiện chính sách và dự án Các bon rừng ngập mặn hiệu quả, hiệu ích và công bằng",
                    RegistrationDate = new DateTime(2023, 4, 23),
                    EndDate = new DateTime(2023,7,25),
                    StudentNumbers = 1,
                    Price = 500000,
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
