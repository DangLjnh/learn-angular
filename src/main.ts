import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import {
  fromEvent,
  Observable,
  of,
  from,
  fromEventPattern,
  interval,
  timer,
  throwError,
  defer,
} from 'rxjs';
import { throttleTime } from 'rxjs/operators';
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

// normal debounce
// const rate = 1000;
// let lastMove = Date.now() - rate; //10000
// document.addEventListener('mousemove', (ev) => {
//   if (Date.now() - lastMove >= rate) {
//     //10000 - 9000
//     lastMove = Date.now();
//     console.log('🚀 ~ file: main.ts:18 ~ document.addEventListener ~ ev:', ev);
//   }
// });

//fromEvent, throttleTime ~ debounce
// fromEvent(document, 'mousemove')
//   .pipe(throttleTime(1000))
//   .subscribe(console.log);

//observable use to get data from next
// const observable = new Observable(function subscribe(observer) {
//   const id = setInterval(() => {
//     observer.next('hello');
//   }, 1000);
//   return function unsubscribe() {
//     // observer.complete();
//     clearInterval(id);
//   };
// });

//subscription (next, err, complete) -> observer
// const subscription = observable.subscribe(
//   (val) => console.log(val), //next
//   (err) => console.log(err),
//   () => console.log('complete')
// );

// subscription.add(observable.subscribe(console.log));

// setTimeout(() => {
//   subscription.unsubscribe();
// }, 5000);

const observer = {
  next: (val: any) => console.log(val),
  error: (err: any) => console.log(err),
  complete: () => console.log('complete'),
};

// all it need to .subscribe(observer) to work next
//emit all values in of (), promise -> promise
// [1,2,3] -> [1,2,3] || "hello" -> "hello"
of('hello');

// [1,2,3] -> 1,2,3 || "hello" -> "h", "e", "l",...
//from promise -> value in promise
from(Promise.resolve('Hello'));

// const btn = document.querySelector("button") -> maybe use btn to document
fromEvent(document, 'click').pipe(throttleTime(1000));

//fromEventPattern
fromEventPattern(
  (handler) => {
    // add
    document.addEventListener('click', handler);
  },
  (handler) => {
    // remove
    document.removeEventListener('click', handler);
  }
  // (ev)=>ev.offsetX + ' ' +ev.offsetY - it like middleware handle something before return
);

// ~ setInterval
interval(1000);

// ~ setTimeout: after use timer auto clear timeout
timer(1000);

// after 2 second timer transform interval
timer(2000, 1000);

// throw error ~ run error in observer ~ use in function catchError and return throwError()
throwError('error');

//example of random
// is run only one time and subscribe many times variable not change
// const random$ = of(Math.random());
// random$.subscribe(observer);
// random$.subscribe(observer);
// random$.subscribe(observer);
// defer: every subscribe create new observer ~ use in while call api when want to retry and get new value
// need subscribe to run a function
const random$ = defer(() => of(Math.random()));
random$.subscribe(observer);
random$.subscribe(observer);
random$.subscribe(observer);

// defer(() => {
//   return hadID ? updateResource() : createResource();
// });
