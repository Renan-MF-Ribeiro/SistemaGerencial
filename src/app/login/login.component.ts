import { animate, state, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Auth } from './services/auth';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('1s ease-in'))
    ])
  ]
})
export class LoginComponent implements OnInit, OnDestroy {


  imgs = [
    { estado: 'visivel', url: 'assets/login/1.png' },
    { estado: 'escondido', url: 'assets/login/2.png' },
    { estado: 'escondido', url: 'assets/login/3.png' },
    { estado: 'escondido', url: 'assets/login/4.png' },
  ]
  i = 0
  estado: string = 'escondido'
  cols: number = 2

  login = new FormGroup({
    user: new FormControl(),
    pass: new FormControl()

  })

  destroyed = new Subject<void>();
  currentScreenSize!: string;

  // Create a map to display breakpoint names for demonstration purposes.
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(private authService: Auth, private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).pipe(takeUntil(this.destroyed)).subscribe((result: any) => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';

          this.ColsChange()
        }
      }
    });

  }

  ColsChange() {

    if (this.currentScreenSize.indexOf('Small') > -1) {
      this.cols = 1

      // img.style.cssText= 'top: 40vw'    
    } else {
      this.cols = 2
    }

  }

  ngOnInit(): void {
    let img = document.getElementById("sist")
    console.log(img)
    setTimeout(() => {
      this.passImg()
    }, 5000);

  }

  auth() {
    this.authService.auth(this.login.value.user, this.login.value.pass)
  }
  passImg() {
    let id!: number

    for (var i = 0; i < this.imgs.length; i++) {
      if (this.imgs[i].estado === 'visivel') {
        this.imgs[i].estado = 'escondido'

        id = i === (this.imgs.length - 1) ? 0 : (i + 1)

        break
      }

    }

    this.imgs[id].estado = 'visivel'

    setTimeout(() => {
      this.passImg()
    }, 5000);


  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }


}


