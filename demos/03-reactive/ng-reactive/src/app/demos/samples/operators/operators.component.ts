import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Observable, from, interval, of } from 'rxjs';
import {
  delay,
  filter,
  find,
  map,
  mergeMap,
  pluck,
  reduce,
  take,
  tap
} from 'rxjs/operators';
import { Voucher } from '../../vouchers/voucher.model';
import { VouchersService } from '../../vouchers/voucher.service';
import { Person } from './person';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss'],
})
export class OperatorsComponent implements OnInit {
  @ViewChild('btnSwitchMap', { static: true }) btnSwitchMap: ElementRef | undefined;
  vs = inject(VouchersService);
  response: any;

  // Declarative Pattern
  vouchers$ = this.vs.getVouchers();

  // Imperative Pattern
  vouchers: Voucher[] = [];

  ngOnInit() {
    //Classic Subscribe (Imperative) Pattern -> Unsbscribe
    this.vs.getVouchers().subscribe((vs) => {
      this.vouchers = vs;
    });
  }
  setLabel = (v: Voucher) => ({ ...v, Label: `${v.Text} costs € ${v.Amount}` });

  log = (msg: string, data: any) =>
    console.log(
      `executing: ${msg}, 'data' is Array: ${Array.isArray(data)}`,
      data
    );

  useMap() {
    const source = from([1, 2, 3, 4, 5]);
    source
      .pipe(map((el) => el + 10))
      .subscribe((val) => console.log('value:', val));

    this.vouchers$
      .pipe(
        map((vouchers) => {
          return vouchers.map((v) => ({
            ...v,
            Label: `${v.Text} costs € ${v.Amount}`,
          }));
        })
      )
      .subscribe((data) => this.log('use map()', data));
  }

  useTap() {
    const arr = [1, 4, 6, 7, 9, 11];
    console.log('array:', arr);

    from(arr)
      .pipe(
        tap((el) => {
          (el = el * 2), console.log('tapping:', el);
        })
      )
      .subscribe((val) => console.log('logging', val));
  }

  // JavaScript Array.find - not an observable operator
  useFindArr() {
    this.vouchers$
      .pipe(
        map((vs) => vs.find((v: Voucher) => v.ID === 3))
      )
      .subscribe((data) => this.log('getByID - using find()', data));
  }

  // RxJs find Operator
  useFind() {
    this.vouchers$
      .pipe(
        mergeMap((vouchers: Voucher[]) => vouchers),
        find((v) => v.ID === 3)
      )
      .subscribe((data) => this.log('getByID - using find()', data));
  }

  // JavaScript Array.filter - not an observable operator
  useFilterArr() {
    this.vouchers$
      .pipe(
        map((vs) => vs.filter((v: Voucher) => v.Paid))
      )
      .subscribe((data) => this.log('useFilter', data));
  }

  useFilter() {
    this.vouchers$
      .pipe(
        mergeMap((vouchers: Voucher[]) => vouchers),
        filter((v) => v.Paid)
      )
      .subscribe((data) => this.log('getByID - using find()', data));
  }

  // Compare the two outputs
  useTake() {
    this.vouchers$.pipe(take(3)).subscribe((data) => this.log('useTake', data));
  }

  useInterval() {
    interval(1000)
      .pipe(take(3))
      .subscribe((x) => console.log(x));
  }

  useDelay() {
    const delayedObservable = of(['hund', 'katze', 'maus']).pipe(delay(5000));
    console.log('before delay execution - waiting 5 secs');
    delayedObservable.subscribe((data) => console.log(data));
  }

  useReduce() {
    const arr = [1, 4, 6, 7, 9, 11];

    from(arr)
      .pipe(reduce((acc, curr) => acc + curr, 0))
      .subscribe((d) => console.log(d));

    this.vouchers$.pipe(
      mergeMap((vouchers: Voucher[]) => vouchers),
      reduce((acc, curr) => { acc = acc + curr.Amount; return acc }, 0)
    ).subscribe(sum => console.log("sum", sum));
  }

  usePluck() {
    const person: Observable<Person> = of({
      person: 'hugo',
      children: [{ name: 'jimmy' }, { name: 'giro' }, { name: 'soi' }],
    });

    //pluck  deprecated
    person.pipe(pluck('children')).subscribe(ch => console.log("children - pluck", ch));
    //use map
    person.pipe(map((h: Person) => h.children)).subscribe(ch => console.log("children - map", ch));
  }
}
