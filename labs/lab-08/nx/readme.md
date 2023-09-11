# Monorepos & nrwl nx

Install the [Nx Console - VS Code Extension](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console). It provides a nice UI for the nx commands.

To spare yourself from executing `nx-cli` using `npx` you could also install nx-cli - optional:

```
npm i -g create-nx-workspace
npm i -g nx
```

Create a workspace tutorial-app-ws using the Angular preset:

```typescript
npx create-nx-workspace tutorial-ws --preset=angular-monorepo --standaloneApi false --nxCloud false --appName tutorialApp --routing true --style scss
```

![nx-scaffold](_images/nx-scaffold.jpg)


Build & run the app `tutorial-app`:

```
nx build --project tutorial-app
nx build tutorial-app
nx serve --project tutorial-app -o
nx serve tutorial-app -o
```

> Note: Keep the tutorial-app running in the background, just like you would do when using Angular CLI.

Test the app using Jest (default)

```
nx test tutorial-app
```

Run the app:

```
nx s -o tutorial-app
```

## Controls library

Add a library project from the root of the nx workspace:

```typescript
nx g @nrwl/angular:lib ux-controls 
```

> Note: you can replace `arambazamba` with your own npm or github scope

Show a project graph in from separate terminal and keep it open:

```typescript
npx nx graph --watch
```

### Split component

Add a split component. Notice that Nx registers the component in the module 

```typescript
nx g @nrwl/angular:component uxSplit --project ux-controls --export --selector ux-split
```

> Note: You might have to fix the import path in `ux-controls.module.ts`

Use the component in the main app. In app.module.ts import the `UxControlsModule`:

```typescript
@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    UxControlsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

In app.component.html delete the default content and use the component:

```html
<ux-split></ux-split>
```

Add Angular Material to the workspace to use it in the `ux-controls` project:

```
npm i -S @angular/material @angular/cdk
```

Add Material to tutorial-app. Select a theme of your choice, enable typography and disable animations:

```
nx g @angular/material:ng-add --project=tutorial-app
```

![nx-material](_images/material.jpg)

Import `MatToolbarModule` in `ux-controls.module.ts`:

```typescript
...
import { UxSplitComponent } from './ux-split/ux-split.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [CommonModule, MatToolbarModule],
  declarations: [UxSplitComponent],
  exports: [UxSplitComponent],
})
export class UxControlsModule {}
```

Update `ux-split.component.scss`.:

```css
.maingrid {
  display: grid;
  grid-template-rows: 60px auto;
  grid-template-columns: auto 180px;
  grid-template-areas: "title title" "main sidebar";
  height: 100vh;
  width: 100%;
}

.title{
  grid-area: title;
  background-color: lavender;
}

.main{
  padding: 1rem;
  grid-area: main;
  background-color: yellow;
}

.sidebar{
  padding: 1rem;
  grid-area: sidebar;
  background-color: lightblue;
}
```

Update `ux-split.component.html`:

```html
<div class="maingrid">
  <div class="title">
    <mat-toolbar mat-dialog-title>
      <mat-toolbar-row>
        <ng-content select=".title"></ng-content>
      </mat-toolbar-row>
    </mat-toolbar>
  </div>
  <div class="main">
    <ng-content select=".main"></ng-content>
  </div>
  <div class="sidebar">
    <ng-content select=".sidebar"></ng-content>
  </div>
</div>
```

> Note: After you have checked the layout out can delete the background colors.

Implement an reusable Button:

```
nx g @nrwl/angular:component uxButton --project ux-controls --export 
```

> Note: You might have to fix the import path in `ux-controls.module.ts`

Update imports in ux-controls.module.ts:

```typescript
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
...
imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
```

ux-button.ts & ux-button.html

```typescript
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ux-button',
  templateUrl: './ux-button.component.html',
  styleUrls: ['./ux-button.component.scss'],
})
export class UxButtonComponent {
  @Input() disabled = false;
  @Input() label = '';
  @Input() icon = '';
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    this.icon = '';
  }

  buttonClicked() {
    this.onClick.emit();
  }
}
```

```html
<button
  mat-raised-button
  (click)="buttonClicked()"
  [disabled]="disabled"
  color="primary"
>
  <mat-icon color="accent" fontIcon="bug_report"></mat-icon>
  <span>{{ label }}</span>
</button>
```

Use the Button in the `tutorial-app-project`. 

Add it to `app.component.html`:

```html
<div>
  <h3>{{title}}</h3>
  <ux-button
    [icon]="'bug_report'"
    [label]="'Report Bug'"
    (onClick)="doClick()"
  ></ux-button>
</div>
```

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'angular-repo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tutorial-app';

  doClick() {
    console.log('you clicked');
  }
}
```

Your project should look like this:

![with-button](_images/with-button.jpg)



## Second app and dependency graph

Add a second app used for dependency graph later on:

```
nx generate @nrwl/angular:app ng-otherapp --routing --style=scss --standaloneApi false
```

Repeat the steps in the second project in order to see a Dependency Graph where the button is used in two projects

```
nx dep-graph
```

You should see something similar:

![dep-graph](_images/dep-graph.png)
