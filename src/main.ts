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
  merge,
  BehaviorSubject,
} from 'rxjs';
import {
  map,
  throttleTime,
  delay,
  pluck,
  mapTo,
  reduce,
  toArray,
  buffer,
  bufferTime,
  scan,
} from 'rxjs/operators';
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
// const random$ = defer(() => of(Math.random()));
// random$.subscribe(observer);
// random$.subscribe(observer);
// random$.subscribe(observer);

// defer(() => {
//   return hadID ? updateResource() : createResource();
// });

const users = [
  {
    id: 1,
    firstName: 'Dang',
    lastName: 'Linh',
    username: 'dt_nlinh',
    age: 22,
  },
  {
    id: 2,
    firstName: 'Nguyen',
    lastName: 'Vu',
    username: 'pn_vu',
    age: 18,
  },
];

// map ->  input array -> output array, input element -> output element
of(users).pipe(
  map((data) => {
    return data;
  })
);

merge(of(users[0]).pipe(delay(1000)), of(users[1]).pipe(delay(2000))).pipe(
  map((user) => ({ ...user, fullName: `${user.firstName} ${user.lastName}` }))
);

// pluck get Data from [] or {} or ...
const params$ = of([1, 2, { foo: { bar: 'Linh' } }]);
// use obj is pluck('key'), {foo:{bar: 'vu'}} -> pluck('foo','bar')
const id$ = params$.pipe(pluck('2', 'foo', 'bar'));

// mapTo when event change -> get value in mapTo
merge(
  fromEvent(document, 'mouseenter').pipe(mapTo(true)),
  fromEvent(document, 'mouseleave').pipe(mapTo(false))
);

// reduce -> need complete to run reduce
// 40
const totalCount$ = merge(
  of(users[0]).pipe(delay(1000)),
  of(users[1]).pipe(delay(2000))
);
totalCount$.pipe(
  reduce((acc, cur) => {
    return acc + cur.age;
  }, 0)
);
//toArray -> need complete to run toArray
const people$ = merge(
  of(users[0]).pipe(delay(1000)),
  of(users[1]).pipe(delay(2000))
).pipe(toArray());

// buffer -> save data until emit data -> return array data
const source$ = interval(1000);
const click$ = fromEvent(document, 'click');

source$.pipe(buffer(click$));

// bufferTime -> instead use click to get Data -> use time to get data
source$.pipe(bufferTime(2000));

// scan -> accumulator single item -> return accumulator
// 22 -> 40
totalCount$.pipe(
  scan((acc, cur) => {
    return acc + cur.age;
  }, 0)
);

const initialState = {};
const stateSubject = new BehaviorSubject(initialState);

const state$ = stateSubject
  .asObservable()
  .pipe(scan((state, partialState) => ({ ...state, ...partialState }), {}));

state$.subscribe(observer);

stateSubject.next({ name: 'Linh' });
stateSubject.next({ age: 22 });
