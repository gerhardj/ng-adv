# Angular Universal

Create project and add Universal:

```
ng new ng-universal
cd ng-universal
ng add @nguniversal/express-engine
```

Add a script to track First Contenful Pain (FCP) to `index.html`:

```
<script>
    // Log first contentful paint - source https://web.dev/fcp/#measure-fcp-in-javascript
    const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntriesByName("first-contentful-paint")) {
        console.log("FCP: ", entry.startTime);
        observer.disconnect();
    }
    });
    observer.observe({ type: "paint", buffered: true });
</script>
```

> Note: Reade more about [PerformanceObserver](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver) on MDN

Build Client und Server side & track values. Use multiple terminals:

```
ng s -o
npm run build:ssr
npm run serve:ssr
```

> Note: Execute Node Express on `http://localhost:4000` and compare FCP values and examine the html source. Also create Lighthouse Audit and compare time used for `Scripting`

Use Universal watch mode:

```
npm run dev:ssr
```

## Use Prerendering

Create `routes.txt` in the root folder. It defines routes to pre-render:

```
/food/1
/food/2
/food/3
```
Create prerendered pages:

```bash
ng run foodlist-ssr:prerender --routes-file routes.txt
```

Examine the `dist/foodlist-ssr/browser/food` folder. You will find the pre-rendered pages.