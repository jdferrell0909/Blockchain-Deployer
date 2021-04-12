const request = require("supertest");

const server = "http://localhost:3001";

describe("Blockchain specific routes", () => {
  describe("/blockchain", () => {
    describe("GET", () => {
      it("responds with 200 status and correct content-type", () => {
        return request(server)
          .get("/blockchain")
          .expect(200)
          .expect("Content-Type", /application\/json/);
      });

      it("responds with an instance of a blockchain", () => {
        return request(server)
          .get("/blockchain")
          .then((res) => {
            expect(typeof res.body).toBe("object");
            expect(res.body).toHaveProperty("chain");
            expect(res.body).toHaveProperty("pendingTransactions");
          });
      });
    });
  });

  describe("/transaction", () => {
    describe("POST", () => {
      const body = {
        amount: 100,
        sender: "SENDERTEST",
        recipient: "RECIPIENTTEST",
      };

      it("responds with 201 status and have correct content-type", () => {
        return request(server)
          .post("/transaction")
          .expect(201)
          .expect("Content-Type", /application\/json/);
      });

      it("should respond with an object with a note property", () => {
        return request(server)
          .post("/transaction")
          .send(body)
          .then((res) => {
            expect(res.body).toHaveProperty("note");
          });
      });
    });
  });

  describe("/mine", () => {
    describe("GET", () => {
      it("responds with 200 status and correct content-type", () => {
        return request(server)
          .get("/mine")
          .expect(200)
          .expect("Content-Type", /application\/json/);
      });

      it("responds with an object", () => {
        return request(server)
          .get("/mine")
          .then((res) => {
            expect(typeof res.body).toBe("object");
            expect(res.body).toHaveProperty("note");
            expect(res.body).toHaveProperty("block");
            expect(typeof res.body.block).toBe("object");
            expect(res.body.block).toHaveProperty("index");
          });
      });
    });
  });
});
