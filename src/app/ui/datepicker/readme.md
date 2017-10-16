### Date picker properties
  - `ngModel` (`:Date`) - binds to date
  - `datepickerMode` (`?string='day'`) - sets datepicker mode, supports: `day`, `month`, `year`
  - `minDate` (`?Date=null`) - oldest selectable date
  - `maxDate` (`?Date=null`) - latest selectable date
  - `dateDisabled` (`?Array<{date:Date, mode:string}>`) - array of disabled dates if `mode` is `day`, or years, etc.
  - `customClass` (`?Array<{date:Date, mode:string, clazz:string}>`) - array of custom css classes to be applied to targeted dates
  - `showWeeks` (`?boolean=true`) - if `false` week numbers will be hidden
  - `startingDay` (`?number=0`) - starting day of the week from 0-6 (0=Sunday, ..., 6=Saturday).
  - `initDate` (`?Date`) - default date to show if `ng-model` value is not specified
  - `minMode` (`?string='day'`) - set lower datepicker mode, supports: `day`, `month`, `year`
  - `maxMode` (`?string='year'`) - sets upper datepicker mode, supports: `day`, `month`, `year`
  - `formatDay` (`?string='dd'`) - format of day in month
  - `formatMonth` (`?string='MMMM'`) - format of month in year
  - `formatMear` (`?string='yyyy'`) - format of year in year range
  - `formatDayHeader` (`?string='EEE'`) - format of day in week header
  - `formatDayTitle` (`?string='MMMM yyyy'`) - format of title when selecting day
  - `formatMonthTitle` (`?string='yyyy'`) - format of title when selecting month
  - `yearRange` (`?number=20`) - number of years displayed in year selection
  - `shortcutPropagation` (`?boolean=false`) - if `true` shortcut`s event propagation will be disabled
  - `onlyCurrentMonth` (`?boolean=false`) - if `true` only dates from the currently displayed month will be shown


