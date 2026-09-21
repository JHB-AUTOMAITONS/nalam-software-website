export interface ContactApiResponse {
  success: boolean;
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
}
