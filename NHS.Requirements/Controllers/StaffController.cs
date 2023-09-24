using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NHS.Api.DAL;
using NHS.Api.Models;

namespace NHS.Api.Controllers
{
    [ApiController]
    [Route("staff")]
    public class StaffController : ControllerBase
    {
        private readonly RequirementContext _context;

        public StaffController(RequirementContext context)
        {
            _context = context;
        }

        [HttpPost("add")]
        public void AddStaff(Staff staff)
        {
            _context.Staff.Add(staff);
            _context.SaveChanges();
        }

        [HttpGet]
        public IEnumerable<Staff> GetAll()
        {
            var staff = _context.Staff
                .ToList();

            return staff;
        }

        [HttpGet("get/{id}")]
        public Staff Get(int id)
        {
            var staff = _context.Staff.Find(id);

            if (staff == null)
            {
                throw new Exception("Staff not found");
            }

            return staff;
        }
    }
}