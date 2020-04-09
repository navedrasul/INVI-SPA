export class AppState {

  removeMode = false;
  footerHidden = true;

  constructor(init?: Partial<AppState>) {
    Object.assign(this, init);
  }

}
