import { checkThemeInName, symbolNameValidation } from '../src/rules/symbol-name-validation';
import { WrongSymbolNamingError, DuplicatedSymbolError } from '../src/error/validation-error';

describe('Symbol Name Validation', () => {

  it('should check for themeless', () => {
    const name = 'menubar\/action'.split('/');
    expect(checkThemeInName(name)).toBeTruthy();
  });
  it('should check if theme name is used', () => {
    const name = 'componenent-name\/action'.split('/');
    expect(checkThemeInName(name)).toBeFalsy();
  });
  it('should check if correct theme name like dark-bg or light-bg is used', () => {
    const nameWrongTheme = 'componenent-name\/dark-theme\/action'.split('/');
    expect(checkThemeInName(nameWrongTheme)).toBeFalsy();
    const nameLight = 'componenent-name\/light-bg\/action'.split('/');
    expect(checkThemeInName(nameLight)).toBeTruthy();
    const nameDark = 'componenent-name\/dark-bg\/action'.split('/');
    expect(checkThemeInName(nameDark)).toBeTruthy();
  });

  it('should contain at least two parts', () => {
    const fakeHomeworks = [{
      _class: 'symbolMaster',
      do_objectID: 'C8BAFBE8-F0F0-4727-B952-7303F9CA3F33',
      name: 'componenent-name',
    }] as any[];

    const result = symbolNameValidation(fakeHomeworks, 0);
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
    result.forEach(r => expect(r).toBeInstanceOf(WrongSymbolNamingError));
  });

  it('should pass for »component-name\/light-bg\/state«', () => {
    const fakeHomeworks = [{
      _class: 'symbolMaster',
      do_objectID: 'C8BAFBE8-F0F0-4727-B952-7303F9CA3F33',
      name: 'component-name\/light-bg\/state',
    }] as any[];

    const result = symbolNameValidation(fakeHomeworks, 0);
    expect(result).toBeTruthy();
  });

  it('should check for duplicate components', () => {
    const fakeHomeworks = [
      {
        _class: 'symbolMaster',
        do_objectID: 'C8BAFBE8-F0F0-4727-B952-7303F9CA3F33',
        name: 'component-name\/light-bg\/state',
      },
      {
        _class: 'symbolMaster',
        do_objectID: 'C8BAFBE8-F0F0-4727-B952-7303F9CA3F33',
        name: 'component-name\/light-bg\/state',
      },
    ] as any[];

    const result = symbolNameValidation(fakeHomeworks, 0);
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(DuplicatedSymbolError);
  });
});
