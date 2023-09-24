namespace NHS.Api.Models
{
    public class Requirement
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public DateTime DateCreated { get; set; } = DateTime.Now;

        public Status Status { get; set; } = Status.Open;

        public Staff? AssignedTo { get; set; }
    }
}