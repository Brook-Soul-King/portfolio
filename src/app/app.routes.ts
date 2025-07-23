import { Routes } from '@angular/router';
import { StartpageComponent } from './startpage/startpage.component';
import { ImprintComponent } from './imprint/imprint.component';


export const routes: Routes = [
    { path: '', component: StartpageComponent },
    { path: 'imprint', component: ImprintComponent }
];
