// authService.test.js

const AuthService = require("../../service/authService");
const StandardError = require("../constant/standardError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Mocking the authDao for testing
const authDaoMock = {
  loginUser: jest.fn(),
  registerUser: jest.fn(),
};

const authService = new AuthService(authDaoMock);

describe("AuthService", () => {
  describe("loginUser", () => {
    it("[POSITIVE] should return success message with token if login is successful", async () => {
      const username = "testuser";
      const password = "testpassword";
      const mockUser = {
        _id: "user-id",
        username: "testuser",
        password: await bcrypt.hash(password, 10),
        role: "user",
      };

      authDaoMock.loginUser.mockResolvedValue(mockUser);

      const result = await authService.loginUser({ username, password });

      expect(result.success).toBe(true);
      expect(result.message).toHaveProperty("token");
      expect(result.message).toHaveProperty("id", "user-id");
    });

    it("[NEGATIVE] should throw an error if login fails", async () => {
      authDaoMock.loginUser.mockResolvedValue(null);

      await expect(
        authService.loginUser({ username: "test", password: "test" })
      ).rejects.toThrow(StandardError);
    });
    // Add more test cases for different scenarios
  });

    describe("registerUser", () => {
      it("[POSITIVE] should return success message with user ID if registration is successful", async () => {
        const username = "testuser";
        const password = "testpassword123";
        const gender = "male";
        const mockInsertedId = "inserted-id";

        authDaoMock.registerUser.mockResolvedValue({ insertedId: mockInsertedId });

        const result = await authService.registerUser({ username, password, gender });

        expect(result.success).toBe(true);
        expect(result.message).toBe(mockInsertedId);
      });

      it("[NEGATIVE] should throw an error for invalid input data", async () => {
        authDaoMock.registerUser.mockResolvedValue(null);

        await expect(authService.registerUser({ username: "", password: "test", gender: "other" })).rejects.toThrow(StandardError);
      });
    });
});
