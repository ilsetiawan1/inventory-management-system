// lib/utils/response.ts
// Standard return type untuk semua Server Actions

export type ActionResponse<T = undefined> = { success: true; message: string; data: T } | { success: false; message: string; data?: undefined };

export function successResponse<T>(message: string, data: T): ActionResponse<T> {
  return { success: true, message, data };
}

export function errorResponse(message: string): ActionResponse<never> {
  return { success: false, message };
}

/**
 * Wrapper untuk menangkap error dari service/repository
 * dan mengubahnya menjadi ActionResponse standar
 */
export async function withErrorHandler<T>(fn: () => Promise<T>, successMessage: string): Promise<ActionResponse<T>> {
  try {
    const data = await fn();
    return successResponse(successMessage, data);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan tak terduga';
    return errorResponse(message);
  }
}
