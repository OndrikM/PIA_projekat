import { TestBed } from '@angular/core/testing';
import { ManagerComponent } from './manager.component';
describe('ManagerComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ManagerComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ManagerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=manager.component.spec.js.map