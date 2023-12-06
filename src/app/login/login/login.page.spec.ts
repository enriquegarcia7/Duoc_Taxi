import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { ToastController } from '@ionic/angular';
import { FirebaseErrorService } from "../../services/firebase-error/firebase-error.service";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { HttpClient } from "@angular/common/http";
import { UsuarioService } from "../../services/usuario/usuario.service";
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';

class ToastControllerStub {
  create(obj: any) {}
}

class FirebaseErrorServiceStub {
  codeError(code: string) {}
}

class AngularFireAuthStub {
  signInWithEmailAndPassword(email: string, password: string) {
    return Promise.resolve({ user: { emailVerified: true, uid: '123' } });
  }
}

class HttpClientStub {}

class UsuarioServiceStub {}

class FormBuilderStub {
  group(obj: any) {
    return new FormGroup({});
  }
}

class RouterStub {
  navigate(arr: string[]) {}
}

class AlertControllerStub {
  create(obj: any) {}
}

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      providers: [
        { provide: ToastController, useClass: ToastControllerStub },
        { provide: FirebaseErrorService, useClass: FirebaseErrorServiceStub },
        { provide: AngularFireAuth, useClass: AngularFireAuthStub },
        { provide: HttpClient, useClass: HttpClientStub },
        { provide: UsuarioService, useClass: UsuarioServiceStub },
        { provide: FormBuilder, useClass: FormBuilderStub },
        { provide: Router, useClass: RouterStub },
        { provide: AlertController, useClass: AlertControllerStub },
      ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call signInWithEmailAndPassword when log is called', () => {
    const afAuth = TestBed.inject(AngularFireAuth);
    const spy = spyOn(afAuth, 'signInWithEmailAndPassword').and.callThrough();

    component.log();

    expect(spy).toHaveBeenCalled();
  });
});