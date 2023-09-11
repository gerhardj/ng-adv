- Examine theme in `mat-theme.scss`

```css
$primary: mat.define-palette(mat.$brown-palette, 400);
$accent: mat.define-palette(mat.$grey-palette, 400);
$warn: mat.define-palette(mat.$red-palette);
$theme: mat.define-light-theme($primary, $accent, $warn);
@include angular-material-theme($theme);
```
- Examine global vars in `mat-theme.scss`

```css
:root {
  --color-primary: #{mat-color($primary)};
  --color-accent: #{mat-color($accent)};
  --color-warn: #{mat-color($warn)};
  --color-fg: #{mat-color($fg)};
  --color-bg: #{mat-color($bg)};
```
- Examine `mat-card` overrides in `mat-overrides.scss`