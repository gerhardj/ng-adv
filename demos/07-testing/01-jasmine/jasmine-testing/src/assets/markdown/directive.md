Navigate to folder `\directive` and examine `capitalize.directive.spec.ts`

```typescript
@Directive({
  selector: '[appCapitalize]',
})
export class CapitalizeDirective {
  el = inject(ElementRef);
  renderer = inject(Renderer2);

  @HostListener('click') onClick() {
    this.el.nativeElement.style.textTransform === 'uppercase'
      ? (this.el.nativeElement.style.textTransform = 'lowercase')
      : (this.el.nativeElement.style.textTransform = 'uppercase');
  }
}
```