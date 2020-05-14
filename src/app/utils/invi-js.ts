export class InviJS {
  private constructor() { }

  static sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

}

