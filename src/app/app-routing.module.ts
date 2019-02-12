import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { LoginComponent } from './user/login.component';
import { AuthGuard } from './user/auth.guard';
import { SelectiveStrategy } from './selective-strategy.service';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent },
            {
                path: 'products',
                loadChildren: './products/product.module#ProductModule',
                data: { preload: true },
                canActivate: [AuthGuard]
            },
            { path: 'login', component: LoginComponent },
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: '**', component: PageNotFoundComponent }
        ], {
            preloadingStrategy: SelectiveStrategy,
            enableTracing: false
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

