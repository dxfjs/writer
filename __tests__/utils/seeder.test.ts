import { Seeder } from "@/utils";

describe("Seeder class", () => {
  const seeder = new Seeder();
  it("should return the next handle", () => {
    expect(seeder.next()).toBe("1");
    expect(seeder.next()).toBe("2");
    expect(seeder.next()).toBe("3");
  });

  it("should return the next handle without increment", () => {
    expect(seeder.peek()).toBe("4");
    expect(seeder.peek()).toBe("4");
    expect(seeder.peek()).toBe("4");
  });

  it("should return the correct hex value", () => {
    const seeder = new Seeder();
    for (let i = 0; i < 42; i++) seeder.next();
    expect(seeder.next()).toBe("2B");
    expect(seeder.next()).toBe("2C");
  });
});
