using System.ComponentModel.DataAnnotations;

namespace nilab_ventures.Server.DTOs
{
    public class FundingDTO
    {
        [Required]
        public string? Name { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        public string? Linkedin { get; set; }

        [Required]
        public string? Description { get; set; }

        public string? Stage { get; set; }

        public List<string>? funding_types { get; set; }

        public string? Problem { get; set; }

        public decimal? Amount { get; set; }

        public List<string>? Milestones { get; set; }

        public string? market_size { get; set; }

        public string? Revenue { get; set; }

        public Dictionary<string, string>? team_exp { get; set; }

        public string? competitive_advantage { get; set; }

        public string? Equity { get; set; }

        public string? profitability_timeline { get; set; }

        public int? competitive_landscape { get; set; }

        public string? Roi { get; set; }
        public bool visible { get; set; }
    }
}
