import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  title = "cloudsSorage";
  imgUrl: string | undefined;
  downloadURL: Observable<string> | undefined;
  onFileSelected(event: any) {
    var n = Date.now();
    const file = event[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.imgUrl = url;
            }
            // console.log(this.imgUrl);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          // console.log(url);
        }
      });
  }
  formUpdateProfile: FormGroup | undefined;
  fullNameStr: string | undefined;
  emailStr: string | undefined;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private authService: AuthService,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
    let userLogin = JSON.parse(<string>this.authService.getUser());
    // console.log(userLogin);
    this.formUpdateProfile = this.fb.group({
      avatar: [userLogin.avatar],
      user_name: [userLogin.user_name],
      full_name: [userLogin.full_name],
      address: [userLogin.address],
      phone: [userLogin.phone, [Validators.required, Validators.pattern(/(0)+[0-9]{9}\b/)]],
      email: [userLogin.email],
      id: [userLogin.id],
      role: [userLogin.role]
    })

    this.imgUrl = this.formUpdateProfile.value.avatar;
  }

  submit() {
    if (confirm('Bạn đã chắc chắn với thay đổi của mình?')) {
      // @ts-ignore
      this.formUpdateProfile?.value.avatar = this.imgUrl;
      let data = this.formUpdateProfile?.value;
      localStorage.setItem('userLogin', JSON.stringify(data));
      this.userService.updateProfile(data).subscribe(res => {
        this.router.navigate(['']).then();
        alert('Cập nhật thành công');
      });
    }
  }

  get username() {
    return this.formUpdateProfile?.get('user_name');
  }

  get phoneNumber() {
    return this.formUpdateProfile?.get('phone');
  }

  get email() {
    return this.formUpdateProfile?.get('email');
  }
}
