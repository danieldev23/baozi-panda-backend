export class Logger {
  static error(message: any) {
    console.error(`[ERROR]: ${message}`);
  }
  static success(message: string) {
    console.log(`[SUCCESS]: ${message}`);
  }
}
