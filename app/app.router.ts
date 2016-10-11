import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {RouterModule} from '@angular/router';

const routes =[
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent}
];

export default RouterModule.forRoot(routes);