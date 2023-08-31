const UserService = require("../../service/userService");
const StandardError = require("../constant/standardError");

describe("UserService", () => {
  let userDaoMock;
  let userService;

  beforeEach(() => {
    userDaoMock = {
      findAllUsers: jest.fn(),
      getUserById: jest.fn(),
      updateUserRole: jest.fn(),
    };
    userService = new UserService(userDaoMock);
  });

  describe("getAllUser", () => {
    it("should return success message with user list if retrieval is successful", async () => {
      const mockUserList = [{ username: "user1" }, { username: "user2" }];

      userDaoMock.findAllUsers.mockResolvedValue(mockUserList);

      const result = await userService.getAllUser();

      expect(result.success).toBe(true);
      expect(result.message).toEqual(mockUserList);
    });

    it("should throw an error if no users are found", async () => {
      userDaoMock.findAllUsers.mockResolvedValue(null);

      await expect(userService.getAllUser()).rejects.toThrow(StandardError);
    });
    // Add more test cases for different scenarios
  });

  describe("getUserById", () => {
    it("should return success message with user data if retrieval is successful", async () => {
      const userId = "user-id";
      const mockUser = { _id: userId, username: "user1" };

      userDaoMock.getUserById.mockResolvedValue(mockUser);

      const result = await userService.getUserById({ id: userId });

      expect(result.success).toBe(true);
      expect(result.message).toEqual(mockUser);
    });

    it("should throw an error if the user is not found", async () => {
      userDaoMock.getUserById.mockResolvedValue(null);

      await expect(
        userService.getUserById({ id: "nonexistent-id" })
      ).rejects.toThrow(StandardError);
    });
    // Add more test cases for different scenarios
  });

  describe("updateUserRole", () => {
    it("should return success message after updating user role", async () => {
      const userId = "user-id";
      const mockTransferData = { _id: userId, role: "admin" };

      userDaoMock.updateUserRole.mockResolvedValue(mockTransferData);

      const result = await userService.updateUserRole({
        id: userId,
        role: "admin",
      });

      expect(result.success).toBe(true);
      expect(result.message).toEqual(mockTransferData);
    });

    it("should throw an error for invalid role status", async () => {
      userDaoMock.updateUserRole.mockResolvedValue(null);

      await expect(
        userService.updateUserRole({ id: "user-id", role: "invalid-role" })
      ).rejects.toThrow(StandardError);
    });
    // Add more test cases for different scenarios
  });
});
