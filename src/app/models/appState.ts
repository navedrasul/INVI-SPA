export class AppState {

  removeMode = false;
  footerHidden = true;
  menuVisible = false;

  constructor(init?: Partial<AppState>) {
    Object.assign(this, init);
  }

}
