namespace CatFactApi.Models;

public class HistoryEntry
{
    public int Id { get; set; }
    public DateTime Fecha { get; set; }
    public string Fact { get; set; } = string.Empty;
    public string Query { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
}
