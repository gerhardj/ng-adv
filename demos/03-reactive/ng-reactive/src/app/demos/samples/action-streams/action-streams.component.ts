import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DemoService } from '../../demo-base/demo.service';

@Component({
  selector: 'app-action-streams',
  templateUrl: './action-streams.component.html',
  styleUrls: ['./action-streams.component.scss']
})
export class ActionStreamsComponent {
  ds = inject(DemoService);
  demos$ = this.ds.getItems();
  filter$ = new FormControl<string>('', { nonNullable: true });

  vm$ = combineLatest([
    this.demos$,
    this.filter$.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([demos, filter]) => {
      return filter != ''
        ? demos.filter((d) =>
          d.title.toLowerCase().includes(filter.toLowerCase())
        )
        : demos;
    })
  );
}
