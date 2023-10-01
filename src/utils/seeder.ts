export class Seeder {
  private seed: number;

  constructor() {
    this.seed = 0;
  }

  next(): string {
    return (++this.seed).toString(16).toUpperCase();
  }

  peek(): string {
    return (this.seed + 1).toString(16).toUpperCase();
  }
}
