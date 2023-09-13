import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "food", data: {preload: true}, loadComponent: () => import('./food/food-container/food-container.component').then(m => m.FoodContainerComponent) },
    { path: "about", component: AboutComponent }
];