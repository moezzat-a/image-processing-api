export async function timeOut(ms: number): Promise<void> {
  return new Promise((_, reject) => setTimeout(reject, ms));
}
