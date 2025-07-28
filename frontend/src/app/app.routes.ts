import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: "", loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: "login", loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent) },
  { path: "register", loadComponent: () => import('./components/auth/register/register.component').then(m => m.RegisterComponent) },
  { path: "profile", loadComponent: () => import("./components/profile/profile.component").then(m=>m.ProfileComponent)},
  { path: "maker/create", loadChildren:() => import("./components/forms/maker-profile-create/maker-profile-create.component").then(m=>m.MakerProfileCreateComponent)},
  { path: "maker/update", loadChildren:() => import("./components/forms/maker-profile-update/maker-profile-update.component").then(m=>m.MakerProfileUpdateComponent)},
  { path: "stl/create", loadChildren:() => import("./components/forms/stl-create/stl-create.component").then(m=>m.StlCreateComponent)},
  { path: "stl/update", loadChildren:() => import("./components/forms/stl-update/stl-update.component").then(m=>m.StlUpdateComponent)},
  { path: "stl", loadChildren: () => import("./components/items/stl/stl-detail/stl-detail.component").then(m=>m.StlDetailComponent)},
  { path: "stl/search", loadChildren: () => import("./components/items/stl/stl-search/stl-search.component").then(m=>m.StlSearchComponent)},
  { path: "album/create", loadChildren : () => import("./components/forms/album-create/album-create.component").then(m=>m.AlbumCreateComponent)},
  { path: "album/update", loadChildren: () => import("./components/forms/album-update/album-update.component").then(m=>m.AlbumUpdateComponent)},
  { path: "album", loadChildren:()=> import("./components/items/album/album-detail/album-detail.component").then(m=>m.AlbumDetailComponent)},
  { path: "album/search", loadChildren: ()=>import("./components/items/album/album-search/album-search.component").then(m=>m.AlbumSearchComponent)},
  { path: "stl/owned", loadChildren: ()=>import("./components/items/bought-list/bought-list.component").then(m=>m.BoughtListComponent)},
  // this view below is the payment/download
  { path: "stl/download", loadChildren: ()=>import("./components/forms/download-create/download-create.component").then(m=>m.DownloadCreateComponent)},
  
  { path: "**", redirectTo: "" },
];
