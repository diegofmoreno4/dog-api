const request = require("supertest");
const app = require("../../src/app");

describe("Pruebas de las rutas de perros", () => {
  it("Debería obtener todos los perros", async () => {
    const response = await request(app).get("/dogs");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("Debería obtener un perro por su ID", async () => {
    const response = await request(app).get("/dogs/265");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});

