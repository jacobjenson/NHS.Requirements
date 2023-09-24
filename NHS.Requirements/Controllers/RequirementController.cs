using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NHS.Api.DAL;
using NHS.Api.Models;

namespace NHS.Api.Controllers
{
    [ApiController]
    [Route("")]
    public class RequirementController : ControllerBase
    {
        private readonly RequirementContext _context;

        public RequirementController(RequirementContext context)
        {
            _context = context;
        }

        [HttpPost("add")]
        public void AddRequirement(Requirement requirement)
        {
            _context.Requirements.Add(requirement);
            _context.SaveChanges();
        }

        [HttpGet]
        public IEnumerable<Requirement> GetAll()
        {
            var requirements = _context.Requirements
                .Include(r => r.AssignedTo)
                .ToList();

            return requirements;
        }

        [HttpGet("get/{id}")]
        public Requirement Get(int id)
        {
            var requirement = _context.Requirements
                .Include(r => r.AssignedTo)
                .SingleOrDefault(r => r.Id == id);

            if (requirement == null)
            {
                throw new Exception("Requirement not found");
            }

            return requirement;
        }

        [HttpGet("close/{id}")]
        public void Close(int id)
        {
            var requirement = _context.Requirements.Find(id);

            if (requirement == null)
            {
                throw new Exception("Requirement not found");
            }

            requirement.Status = Status.Closed;
            _context.SaveChanges();
        }

        [HttpGet("assign/{id}/{staffId?}")]
        public void Assign(int id, int? staffId)
        {
            var requirement = Get(id);

            if (requirement == null)
            {
                throw new Exception("Requirement not found");
            }

            Staff? staff = null;

            if (staffId != null)
            {
                staff = _context.Staff.Find(staffId);

                if (staff == null)
                {
                    throw new Exception("Staff not found");
                }
            }

            requirement.AssignedTo = staff;
            _context.SaveChanges();
        }
    }
}