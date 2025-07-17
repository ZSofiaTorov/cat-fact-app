using Microsoft.EntityFrameworkCore;
using CatFactApi.Models;

namespace CatFactApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<HistoryEntry> HistoryEntries => Set<HistoryEntry>();
    }
}
