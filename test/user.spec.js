const request = require("supertest");
const app = require("../index");


let token;

describe("User Routes", () => {
  const mockUser = {
    username: "admin",
    password: "admin",
  };

  it("signup a new user", async () => {
    const response = await request(app)
      .post("/signup")
      .send(mockUser)
      .expect(201);
      expect(response.body.msg).toEqual("user created successfully!");
  });

  it("should login with the registered user", async () => {
    const response = await request(app)
      .post("/login")
      .send(mockUser)
      .expect(200);
      token = response.body.token;
    expect(response.body.msg).toEqual("loggedIn!"); 
  });

  it("fetch all users", async () => {
    console.log(token)
    const response = await request(app)
      .get("/allusers")
      .set("Authorization", `${token}`)
      .expect(200);
      expect(response.body.some(user => user.username === 'admin')).toBe(true);
  });
});
