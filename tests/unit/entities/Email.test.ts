import { Email } from "../../../src/entities/Email";

describe("Email", () => {
  describe("toString", () => {
    it("should return the email address as a string", () => {
      const email = new Email("test@example.com");
      expect(email.toString()).toBe("test@example.com");
    });

    it("should throw an error for an invalid email address", () => {
      expect(() => new Email("invalid-email")).toThrow("Invalid email address");
    });
  });
});
