using Microsoft.AspNetCore.Mvc;
using CatFactApi.Data;
using CatFactApi.Models;
using System.Net.Http;
using System.Text.Json;

namespace CatFactApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CatController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IHttpClientFactory _httpClientFactory;

        private readonly IConfiguration _configuration;


        public CatController(AppDbContext context, IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _context = context;
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;            
        }

        // GET: api/cat/random
        [HttpGet("random")]
        public async Task<IActionResult> GetRandomFact()
        {
            var url = "https://catfact.ninja/fact";
            var httpClient = _httpClientFactory.CreateClient();

            var response = await httpClient.GetAsync(url);
            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, "Error fetching cat fact");

            var json = await response.Content.ReadAsStringAsync();
            var jsonDoc = JsonDocument.Parse(json);
            var fact = jsonDoc.RootElement.GetProperty("fact").GetString();

            var entry = new HistoryEntry
            {
                Fecha = DateTime.Now,
                Fact = fact!,
                Query = "random",
                Url = url
            };

            _context.HistoryEntries.Add(entry);
            await _context.SaveChangesAsync();

            return Ok(fact);
        }

        // GET: api/cat/history
        [HttpGet("history")]
        public IActionResult GetHistory()
        {
            var history = _context.HistoryEntries
                                  .OrderByDescending(h => h.Fecha)
                                  .Take(10)
                                  .ToList();
            return Ok(history);
        }

        // GET: api/cat/gif
        [HttpGet("gif")]
        public async Task<IActionResult> GetGif()
        {
            var url = "https://catfact.ninja/fact";
            var httpClient = _httpClientFactory.CreateClient();

            // 1. Obtener fact
            var response = await httpClient.GetAsync(url);
            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, "Error fetching cat fact");

            var json = await response.Content.ReadAsStringAsync();
            var jsonDoc = JsonDocument.Parse(json);
            var fact = jsonDoc.RootElement.GetProperty("fact").GetString();

            // 2. Extraer 3 palabras clave
            var palabras = fact!.Split(' ')
                                .Where(p => p.Length > 4)
                                .Take(3)
                                .ToArray();
            var query = string.Join(" ", palabras);

            // 3. Consultar GIPHY
            var apiKey = _configuration.GetSection("Giphy:ApiKey").Value;
            var giphyUrl = $"https://api.giphy.com/v1/gifs/search?api_key={apiKey}&q={query}&limit=1";
            var giphyResponse = await httpClient.GetAsync(giphyUrl);

            if (!giphyResponse.IsSuccessStatusCode)
                return StatusCode((int)giphyResponse.StatusCode, "Error fetching GIF");

            var giphyJson = await giphyResponse.Content.ReadAsStringAsync();
            var gifDoc = JsonDocument.Parse(giphyJson);
            var gifUrl = gifDoc.RootElement
                               .GetProperty("data")[0]
                               .GetProperty("images")
                               .GetProperty("original")
                               .GetProperty("url")
                               .GetString();

            // 4. Guardar en historial
            var entry = new HistoryEntry
            {
                Fecha = DateTime.Now,
                Fact = fact!,
                Query = query,
                Url = url
            };

            _context.HistoryEntries.Add(entry);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                fact,
                gif = gifUrl
            });
        }
    }
}
