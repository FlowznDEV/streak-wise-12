import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Flame, 
  Target, 
  TrendingUp, 
  Award, 
  Clock, 
  Zap,
  ChevronRight,
  Star,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardProps {
  userPlan: 'basic' | 'average' | 'body';
  onNavigate: (tab: string) => void;
  userName: string;
  userGoal: string;
}

const Dashboard = ({ userPlan, onNavigate, userName, userGoal }: DashboardProps) => {
  const [currentStreak, setCurrentStreak] = useState(7);
  const [totalDays, setTotalDays] = useState(15);
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(false);

  useEffect(() => {
    // Check if 24 hours have passed since last visit
    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date().getTime();
    const dayInMs = 24 * 60 * 60 * 1000;

    if (!lastVisit || (now - parseInt(lastVisit)) >= dayInMs) {
      setShowWelcomeAnimation(true);
      localStorage.setItem('lastVisit', now.toString());
      
      // Hide animation after 3 seconds
      setTimeout(() => setShowWelcomeAnimation(false), 3000);
    }
  }, []);

  const streakPercentage = (currentStreak / 30) * 100;
  const goalProgress = (totalDays / 90) * 100;

  const quickActions = [
    {
      title: 'Treinos',
      description: 'Acesse seus exercícios',
      icon: Activity,
      color: 'text-treino-basic',
      bgColor: 'bg-treino-basic/10',
      onClick: () => onNavigate('treinos')
    },
    {
      title: 'Dieta',
      description: 'Veja suas receitas',
      icon: Target,
      color: 'text-diet-light',
      bgColor: 'bg-diet-light/10',
      onClick: () => onNavigate('dieta')
    },
    {
      title: 'Metas',
      description: 'Configure objetivos',
      icon: Target,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      onClick: () => onNavigate('metas')
    }
  ];

  const centerActions = [
    {
      title: 'Aprenda',
      description: 'Conteúdo educativo',
      icon: Award,
      color: 'text-diet-moderate',
      bgColor: 'bg-diet-moderate/10',
      onClick: () => onNavigate('aprenda'),
      available: userPlan === 'body'
    },
    {
      title: 'Suporte',
      description: 'Precisa de ajuda?',
      icon: Clock,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      onClick: () => onNavigate('suporte'),
      available: true
    }
  ];

  const stats = [
    {
      label: 'Sequência Atual',
      value: `${currentStreak} dias`,
      icon: Flame,
      color: 'text-primary',
      trend: '+2 esta semana'
    },
    {
      label: 'Meta Atual',
      value: userGoal,
      icon: Target,
      color: 'text-success',
      trend: `${Math.round(goalProgress)}% completo`
    },
    {
      label: 'Plano Ativo',
      value: `${userPlan} Builder`,
      icon: Star,
      color: 'text-warning',
      trend: 'Ativo'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Animation */}
      {showWelcomeAnimation && (
        <Card className="bg-gradient-primary border-0 text-white animate-bounce-gentle">
          <CardContent className="text-center py-8">
            <Zap className="w-12 h-12 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold mb-2">Bem-vindo de volta!</h2>
            <p className="text-white/80">Pronto para mais um dia de conquistas?</p>
          </CardContent>
        </Card>
      )}

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Olá, {userName}! 👋</h1>
        <p className="text-muted-foreground">
          Acompanhe seu progresso e continue evoluindo
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={cn("text-xs", stat.color)}>{stat.trend}</p>
                  </div>
                  <Icon className={cn("w-8 h-8", stat.color)} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Streak Progress */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-primary" />
            Progresso da Sequência
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span>Dias consecutivos</span>
            <span className="font-medium">{currentStreak} / 30 dias</span>
          </div>
          <Progress value={streakPercentage} className="h-2" />
          <p className="text-sm text-muted-foreground">
            Continue assim! Você está {30 - currentStreak} dias longe da próxima meta.
          </p>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card 
                key={index} 
                className="hover-lift cursor-pointer group"
                onClick={action.onClick}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center",
                      action.bgColor
                    )}>
                      <Icon className={cn("w-6 h-6", action.color)} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Center Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recursos Centrais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {centerActions.map((action, index) => {
            const Icon = action.icon;
            const isAvailable = action.available;
            
            return (
              <Card 
                key={index} 
                className={cn(
                  "hover-lift cursor-pointer group relative",
                  !isAvailable && "opacity-50"
                )}
                onClick={() => isAvailable && action.onClick()}
              >
                <CardContent className="p-6 text-center">
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
                    action.bgColor
                  )}>
                    <Icon className={cn("w-8 h-8", action.color)} />
                  </div>
                  <h3 className="font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                  
                  {!isAvailable && (
                    <Badge variant="destructive" className="mt-2">
                      Upgrade necessário
                    </Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-success" />
            Atividade Recente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
              <Calendar className="w-4 h-4 text-success" />
              <div className="flex-1">
                <p className="text-sm font-medium">Treino concluído</p>
                <p className="text-xs text-muted-foreground">Hoje às 08:30</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-info/10 rounded-lg">
              <Target className="w-4 h-4 text-info" />
              <div className="flex-1">
                <p className="text-sm font-medium">Meta de água atingida</p>
                <p className="text-xs text-muted-foreground">Ontem às 20:15</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg">
              <Award className="w-4 h-4 text-warning" />
              <div className="flex-1">
                <p className="text-sm font-medium">Sequência de 7 dias!</p>
                <p className="text-xs text-muted-foreground">2 dias atrás</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;