// Allows TypeScript to import .png files as modules (e.g., image paths)
declare module "*.png" {
    const value: string;
    export default value;
}
  