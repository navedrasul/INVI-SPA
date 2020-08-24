export class InviJS {
  private constructor() { }

  static sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  static nullifyFalsey(val: any): any {
    val = (!val) ? null : val;
    return val;
  }

}

