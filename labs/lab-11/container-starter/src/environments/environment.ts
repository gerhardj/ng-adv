declare global {
  interface Window {
    env: any;
  }
}
export const environment = {
  production: true,
  api: window['env'].API_URL,
};