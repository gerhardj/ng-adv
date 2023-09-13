import { Component } from '@angular/core';
import axios from 'axios';
import { Observable, from, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-simple-observable',
  templateUrl: './creating-observable.component.html',
  styleUrls: ['./creating-observable.component.scss'],
})
export class CreatingObservableComponent {
  onErr = (err: any) => console.log(err);
  onComplete = () => console.log('complete');

  useOf() {
    of(2, 5, 9, 12, 22).subscribe(
      data => console.log('current marble: ', data)
    );
  }

  useObsFrom() {
    let arr = [2, 5, 9, 12, 22];

    //use this pattern when subscribing and handling complete and error case
    let observer = {} as any;
    observer.next = (data: number) => console.log('output: ', data);
    observer.error = this.onErr;
    observer.complete = this.onComplete;

    from(arr).subscribe(observer); // -> 5 marbles
    of(arr).subscribe(observer); // -> 1 marble
  }

  useNewObs() {
    let skills = [
      {
        id: 1,
        name: 'Custom Theme',
        completed: true,
      },
      {
        id: 2,
        name: 'Theme Mixins',
        completed: false,
      },
    ];

    //Manually create skills obs where each skill is emitted one after the other with 500ms delay
    let skills$ = new Observable((observer) => {
      setTimeout(() => {
        observer.next(skills);
        observer.complete();
      }, 500);
    });

    skills$.subscribe((data) => console.log('skill item: ', data));

    //Simple cast and pipe / delay operator
    const skillsPro$ = of(skills).pipe(delay(500));

  }

  // Wraps an function that uses callbacks (navigator.geolocation.getCurrentPosition) into an observable
  // navigator.geolocation.getCurrentPosition(success[, error[, [options]])
  getGeolocation$(): Observable<any> {
    return new Observable((observer) => {
      //original function
      navigator.geolocation.getCurrentPosition(
        (pos: any) => {
          //emite an element in the callback of the callback based function
          observer.next(pos);
          observer.complete();
        },
        (err: any) => {
          observer.error(err);
        }
      );
    });
  }

  // Use the wrapped Callback as observable stream
  wrappingCallbacks() {
    this.getGeolocation$().subscribe((loc) => {
      console.log('current Geolocation:', loc);
    });
  }

  // Use the mock Promise
  usePromiseToObs() {
    const url = 'http://localhost:3000/skills';

    //classic promise pattern
    axios.get(url).then((data) => console.log('received data', data));

    // from casts a promise to an observable so that it can be subscribe
    from(axios(url)).subscribe(
      (data) => console.log('data from axios', data)
    );
  }
}
