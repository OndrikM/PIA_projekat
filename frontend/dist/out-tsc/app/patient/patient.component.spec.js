import { TestBed } from '@angular/core/testing';
import { PatientComponent } from './patient.component';
describe('PatientComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PatientComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(PatientComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=patient.component.spec.js.map