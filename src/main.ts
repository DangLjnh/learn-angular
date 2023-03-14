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
  asyncScheduler,
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
  filter,
  first,
  last,
  find,
  single,
  take,
  takeLast,
  takeUntil,
  takeWhile,
  skip,
  skipUntil,
  skipWhile,
  distinct,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  auditTime,
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

stateSubject.next({ name: 'Linh' });
stateSubject.next({ age: 22 });

// filter ~ like filter in array but filter and emit every item -> 1, 2
const items = [1, 2, 3, 4, 5];
from(items).pipe(filter((item) => item % 2 === 0));

// first() - get first value
// first((x) => x > 4) -> get first item greater than 4
from(items).pipe(first());

// last() - get last value
from(items).pipe(last());

// find element find first
from(items).pipe(find((x) => x % 2 !== 0));

// single -> like find but result have 1 value if greater than -> error
from(items).pipe(single((x) => x > 4));

// take (first) - take(2) -> get 2 value -> complete
interval(1000).pipe(take(2));

// takeLast -> get value last but observer must be complete -> 3, 4
interval(1000).pipe(take(5), takeLast(2));

// takeUntil -> 0, 1, 2, 3
interval(1000).pipe(takeUntil(timer(5000)));

// takeWhile -> true (emit) -> false (complete) -> get single value to compare
interval(1000).pipe(takeWhile((x) => x < 10));

// skip - skip(2) -> skip 2 value first
interval(1000).pipe(skip(2));

// skipUntil 4, 5, 6, ...
interval(1000).pipe(skipUntil(timer(5000)));

// skipWhile -> 4, 5, 6, ...
interval(1000).pipe(skipWhile((x) => x < 5));

// distinct -> if value already exists not emit again -> 1, 2, 3, 4, 5, 6
from([1, 2, 1, 3, 4, 5, 6, 5, 4, 3, 2]).pipe(distinct());

// get 1
// distinctUntilChanged - 1 compare 1  -> skip
// 1 compare 2 (other) -> get 2
// 2 compare 2  -> skip
// 2 compare 1 (other) -> get 1
// -> 1, 2, 1, 2, 5, 6
from([1, 1, 2, 2, 1, 2, 2, 5, 6]).pipe(distinctUntilChanged());

//distinctUntilKeyChanged ~ like distinctUntilChanged but get by key
of(
  { age: 4, name: 'Foo' },
  { age: 4, name: 'Foo' },
  { age: 7, name: 'Bar' },
  { age: 4, name: 'Foo' }
).pipe(distinctUntilKeyChanged('age'));

// audit time -> interval, timer (when timer run, all value -> skip)
// until timer done -> audit time get last value
fromEvent(document, 'click').pipe(auditTime(1500));

interval(1000).pipe(auditTime(1500));
// 1s: 0-> timer(1500) runs
// 2s: 1 -> timer(500) rest
// 2.5s: 1 -> timer disable -> get 1
// 3s: 2 timer 1500
// 4s: 3 timer 500
// 4.5 3 timer disable -> get 3

// asyncScheduler is default
// throttleTime { trailing: false, leading: true } -> get first data -> timer run
// throttleTime { trailing: true, leading: false } -> timer run -> runtime -> get latest data
fromEvent(document, 'mousemove').pipe(
  throttleTime(1500, asyncScheduler, { trailing: false, leading: true })
);

// fix bug use fromEvent
