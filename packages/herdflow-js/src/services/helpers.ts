import { targetIs } from '../utils/utils.js';
import { MARKER_SERVICE, MARKER_SERVICE_CLIENT } from './internal/markers.js';
import type { Service } from './service.js';
import type { ServiceClient } from './types/serviceClient.js';

export function isService(x: unknown): x is Service<any> {
  return targetIs(x, MARKER_SERVICE);
}

export function isServiceClient(x: unknown): x is ServiceClient<any> {
  return targetIs(x, MARKER_SERVICE_CLIENT);
}
