const RoomService = require('../../service/roomService');
const StandardError = require('../constant/standardError');

describe('RoomService', () => {
  let roomDaoMock;
  let roomService;

  beforeEach(() => {
    roomDaoMock = {
      createRoom: jest.fn(),
      findAllListRoom: jest.fn(),
      userJoin: jest.fn(),
      getUserJoinbyRoomName: jest.fn(),
      deleteRoom: jest.fn()
    };
    roomService = new RoomService(roomDaoMock);
  });

  describe('createRoom', () => {
    it('should return success message with insertedId if room creation is successful', async () => {
      const username = 'testuser';
      const roomName = 'Test Room';
      const mockInsertedId = 'inserted-id';

      roomDaoMock.createRoom.mockResolvedValue({ insertedId: mockInsertedId });

      const result = await roomService.createRoom({ username, roomName });

      expect(result.success).toBe(true);
      expect(result.message).toBe(mockInsertedId);
    });

    it('should throw an error for invalid input data', async () => {
      roomDaoMock.createRoom.mockResolvedValue(null);

      await expect(roomService.createRoom({ username: 'test', roomName: '' })).rejects.toThrow(StandardError);
    });

  });

  describe('getAllListRoom', () => {
    it('should return success message with room list if retrieval is successful', async () => {
      const mockRoomList = [{ roomName: 'Room 1' }, { roomName: 'Room 2' }];

      roomDaoMock.findAllListRoom.mockResolvedValue(mockRoomList);

      const result = await roomService.getAllListRoom();

      expect(result.success).toBe(true);
      expect(result.message).toEqual(mockRoomList);
    });

    it('should throw an error if no rooms are found', async () => {
      roomDaoMock.findAllListRoom.mockResolvedValue(null);

      await expect(roomService.getAllListRoom()).rejects.toThrow(StandardError);
    });
  });

  describe('userJoin', () => {
    it('should return success message with insertedId if user joins room successfully', async () => {
      const username = 'testuser';
      const roomName = 'Test Room';
      const mockInsertedId = 'inserted-id';

      roomDaoMock.userJoin.mockResolvedValue({ insertedId: mockInsertedId });

      const result = await roomService.userJoin({ username, roomName });

      expect(result.success).toBe(true);
      expect(result.message).toBe(mockInsertedId);
    });

    it('should throw an error for invalid input data', async () => {
      roomDaoMock.userJoin.mockResolvedValue(null);

      await expect(roomService.userJoin({ username: 'test', roomName: '' })).rejects.toThrow(StandardError);
    });

  });

  describe('getUserJoinbyRoomName', () => {
    it('should return success message with user list if retrieval is successful', async () => {
      const mockUserList = [{ username: 'user1' }, { username: 'user2' }];

      roomDaoMock.getUserJoinbyRoomName.mockResolvedValue(mockUserList);

      const result = await roomService.getUserJoinbyRoomName({ roomName: 'Test Room' });

      expect(result.success).toBe(true);
      expect(result.message).toEqual(mockUserList);
    });

    it('should throw an error if no users are found for the room', async () => {
      roomDaoMock.getUserJoinbyRoomName.mockResolvedValue(null);

      await expect(roomService.getUserJoinbyRoomName({ roomName: 'Nonexistent Room' })).rejects.toThrow(StandardError);
    });

  });

  describe('deleteRoom', () => {
    it('should return success message with room data if room deletion is successful', async () => {
      const roomId = 'room-id';
      const mockRoomData = { roomId, roomName: 'Test Room' };

      roomDaoMock.deleteRoom.mockResolvedValue(mockRoomData);

      const result = await roomService.deleteRoom({ id: roomId });

      expect(result.success).toBe(true);
      expect(result.message).toEqual(mockRoomData);
    });

    it('should throw an error if the room is not found', async () => {
      roomDaoMock.deleteRoom.mockResolvedValue(null);

      await expect(roomService.deleteRoom({ id: 'nonexistent-id' })).rejects.toThrow(StandardError);
    });
   
  });
});
