import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { fromEvent, Observable } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

// const rate = 1000;
// let lastMove = Date.now() - rate; //10000
// document.addEventListener('mousemove', (ev) => {
//   if (Date.now() - lastMove >= rate) {
//     //10000 - 9000
//     lastMove = Date.now();
//     console.log('🚀 ~ file: main.ts:18 ~ document.addEventListener ~ ev:', ev);
//   }
// });

//fromEvent
// fromEvent(document, 'mousemove')
//   .pipe(throttleTime(1000))
//   .subscribe(console.log);

//observable use to get data from next
const observable = new Observable(function subscribe(observer) {
  const id = setInterval(() => {
    observer.next('hello');
  }, 1000);
  return function unsubscribe() {
    // observer.complete();
    clearInterval(id);
  };
});

//subscription (next, err, complete) -> observer
const subscription = observable.subscribe(
  (val) => console.log(val), //next
  (err) => console.log(err),
  () => console.log('complete')
);

subscription.add(observable.subscribe(console.log));

setTimeout(() => {
  subscription.unsubscribe();
}, 5000);
