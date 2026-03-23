import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '@/pages/DashboardPage';
import ModulePage from '@/pages/ModulePage';
import CalculatorPage from '@/pages/CalculatorPage';
import Layout from '@/components/Layout';

export default function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/module/:moduleId" element={<ModulePage />} />
        <Route path="/calculator/:calcId" element={<CalculatorPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
