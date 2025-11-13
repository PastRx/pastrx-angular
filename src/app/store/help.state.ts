import { State, Action, StateContext, Selector } from '@ngxs/store';

export interface HelpStateModel {
  helpTitle: string;
  contentPath: string;
}

export class SetHelpData {
  static readonly type = '[Help] Set Help Data';
  constructor(public helpTitle: string, public contentPath: string) {}
}

export class ClearHelpData {
  static readonly type = '[Help] Clear Help Data';
}

@State<HelpStateModel>({
  name: 'help',
  defaults: {
    helpTitle: '',
    contentPath: ''
  }
})
export class HelpState {
  @Selector()
  static getHelpTitle(state: HelpStateModel): string {
    return state.helpTitle;
  }

  @Selector()
  static getContentPath(state: HelpStateModel): string {
    return state.contentPath;
  }

  @Selector()
  static getHelpData(state: HelpStateModel): HelpStateModel {
    return state;
  }

  @Action(SetHelpData)
  setHelpData(ctx: StateContext<HelpStateModel>, action: SetHelpData) {
    ctx.patchState({
      helpTitle: action.helpTitle,
      contentPath: action.contentPath
    });
  }

  @Action(ClearHelpData)
  clearHelpData(ctx: StateContext<HelpStateModel>) {
    ctx.setState({
      helpTitle: '',
      contentPath: ''
    });
  }
}

