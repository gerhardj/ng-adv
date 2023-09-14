# Optimize Bundles

In order to optimize bundles, we need to analyze them first. There are several tools that can help us with that. At the moment bundle analysis does not support ESBuild.

## Source Maps Explorer

Install Source Map Explorer:

```
npm i -S source-map-explorer
```

Create Production Build:

```
ng build -c production
```

Analyze Chunks:

```
source-map-explorer dist/main-es5.28a67cbad0b0a3f17e1e.js
```

## Webpack Bundle Analyzer

Investigate `package.json`:

```
 "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "build:stats": "ng build --statsJson",
    "analyze": "webpack-bundle-analyzer ./dist/optimize-angular/stats.json -p 5010"
  },
```

Show bundle limits in angular.json. Create stats and analyze:

```bash
npm run stats
npm run analyze
```

Find Moment.js and look at its size

Replace Moment.js by date-fns in `bundles.component.ts`

```
npm install date-fns --save
npm uninstall moment
```

Use the following functions:

```
addDays(date, amount)
format(new Date(2016, 0, 1), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
```

Notice the change in total bundle size
