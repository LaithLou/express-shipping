"use strict";

const request = require("supertest");
const app = require("../app");

describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zipcode: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });
});

describe("POST /", function () {
  test("test if all fields invalid", async function () {
    const response = await request(app).post(`/shipments`).send({
      productId: "word",
      name: 1000,
      addr: 1000,
      zipcode: 123456789,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.error.message).toContain(
      "instance.name is not of a type(s) string"
    );
    expect(response.body.error.message).toContain(
      "instance.zipcode is not of a type(s) string"
    );
    expect(response.body.error.message).toContain(
      "instance.productId is not of a type(s) integer"
    );
    expect(response.body.error.message).toContain(
      "instance.addr is not of a type(s) string"
    );
  });
});
