namespace GolfConnector.Web.dtos
{
    public class ClubDto
    {
        public ClubDto()
        {

        }
        public int ClubId { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public string City { get; set; }
        public string State { get; set; }
    }
}
