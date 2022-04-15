import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
//import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: any = FormGroup;
  responseMessage: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userSevice: UserService,
    private snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<SignupComponent>,
    //private ngxService: NgxUiLoaderService//
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegEx)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegEx)]],
      contactNumber: [null, [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegEx)]],
      password: [null, [Validators.required]],
    })
  }

  handleSubmit() {
    //this.ngxService.start();
    var formData = this.signupForm.value;
    var data = {
      name: formData.name,
      email: formData.rmail,
      contactNumber: formData.contactNumber,
      password: formData.password
    }
    this.userSevice.signup(data).subscribe((respnse: any) => {
      // this.ngxService.stop(),
      this.dialogRef.close();
      this.responseMessage = respnse?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "");
      this.router.navigate(['/']);
    }, (error) => {
      //this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);

    })
  }
}


