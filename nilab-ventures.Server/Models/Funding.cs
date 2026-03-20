using System.ComponentModel.DataAnnotations;

namespace nilab_ventures.Server.Models
{
    public class Funding
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public string? Email { get; set; }

        public string? Linkedin { get; set; }

        [Required]
        public string? Description { get; set; }

        public string? Stage { get; set; }

        public string? funding_types { get; set; } // JSON string

        public string? Problem { get; set; }

        public decimal? Amount { get; set; }

        public string? Milestones { get; set; } // JSON string

        public string? market_size { get; set; }

        public string? Revenue { get; set; }

        public string? team_exp { get; set; } // JSON string

        public string? competitive_advantage { get; set; }

        public string? Equity { get; set; }

        public string? profitability_timeline { get; set; }

        public int? competitive_landscape { get; set; }

        public string? Roi { get; set; }

        public DateTime submitted_at { get; set; } = DateTime.UtcNow;

        public DateTime updated_at { get; set; } = DateTime.UtcNow;

        public string Status { get; set; } = "pending";
        public bool visible { get; set; }
    }
}
