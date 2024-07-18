import protectRoute from "../middleware/protectRoute";
import User from "../models/user.model";

describe("protectRoute middleware", () => {
  it("should set req.user with the user object if user is found", async () => {
    const user = new User({
      // create a user object with required properties
      // you can customize the properties based on your user model
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });
    await user.save(); // save the user to the database

    const req = {
      cookies: {
        jwt: "valid_token",
      },
    };
    const res = {};
    const next = jest.fn(); // create a mock function for next middleware

    await protectRoute(req, res, next);

    expect(req.user).toEqual(expect.objectContaining(user.toObject()));
    expect(next).toHaveBeenCalled();
  });

  it("should return a 404 error if user is not found", async () => {
    const req = {
      cookies: {
        jwt: "valid_token",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await protectRoute(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    expect(next).not.toHaveBeenCalled();
  });

  // Add more test cases to cover different scenarios
});
