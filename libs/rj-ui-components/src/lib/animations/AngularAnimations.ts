
import {
    trigger,
    state,
    style,
    animate,
    transition,
    group,
    keyframes,
    stagger,
    query,
    animateChild,
    AnimationTriggerMetadata
} from '@angular/animations';

let speed = {
    slow: 1000,
    medium: 500,
    fast: 50
}

/*
* ngIf animations only(Or when something is added/removed from dom)
*/
// @dynamic
export class Core {

    public static fade: AnimationTriggerMetadata = trigger('fade', [
        transition(':enter', [
            group([
                style({ opacity: '0' }),
                animate('0.5s linear', style({ opacity: '1' }))
            ])
        ]),
        transition(':leave', [
            group([
                style({ opacity: '1' }),
                animate('0.5s linear', style({ opacity: '0' }))
            ])
        ])
    ]);

    public static slideFade: AnimationTriggerMetadata = trigger('slideFade', [
        transition(':enter', [
            group([
                style({ opacity: '0', transform: 'translate(0,-25%)' }),
                animate('0.3s ease-out', style({ transform: 'translate(0, 0)' })),
                animate('0.15s linear', style({ opacity: '1' }))
            ])
        ]),
        transition(':leave', [
            group([
                style({ opacity: '1', transform: 'translate(0, 0)' }),
                animate('0.3s ease-out', style({ transform: 'translate(0,-25%)' })),
                animate('0.15s linear', style({ opacity: '0' }))
            ])
        ])
    ]);

    public static slideUp: AnimationTriggerMetadata = trigger('slideUp', [
        transition(':enter', [
            group([
                style({ transform: 'translate(0,-100%)' }),
                animate('0.35s ease', style({ transform: 'translate(0, 0)' }))
            ])
        ]),
        transition(':leave', [
            group([
                style({ transform: 'translate(0, 0)' }),
                animate('0.35s ease', style({ transform: 'translate(0,-100%)' }))
            ])
        ])
    ]);

    public static fadeInUp: AnimationTriggerMetadata = trigger('fadeInUp', [
        transition(':enter', [
            group([
                style({ opacity: '0', transform: 'translate(0, 40px)' }),
                animate('1s ease-out', style({ transform: 'translate(0, 0)' })),
                animate('1s linear', style({ opacity: '1' }))
            ])
        ]),
        transition(':leave', [
            group([
                style({ opacity: '1', transform: 'translate(0, 0)' }),
                animate('1s ease-out', style({ transform: 'translate(0,40px)' })),
                animate('1s linear', style({ opacity: '0' }))
            ])
        ])
    ]);

    public static fadeInDown: AnimationTriggerMetadata = trigger('fadeInDown', [
        transition(':enter', [
            group([
                style({ opacity: '0', transform: 'translate(0, -100px)' }),
                animate('0.5s ease-out', style({ transform: 'translate(0, 0)' })),
                animate('0.5s linear', style({ opacity: '1' }))
            ])
        ]),
        transition(':leave', [
            group([
                style({ opacity: '1', transform: 'translate(0, 0)' }),
                animate('0.5s ease-out', style({ transform: 'translate(0,-100px)' })),
                animate('0.5s linear', style({ opacity: '0' }))
            ])
        ])
    ]);

    public static fadeInLeft: AnimationTriggerMetadata = trigger('fadeInLeft', [
        transition(':enter', [
            group([
                style({ opacity: '0', transform: 'translate(-25%, 0%)' }),
                animate('1s ease-out', style({ transform: 'translate(0, 0)' })),
                animate('1s ease-in', style({ opacity: '1' }))
            ])
        ]),
        transition(':leave', [
            group([
                style({ opacity: '1', transform: 'translate(0, 0)' }),
                animate('1s ease-out', style({ transform: 'translate(-25%,0%)' })),
                animate('1s linear', style({ opacity: '0' }))
            ])
        ])
    ]);

    public static fadeInRight: AnimationTriggerMetadata = trigger('fadeInRight', [
        transition(':enter', [
            group([
                style({ opacity: '0', transform: 'translate(25%, 0%)' }),
                animate('1s ease-out', style({ transform: 'translate(0, 0)' })),
                animate('1s linear', style({ opacity: '1' }))
            ])
        ]),
        transition(':leave', [
            group([
                style({ opacity: '1', transform: 'translate(0, 0)' }),
                animate('1s ease-out', style({ transform: 'translate(25%,0%)' })),
                animate('1s linear', style({ opacity: '0' }))
            ])
        ])
    ]);

    public static slideLeft: AnimationTriggerMetadata = trigger('slideLeft', [
        transition(':enter', [
            group([
                style({ transform: 'translate(-100%,0)' }),
                animate('0.35s ease', style({ transform: 'translate(0, 0)' }))
            ])
        ]),
        transition(':leave', [
            style({ transform: 'translate(0, 0)' }),
            group([
                animate('0.35s ease', style({ transform: 'translate(-100%,0)' }))
            ])
        ])
    ]);

    public static slideRight: AnimationTriggerMetadata = trigger('slideRight', [
        transition(':enter', [
            group([
                style({ transform: 'translate(100%,0)' }),
                animate('0.35s ease', style({ transform: 'translate(0, 0)' }))
            ])
        ]),
        transition(':leave', [
            group([
                style({ transform: 'translate(0, 0)' }),
                animate('0.35s ease', style({ transform: 'translate(100%,0)' }))
            ])
        ])
    ]);

    public static expandCircle: AnimationTriggerMetadata = trigger('expandCircle', [
        transition(':enter', [
            group([
                style({
                    'position':'fixed',
                    'top':'0px',
                    'right':'0px',
                    'height':'0px',
                    'width':'0px',
                    'opacity':'0'

                }),
                animate('0.3s ease-out', style({
                    'position':'fixed',
                    'width': '100%',
                    'height': '100%',
                    'top': '0',
                    'right': '0',
                    'border-radius': '0px',
                    'opacity':'1'
                })
            )
            ]),
        ]),
        transition(':leave', [
            group([
                style({
                    'position':'fixed',
                    'width': '100%',
                    'height': '100%',
                    'top': '0',
                    'right': '0',
                    'border-radius': '0px',
                    'opacity':'1'
                }),
                animate('0.3s ease',
                    style({
                        'position':'fixed',
                        'width': '0px',
                        'height': '0px',
                        'top': '0',
                        'right': '0',
                        'border-radius': '0px',
                        'opacity':'0'
                    })
                ),
            ])
        ])
    ]);

    public static blink: AnimationTriggerMetadata = trigger('blink', [
        transition('* => *', [
            animate("0.1s", keyframes([
                style({ opacity: 0, offset: 0.5 }),
                style({ opacity: 1, offset: 1 })
            ]))
        ])
    ]);

    public static pulse: AnimationTriggerMetadata = trigger('pulse', [
        transition('* => *', [
            animate("0.5s", keyframes([
                style({ transform: 'scale3d(1, 1, 1)', offset: 0 }),
                style({ transform: 'scale3d(1.05, 1.05, 1.05)', offset: 0.5 }),
                style({ transform: 'scale3d(1, 1, 1)', offset: 1 })
            ]))
        ])
    ]);

    public static rubberBand: AnimationTriggerMetadata = trigger('rubberBand', [
        transition('* => *', [
            animate("1s", keyframes([
                style({ transform: 'scale3d(1, 1, 1)', offset: 0 }),
                style({ transform: 'scale3d(1.25, 0.75, 1)', offset: 0.3 }),
                style({ transform: 'scale3d(0.75, 1.25, 1)', offset: 0.4 }),
                style({ transform: 'scale3d(1.15, 0.85, 1)', offset: 0.5 }),
                style({ transform: 'scale3d(.95, 1.05, 1)', offset: 0.65 }),
                style({ transform: 'scale3d(1.05, .95, 1)', offset: 0.75 }),
                style({ transform: 'scale3d(1, 1, 1)', offset: 1 })
            ]))
        ])
    ]);

    public static flyInOut: AnimationTriggerMetadata = trigger('flyInOut', [
        state('in', style({ transform: 'translateX(0)' })),
        transition('void => *', [
            animate(300, keyframes([
                style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
                style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
                style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
            ]))
        ]),
        transition('* => void', [
            animate(300, keyframes([
                style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
                style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
            ]))
        ])
    ]);

    public static expand: AnimationTriggerMetadata = trigger('expand', [
        transition(':enter', [
            group([
                style({ height: '0' }),
                animate('0.35s ease', style({ height: '*' }))
            ])
        ]),
        transition(':leave', [
            group([
                style({ height: '*' }),
                animate('0.35s ease', style({ height: '0' }))
            ])
        ])
    ]);

    public static pieceTogether: AnimationTriggerMetadata = trigger('pieceTogether', [
        transition(':enter', [
            query('*', style({ opacity: 0 }), { optional: true }),
            query('*', stagger('100ms', [
                animate('100ms ease-in', keyframes([
                    style({ opacity: 0, transform: 'translateY(-100%)', offset: 0 }),
                    style({ opacity: .7, transform: 'translateY(5px)', offset: 0.3 }),
                    style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
                ]))]), { optional: true }),
        ]),
        transition(':leave', [
            query('*', style({ opacity: 1 }), { optional: true }),
            query('*', stagger('100ms', [
                animate('400ms ease-out', keyframes([
                    style({ opacity: 1, transform: 'translateY(0) scaleY(1)', offset: 0 }),
                    style({ opacity: .3, transform: 'translateY(-30%) scaleY(0.5)', offset: 0.3 }),
                    style({ opacity: 0, transform: 'translateY(-100%) scaleY(0)', offset: 1.0 }),
                ]))]), { optional: true }),
        ])

    ])

    public static listItemFromTemplate: AnimationTriggerMetadata = trigger('listItemFromTemplate', [
        transition('1 => *', [
            query('.item', [
                animateChild()
            ]),
        ])
    ])

    public static listFadeIn: AnimationTriggerMetadata = trigger('listFadeIn', [
        transition(':enter', [
            query('@pieceTogether', stagger('400ms', [
                animateChild()
            ]), { optional: true })
        ]),

    ])
    public static listFadeOut: AnimationTriggerMetadata = trigger('listFadeOut', [
        transition('* => *', [
            query('*', stagger('400ms', [
                style({ opacity: '1' }),
                animate('0.5s linear', style({ opacity: '0' }))
            ]), { optional: true })
        ]),

    ])

    public static cardList: AnimationTriggerMetadata = trigger('cardList', [
        transition('* => *', [
            query(':self', stagger('400ms', [
                    query('@cardFlipIn', animateChild(), { optional: true })
                ]),
            ),
        ]),

    ])

    public static cardFlipIn: AnimationTriggerMetadata = trigger('cardFlipIn', [
        transition(':leave', [
            style({ width:'*',opacity: 1 }),
            style({ transform: 'rotateY( 0deg )', 'transform-style': 'preserve-3d', 'transition': 'transform 1s' }),
            animate('0.5s ease', style({ transform: 'rotateY( 180deg )', 'transform-style': 'preserve-3d', 'transition': 'transform 1s', opacity: '0' })),
            animate('0.5s ease', style({ width: "0",margin:"0",padding:"0",border:"0" })),
        ]),
        // transition('* => deleted', [
        //     style({ width: '*' }),
        //     animate('0.5s ease', style({ width: 0 })),
        // ]),
        transition('unchanged => added,void => added, deleted => added', [
            style({ opacity: 0, width: '0px' }),
            style({ transform: 'rotateY( 180deg )', 'transform-style': 'preserve-3d', 'transition': 'transform 1s' }),
            animate('0.3s ease', style({ width: "*" })),
            animate('0.3s ease', style({ transform: 'rotateY( 0deg )', 'transform-style': 'preserve-3d', 'transition': 'transform 1s', opacity: '1' })),
        ]),

    ])
    public static cardFlipOut: AnimationTriggerMetadata = trigger('cardFlipOut', [
        transition('* => deleted', [
            style({ width: '*' }),
            animate('1s ease', style({ width: "0",margin:"0",padding:"0" })),
        ]),

    ])


    public static listCardFlipIn: AnimationTriggerMetadata = trigger('listCardFlipIn', [
        transition(':enter', [
            query(':enter', stagger('200ms', [
                animateChild()
            ]), { optional: true })
        ]),

    ])




}

// @dynamic
export class Custom {

    /*Custom*/
    public static slide = (xTranslation: string = '0%', yTranslation: string = '0%', speedInMs?: number, name?: string) => {
        speedInMs = speedInMs ? speedInMs : 300;

        return trigger(`${name || 'slide'}`, [
            transition(':enter', [
                style({ transform: `translate(${xTranslation},${yTranslation})` }),
                group([
                    animate(`${speedInMs}ms ease`, style({ transform: 'translate(0, 0)' }))
                ])
            ]),
            transition(':leave', [
                style({ transform: 'translate(0, 0)' }),
                group([
                    animate('0.35s ease', style({ transform: `translate(${xTranslation},${yTranslation})` }))
                ])
            ])
        ]);
    }

    public static fade = (timings: string = '1s linear') => {
        trigger('fade', [
            transition(':enter', [
                group([
                    style({ opacity: '0' }),
                    animate(timings, style({ opacity: '1' }))
                ])
            ]),
            transition(':leave', [
                group([
                    style({ opacity: '1' }),
                    animate(timings, style({ opacity: '0' }))
                ])
            ])
        ])
    }
} 