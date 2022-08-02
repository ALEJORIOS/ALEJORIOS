import { animate, state, style, transition, trigger } from '@angular/animations';

export const Animations = {
    fromAbove: trigger('entry', [
        state('void', style({
          opacity: 0
        })),
        transition(':enter', [
          style({
            opacity: 0,
            transform: 'translateY(-200%)'
          }),
          animate('350ms')
        ])
      ]),
    
    fade: trigger('fadeEntry', [
        state('void', style({
            opacity: 0
          })),
          transition(':enter', [
            style({
              opacity: 0,
              transform: 'translateY(200%)'
            }),
            animate('350ms')
          ])
    ])
}