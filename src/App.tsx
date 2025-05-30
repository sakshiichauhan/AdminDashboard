import MainLayout from "./components/layouts/MainLayout";
import AppRoutes from "./routes";

export default function App() {
  return (
    <div>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </div>
  );
}