export class Email {
  constructor(private value: string) {
    if (!this.validateEmail(value)) {
      throw new Error("Invalid email address");
    }
  }

  private validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  toString() {
    return this.value;
  }
}
