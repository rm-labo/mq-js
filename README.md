# @rm-labo/mq-js

![badge](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)
![badge](https://img.shields.io/badge/node-v10.20.0-green.svg?style=flat-square)

| Statements                | Branches                | Functions                | Lines                |
| ------------------------- | ----------------------- | ------------------------ | -------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-0%25-red.svg) | ![Branches](https://img.shields.io/badge/Coverage-0%25-red.svg) | ![Functions](https://img.shields.io/badge/Coverage-0%25-red.svg) | ![Lines](https://img.shields.io/badge/Coverage-0%25-red.svg) |


Media Queries Helper Functions for javascript.


Scss version of the package with a similar concept is [here](http://rm-labo.github.io/mq-scss/)

## Demo

demo page is [here](http://rm-labo.github.io/mq-js/)

## Install

```bash
$ npm i -D @rm-labo/mq-js
```

### Import

```js
import Mq from '@rm-labo/mq-js'
```

## Usage

```js

import Mq from '@rm-labo/mq-js'

const mq = new Mq()

// basic usage
mq.up( bpKeyName1, matchHandler [, unmatchHandler ])
mq.down( bpKeyName1, matchHandler [, unmatchHandler ])
mq.between( bpKeyName1, bpKeyName2, matchHandler [, unmatchHandler ])

```
| arguments      | type       | required | 
| -------------- | ---------- | -------- | 
| bpKeyName1     | `string`   | `true`   | 
| bpKeyName2     | `string`   | `true`   | 
| matchHandler   | `function` | `true`   | 
| unmatchHandler | `function` | `false`  | 



Set the argument to `option.breakpoints` property.

Example of a single breakpoint specification.

```js
const mq = new Mq()

// The second and third (optional) arguments can be used to describe the process that occurs when a condition is met or deviated from.
mq.up(
  'sm', 
  () => { /* Fires in 600px and up */ },
  () => { /* Fires in 599px and down */ }
)

// You can also use method chains to write explicitly
mq
  .down('md', () => { /* Fires in 899px and down */ })
  .up('md', () => { /* Fires in 900px and up */ })


// You can also specify a specific range.
mq
  .between(
    'md', 
    'lg', 
    () => { /* Fires in 900 ~ 1199px */ },
    () => { /* Fires in ~ 899px and 1200px ~ */ })

// Example with all ranges
mq
  .down('sm', () => { /* Fires in 599px and down */ })
  .between('sm', 'md', () => { /* Fires in 600 ~ 899px */ })
  .between('md', 'lg', () => { /* Fires in 900 ~ 1199px */ })
  .between('lg', 'xl', () => { /* Fires in 1200 ~ 1799px */ })
  .up('xl', () => { /* Fires in 1800px ~ */ })

```

For the height

```js
const mq = new Mq()

// The second and third (optional) arguments can be used to describe the process that occurs when a condition is met or deviated from.
mq.heightUp(
  'sm', 
  () => { /* Fires in 600px and up */ },
  () => { /* Fires in 599px and down */ }
)

// You can also use method chains to write explicitly
mq
  .heightDown('md', () => { /* Fires in 899px and down */ })
  .heightUp('md', () => { /* Fires in 900px and up */ })


// You can also specify a specific range.
mq
  .heightBetween(
    'md', 
    'lg', 
    () => { /* Fires in 900 ~ 1199px */ },
    () => { /* Fires in ~ 899px and 1200px ~ */ })

// Example with all ranges
mq
  .heightDown('sm', () => { /* Fires in 599px and down */ })
  .heightBetween('sm', 'md', () => { /* Fires in 600 ~ 899px */ })
  .heightBetween('md', 'lg', () => { /* Fires in 900 ~ 1199px */ })
  .heightBetween('lg', 'xl', () => { /* Fires in 1200 ~ 1799px */ })
  .heightUp('xl', () => { /* Fires in 1800px ~ */ })

```

It is also possible to specify the `width` if you want to use it together with the `height`.

```js
const mq = new Mq()

mq.widthUp() // = mq.up()
mq.widthDown() // = mq.down()
mq.widthBetween() // = mq.between()

// Example of a single breakpoint
ma
  .widthUp('md', () => {}, () => {})
  .heightUp('md', () => {}, () => {})

// Example with all ranges
mq
  .widthDown('sm', () => { /* Fires in w = 599px and down */ })
  .widthBetween('sm', 'md', () => { /* Fires in w = 600 ~ 899px */ })
  .widthBetween('md', 'lg', () => { /* Fires in w = 900 ~ 1199px */ })
  .widthBetween('lg', 'xl', () => { /* Fires in w = 1200 ~ 1799px */ })
  .widthUp('xl', () => { /* Fires in w = 1800px ~ */ })
  .heightDown('sm', () => { /* Fires in h = 599px and down */ })
  .heightBetween('sm', 'md', () => { /* Fires in h = 600 ~ 899px */ })
  .heightBetween('md', 'lg', () => { /* Fires in h = 900 ~ 1199px */ })
  .heightBetween('lg', 'xl', () => { /* Fires in h = 1200 ~ 1799px */ })
  .heightUp('xl', () => { /* Fires in h = 1800px ~ */ })


```





### Default setting values

```js
{
  breakpoints: {
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1800,
  }
}
```

### Override default setting values

You can overwrite option.
Define all of the breakpoints and name combinations you want to use in your project.

```js
const option = {
  breakpoints: {
    'micro' : 320,
    'small' : 620,
    'medium' : 840,
    'large' : 1280,
    'extra' : 1900,
    // .. Add as many as you like ..
  }
}

const mq = new Mq(option)

// usage example
mq
  .down('micro', () => { /* Fires in 319px and down */ },)
  .between('micro', 'small', () => { /* Fires in 320 ~ 619px */ },)
  .between('small', 'medium', () => { /* Fires in 620 ~ 839px */ },)
  .between('medium', 'large', () => { /* Fires in 840 ~ 1279px */ },)
  .between('large', 'extra', () => { /* Fires in 1280 ~ 1899px */ },)
  .up('extra', () => { /* Fires in 1900px and up */ },)

```
## Licence

Licensed under MIT license.
You are free to use for your personal or commercial projects.

## Release notes

| Version | Description |
| ------- | ----------- |
| 1.0.0   | Launch      |