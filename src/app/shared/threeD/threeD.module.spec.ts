import { ThreeDModule } from './threeD.module';

describe('ThreeDModule', () => {
  let threeDModule: ThreeDModule;

  beforeEach(() => {
    threeDModule = new ThreeDModule();
  });

  it('should create an instance', () => {
    expect(threeDModule).toBeTruthy();
  });
});
