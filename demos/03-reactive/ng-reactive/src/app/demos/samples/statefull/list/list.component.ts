import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DemoItem } from '../../../demo-base/demo-item.model';
import { StatefulDemoService } from '../stateful-demo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  ds = inject(StatefulDemoService);

  // Data Stream
  demosData$: Observable<DemoItem[]> = this.ds.getDemos();
  // Action Stream
  filter = new FormControl<string>('');

  // Stream to bind the view to
  vm$ = combineLatest([
    this.demosData$,
    this.filter.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([demos, filter]) => {
      return filter && filter !== ''
        ? demos.filter((d) =>
          d.title.toLowerCase().includes(filter.toLowerCase())
        )
        : demos;
    })
  );

  drop(event: CdkDragDrop<DemoItem[]>) {
    this.vm$.subscribe((arr) => {
      moveItemInArray(arr, event.previousIndex, event.currentIndex);
      this.changeSortOrder(arr);
    });
  }

  changeSortOrder(arr: DemoItem[]) {
    let idx = 0;
    arr.forEach((item) => {
      item.sortOrder = idx;
      idx++;
    });
  }

  deleteItem(item: DemoItem) {
    // spinner show
    this.ds.deleteDemo(item).subscribe(() => {
      // spinner hide
    });
  }

  changeVisibility(item: DemoItem) {
    console.log('change visibility', item);
  }
}
