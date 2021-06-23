import { Employee } from './../../models/employee';
import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../services/employee.service'
import {NgForm} from '@angular/forms'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees()
  }

  resetForm(form: NgForm){
    form.reset();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(
      res => {
        this.employeeService.employees = res;
      },
      err => console.log(err)
    )
  }

  addEmployee(form: NgForm){
    if(form.value._id){
      this.employeeService.putEmployee(form.value).subscribe(
        res => console.log(res),
        err => console.error(err)
      )
    } else {
      this.employeeService.createEmployee(form.value).subscribe(
        res => {
          this.getEmployees();
          form.reset();
        },
        err => console.log(err)
      )
    }
  }

  deleteEmployee(id: string) {
    if(confirm('Are you sure you want to delete it')){
      this.employeeService.deleteEmployee(id)
    }
      
  }

  editEmployee(employee: Employee){
    this.employeeService.selectedEmployee = employee;
  }
}
