"use strict";
var home_component_1 = require('./home/home.component');
var about_component_1 = require('./about/about.component');
var router_1 = require('@angular/router');
var routes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'about', component: about_component_1.AboutComponent }
];
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.router.js.map