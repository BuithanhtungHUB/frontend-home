import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs/operators";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

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
            console.log(this.imgUrl);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
  formUpdateProfile: FormGroup | undefined;
  safeUrl: SafeUrl | undefined;
  fullNameStr: string | undefined;
  emailStr: string | undefined;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private authService: AuthService,
              private storage: AngularFireStorage,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe( res => {
      this.formUpdateProfile = this.fb.group({
        avatar: [res.avatar],
        username: [res.user_name, [Validators.required]],
        fullName: [res.full_name, [Validators.required]],
        address: [res.address, [Validators.required]],
        phoneNumber: [res.phone, [Validators.required, Validators.pattern('(0)+[0-9]{9}\\b')]],
        email: [res.email, [Validators.required, Validators.email]],
      })
    }, error => {
    })
    this.formUpdateProfile = this.fb.group({
      avatar: [''],
      username: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('(0)+[0-9]{9}\\b')]],
      email: ['', [Validators.required, Validators.email]],
    })

    this.safeUrl = this.sanitizer.bypassSecurityTrustUrl('https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/440px-User_icon_2.svg.png');
    this.fullNameStr = 'Đỗ Trung Kiên';
    this.emailStr = 'kien@gmail.com'
    console.log(this.safeUrl);
  }

  submit() {
    let data = this.formUpdateProfile?.value;
    this.userService.updateProfile(data).subscribe(res => {
      this.router.navigate(['']).then(
        () => {
          console.log('Cập nhật thành công');
        }
      );
      alert('Cập nhật thành công');
    })
  }

  get username() {
    return this.formUpdateProfile?.get('username');
  }

  get fullName() {
    return this.formUpdateProfile?.get('fullName');
  }

  get address() {
    return this.formUpdateProfile?.get('address');
  }

  get phoneNumber() {
    return this.formUpdateProfile?.get('phoneNumber');
  }

  get email() {
    return this.formUpdateProfile?.get('email');
  }
}
