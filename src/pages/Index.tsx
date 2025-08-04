import { useState, useEffect } from 'react';
import Navigation from '@/components/Layout/Navigation';
import Dashboard from '@/components/Dashboard/Dashboard';
import TreinosTab from '@/components/Treinos/TreinosTab';
import DietaTab from '@/components/Dieta/DietaTab';
import MetasTab from '@/components/Metas/MetasTab';
import PlanosTab from '@/components/Planos/PlanosTab';
import ComunidadeTab from '@/components/Comunidade/ComunidadeTab';
import DesafiosTab from '@/components/Desafios/DesafiosTab';
import AssistenteTab from '@/components/Assistente/AssistenteTab';
import AprendaTab from '@/components/Aprenda/AprendaTab';
import LoginForm from '@/components/Auth/LoginForm';
import RegisterForm from '@/components/Auth/RegisterForm';
import { cn } from '@/lib/utils';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userPlan, setUserPlan] = useState<'basic' | 'average' | 'body'>('basic');
  const [userData, setUserData] = useState({
    name: 'Usuário',
    email: '',
    goal: 'Emagrecimento'
  });

  const handleLogin = (email: string, password: string) => {
    setIsAuthenticated(true);
    setUserData(prev => ({ ...prev, email }));
  };

  const handleRegister = (data: any) => {
    setIsAuthenticated(true);
    setUserData({
      name: data.name,
      email: data.email,
      goal: data.goal
    });
    setUserPlan(data.plan);
  };

  const handleUpgrade = (planId: string) => {
    setUserPlan(planId as 'basic' | 'average' | 'body');
  };

  if (!isAuthenticated) {
    return showRegister ? (
      <RegisterForm 
        onRegister={handleRegister}
        onSwitchToLogin={() => setShowRegister(false)}
      />
    ) : (
      <LoginForm 
        onLogin={handleLogin}
        onSwitchToRegister={() => setShowRegister(true)}
      />
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard userPlan={userPlan} onNavigate={setActiveTab} userName={userData.name} userGoal={userData.goal} />;
      case 'treinos':
        return <TreinosTab />;
      case 'dieta':
        return <DietaTab />;
      case 'metas':
        return <MetasTab />;
      case 'comunidade':
        return <ComunidadeTab userPlan={userPlan} userName={userData.name} />;
      case 'planos':
        return <PlanosTab currentPlan={userPlan} onUpgrade={handleUpgrade} />;
      case 'desafios':
        return <DesafiosTab />;
      case 'assistente':
        return <AssistenteTab />;
      case 'aprenda':
        return <AprendaTab />;
      case 'perfil':
        return <div className="text-center py-20"><h2 className="text-2xl">Perfil em desenvolvimento...</h2></div>;
      default:
        return <Dashboard userPlan={userPlan} onNavigate={setActiveTab} userName={userData.name} userGoal={userData.goal} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        userPlan={userPlan}
      />
      <main className={cn("transition-all duration-300 pl-64")}>
        <div className="p-6">
          {renderActiveTab()}
        </div>
      </main>
    </div>
  );
};

export default Index;
