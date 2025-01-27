import { Routes } from '@angular/router';
import { ActorListComponent } from './features/actors/components/actor-list/actor-list.component';
import { MovieListComponent } from './features/movies/components/movie-list/movie-list.component';
import { MovieFormComponent } from './features/movies/components/movie-form/movie-form.component';
import { ActorDetailComponent } from './features/actors/components/actor-detail/actor-detail.component';
import { MovieDetailComponent } from './features/movies/components/movie-detail/movie-detail.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { InternalServerErrorComponent } from './core/components/internal-server-error/internal-server-error.component';
import { UnauthorizedComponent } from './core/components/unauthorized/unauthorized.component';
import { HomeComponent } from './features/home/home.component';
import { ComingSoonComponent } from './core/components/coming-soon/coming-soon.component';

export const routes: Routes = [
    { path : '', component : HomeComponent},
    { path : 'actors', component : ActorListComponent},
    { path : 'actor/:id', component : ActorDetailComponent},
    { path : 'movies', component : MovieListComponent},
    { path : 'movie/:id', component : MovieDetailComponent},
    { path : 'movies/form', component : MovieFormComponent},
    { path : 'movies/form/:id', component : MovieFormComponent},
    { path : 'serie', component : ComingSoonComponent},

    /* ================= ERROR ROUTE =============================== */
    { path : 'server-error', component : InternalServerErrorComponent},
    { path : 'unauthorized', component : UnauthorizedComponent},
    { path : '**',component : PageNotFoundComponent}
];
