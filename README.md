# Mosaicar
An application that converts an image into a mosaic and uploads an image to Imgur for sharing

## Getting Started
### Installing
```
git clone git@github.com:ocetnik/mosaicar.git
cd mosaicar
yarn install --pure-lockfile
yarn start
```

### Running the tests
```
yarn test
```

---

#### Challenges
 - MobX (mainly its Provider) in combination with TypeScript, React Router and Jest
 - Work with canvas
 - Render an enormous number of SVG elements
 - Transform SVG string back image

#### Gaps in my solution
 - missing loading during image transformation to mosaic
 - missing loading during computing final mosaic image size after clik on Share button (slow `atob` operation before starting uploading). Loading is not shown until the uploading starts
 - when final mosaic image for sharing is bigger than 10 MB the info message is displayed only in the console
 - slow synchronous image transformations
  
#### Areas for improvement
 - type props (routing and MobX stores) from MobX Provider correctly
	 - don't use optional properties in component props interfaces
	 - don't use [TypeScript Non-null assertion operator](https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#non-null-assertion-operator)
 - cancel promises in gallery paging (don't wait for each response when a user clicks very fast on the next page button)
 - rewrite MobX actions from async/await to [flows](https://mobx.js.org/best/actions.html#flows)
 - use server side rendering
 - render huge SVG without `dangerouslySetInnerHTML`
 - get SVG element for transformation back to image without `document.getElementById`
 - use MobX observers not only for fetch requests (handle also other asynchronous things with MobX or Redux Sagas, not using local states)
 - add 404 route
 - better error handling (show error messages to user)
 - maybe use invariant instead of throwing errors
 - add more tests (also for canvas)
 - better design of whole app
