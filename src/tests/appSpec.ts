import supertest from "supertest";
import app from "../app";
import { resizeImage } from "../routes/api/resize";
import path from "path";

const request = supertest(app);

describe("Test resize API and function resize", () => {
  describe("Test resize API", () => {
    it("Should return 200 when all parameters is valid data", async () => {
      const response = await request.get(
        "/api/resize?img=fjord&width=100&height=100"
      );
      expect(response.status).toBe(200);
    });

    it("should return error message if the image name or path is invalid", async () => {
      const response = await request.get("/api/resize?img=ndgjnasls");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: `Can't find your image: Error: Error: Input file is missing: ${path.join(
          process.cwd(),
          "assets",
          "full",
          `ndgjnasls.jpg`
        )}`,
      });
    });

    it("should return error message if the new size is bigger than 5000", async () => {
      const response = await request.get(
        "/api/resize?img=E:/Graphic/cat.jpg&width=5010&height=5001"
      );
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "The new size is too big" });
    });
  });
  describe("Test resize function", () => {
    it("Should return 200 when all parameters is valid data", async () => {
      expect(async () => {
        await resizeImage(
          path.join(process.cwd(), "assets", "full", `fjord.jpg`),
          path.join(process.cwd(), "assets", "thumb", `fjord.jpg`),
          150,
          150
        );
      }).not.toThrow();
    });
  });
});
