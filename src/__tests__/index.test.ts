import * as index from '../index';

describe('Index', () => {
  it('contains all expected elements', () => {
    expect(Object.keys(index)).toEqual([
      'ActionLink',
      'BackLink',
      'Breadcrumb',
      'Button',
      'DefaultButton',
      'ButtonLink',
      'CareCard',
      'ContentsList',
      'Details',
      'DoDontList',
      'ErrorMessage',
      'ErrorSummary',
      'Fieldset',
      'Footer',
      'Header',
      'Hero',
      'Hint',
      'Icons',
      'Images',
      'InsetText',
      'Label',
      'Container',
      'Col',
      'Row',
      'ListPanel',
      'NavAZ',
      'Pagination',
      'Panel',
      'Promo',
      'ReviewDate',
      'SkipLink',
      'SummaryList',
      'Table',
      'LedeText',
      'BodyText',
      'WarningCallout',
    ]);
  });
});
