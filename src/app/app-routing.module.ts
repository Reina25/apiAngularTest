import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { TableTestComponent } from './table-test/table-test.component';

const routes: Routes = [
  {path: '',redirectTo: '/table', pathMatch:'full'},
  {path: 'table', component: TableTestComponent},
  {path: 'form', component: FormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingcomp =[
  // ListComponent,
  TableTestComponent,
  FormComponent
]
