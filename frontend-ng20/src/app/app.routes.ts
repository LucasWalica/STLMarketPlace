import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: "", loadComponent: () => import('../../../frontend-ng20/src/app/components/home/home.component').then(m => m.HomeComponent) },
  { path: "login", loadComponent: () => import('../../../frontend-ng20/src/app/components/auth/login/login.component').then(m => m.LoginComponent) },
  { path: "register", loadComponent: () => import('../../../frontend-ng20/src/app/components/auth/register/register.component').then(m => m.RegisterComponent) },
  { path: "profile", loadComponent: () => import("../../../frontend-ng20/src/app/components/profile/profile.component").then(m=>m.ProfileComponent)},
  
  { path: "maker/create", loadComponent:() => import("../../../frontend-ng20/src/app/components/forms/maker-profile-create/maker-profile-create.component").then(m=>m.MakerProfileCreateComponent)},
  { path: "maker/update", loadComponent:() => import("../../../frontend-ng20/src/app/components/forms/maker-profile-update/maker-profile-update.component").then(m=>m.MakerProfileUpdateComponent)},
  { path: "stl/create", loadComponent:() => import("../../../frontend-ng20/src/app/components/forms/stl-create/stl-create.component").then(m=>m.StlCreateComponent)},
  { path: "stl/update", loadComponent:() => import("../../../frontend-ng20/src/app/components/forms/stl-update/stl-update.component").then(m=>m.StlUpdateComponent)},
  // needs stl detail
  { path: "stl/search", loadComponent: () => import("../../../frontend-ng20/src/app/components/items/stl/stl-search/stl-search.component").then(m=>m.StlSearchComponent)},
  { path: "album/create", loadComponent : () => import("../../../frontend-ng20/src/app/components/forms/album-create/album-create.component").then(m=>m.AlbumCreateComponent)},
  { path: "album/update", loadComponent: () => import("../../../frontend-ng20/src/app/components/forms/album-update/album-update.component").then(m=>m.AlbumUpdateComponent)},
  { path: "album", loadComponent:()=> import("../../../frontend-ng20/src/app/components/items/album/album-detail/album-detail.component").then(m=>m.AlbumDetailComponent)},
  { path: "album/search", loadComponent: ()=>import("../../../frontend-ng20/src/app/components/items/album/album-search/album-search.component").then(m=>m.AlbumSearchComponent)},
  { path: "stl/owned", loadComponent: ()=>import("../../../frontend-ng20/src/app/components/items/bought-list/bought-list.component").then(m=>m.BoughtListComponent)},
  // this view below is the payment/download
  { path: "stl/download", loadComponent: ()=>import("../../../frontend-ng20/src/app/components/forms/download-create/download-create.component").then(m=>m.DownloadCreateComponent)},
  
  { path: "**", redirectTo: "" },
];
