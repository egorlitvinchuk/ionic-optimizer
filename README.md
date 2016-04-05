# Ionic optimizer
A small hook for ionic ~1.2 application, that grabs sources you use and minifies them into small bundle.
Influenced by [cordova-uglify](https://github.com/rossmartin/cordova-uglify)

## Install
```
npm install ionic-optimizer --save-dev
```

And then add executable permissions to **020_ionic_optimizer.js** under your **after_prepare** folder

```
chmod +x hooks/after_prepare/020_ionic_optimizer.js
```

## Usage
For basic usage just wrap your vendor files with 

```
<!-- build:js vendors.js -->
<script src="lib/ionic/js/ionic.js"></script>
<script src="lib/angular/angular.js"></script>
<script src="lib/angular-animate/angular-animate.js"></script>
<script src="lib/angular-sanitize/angular-sanitize.js"></script>
<script src="lib/angular-ui-router/release/angular-ui-router.js"></script>
<script src="lib/ionic/js/ionic-angular.js"></script>
<!-- endbuild -->
```

And app's source files with

```
<!-- build:js app.js -->
<script src="js/app.js"></script>
<script src="js/config.js"></script>
<!-- endbuild -->
```

## Limitations
As this hook is in stage of deep development, there's no flexible customisation available right now. But is on the way. The main restriction is to persist default project structure.