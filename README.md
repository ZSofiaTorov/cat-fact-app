Cat Fact App

Aplicación que muestra datos curiosos sobre gatos acompañados de un GIF . También mantiene un historial de los hechos consultados.

--------------------------------------------

## Estructura del Proyecto

Este repositorio contiene el **frontend en React** y el **backend en .NET 8 (ASP.NET Core Web API)**.

- `cat-gif-app-react/` → Aplicación frontend en React.
- `CatFactApi/` → API en ASP.NET Core que obtiene datos y guarda historial.
- `PruebaTecnica2.sln` → Solución de Visual Studio.

---

##  Ejecucion del proyecto Localmente

### ✅ Requisitos

- [Node.js](https://nodejs.org/) instalado
- [.NET 8 SDK](https://dotnet.microsoft.com/) instalado
- [Visual Studio](https://visualstudio.microsoft.com/) (opcional, para correr el backend fácilmente)

---

### 1. Ejecutar el **backend (.NET API)**

``` en el bash
cd CatFactApi
dotnet restore
dotnet ef database update
dotnet run
