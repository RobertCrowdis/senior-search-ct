import { LocationService } from './location.service';
export * from './location.service';
import { CentersService } from './centers.service';
export * from './centers.service';
export * from '../interfaces';

export const SERVICES: any[] = [
    LocationService,
    CentersService
];
