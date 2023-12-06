import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from "@angular/router";
import { AppComponent } from '../app.component';
import { GmapsService } from '../services/googmaps/gmaps.service';
import { FbCarreraService } from "../services/FbCarrera/fb-carrera.service";

class AlertControllerStub {
  create(obj: any) {}
}

class AngularFireAuthStub {
  currentUser = Promise.resolve({ emailVerified: true });
}

class RouterStub {
  navigate(arr: string[]) {}
}

class AppComponentStub {
  getGeolocation() {}
}

class GmapsServiceStub {
  loadGoogleMaps() {}
}

class FbCarreraServiceStub {
  addCarrera(obj: any) {}
}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let appComponent: AppComponent;
  let gmapsService: GmapsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePage ],
      providers: [
        { provide: AlertController, useClass: AlertControllerStub },
        { provide: AngularFireAuth, useClass: AngularFireAuthStub },
        { provide: Router, useClass: RouterStub },
        { provide: AppComponent, useClass: AppComponentStub },
        { provide: GmapsService, useClass: GmapsServiceStub },
        { provide: FbCarreraService, useClass: FbCarreraServiceStub },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    appComponent = TestBed.inject(AppComponent);
    gmapsService = TestBed.inject(GmapsService);
  });

  it('should call getGeolocation on ngOnInit', () => {
    spyOn(appComponent, 'getGeolocation');
    component.ngOnInit();
    expect(appComponent.getGeolocation).toHaveBeenCalled();
  });

  it('should navigate to /registro if user is not verified', () => {
    const afAuth = TestBed.inject(AngularFireAuth);
    afAuth.currentUser = Promise.resolve({ emailVerified: false } as any);

    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith(['/registro']);
  });

  it('should call addCarrera when aplicar is called', () => {
    const carreraService = TestBed.inject(FbCarreraService);
    const spy = spyOn(carreraService, 'addCarrera').and.callThrough();

    component.aplicar();

    expect(spy).toHaveBeenCalled();
  });
});