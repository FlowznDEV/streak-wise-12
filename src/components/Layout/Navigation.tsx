import { useState } from 'react';
import { 
  Home, 
  Dumbbell, 
  UtensilsCrossed, 
  Users, 
  Trophy, 
  Bot, 
  BookOpen, 
  HelpCircle,
  Target,
  User,
  Settings,
  CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userPlan: 'basic' | 'average' | 'body';
}

const Navigation = ({ activeTab, onTabChange, userPlan }: NavigationProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home, 
      color: 'text-primary',
      available: true 
    },
    { 
      id: 'treinos', 
      label: 'Treinos', 
      icon: Dumbbell, 
      color: 'text-treino-basic',
      available: true 
    },
    { 
      id: 'dieta', 
      label: 'Dieta', 
      icon: UtensilsCrossed, 
      color: 'text-diet-light',
      available: true 
    },
    { 
      id: 'metas', 
      label: 'Metas', 
      icon: Target, 
      color: 'text-warning',
      available: true 
    },
    { 
      id: 'comunidade', 
      label: 'Comunidade', 
      icon: Users, 
      color: 'text-info',
      available: userPlan === 'average' || userPlan === 'body'
    },
    { 
      id: 'desafios', 
      label: 'Desafios', 
      icon: Trophy, 
      color: 'text-treino-medium',
      available: userPlan === 'average' || userPlan === 'body'
    },
    { 
      id: 'assistente', 
      label: 'Assistente IA', 
      icon: Bot, 
      color: 'text-treino-body',
      available: userPlan === 'body'
    },
    { 
      id: 'aprenda', 
      label: 'Aprenda', 
      icon: BookOpen, 
      color: 'text-diet-moderate',
      available: userPlan === 'body'
    },
    { 
      id: 'suporte', 
      label: 'Suporte', 
      icon: HelpCircle, 
      color: 'text-destructive',
      available: true 
    },
    { 
      id: 'perfil', 
      label: 'Perfil', 
      icon: User, 
      color: 'text-muted-foreground',
      available: true 
    },
    { 
      id: 'planos', 
      label: 'Planos', 
      icon: CreditCard, 
      color: 'text-success',
      available: true 
    }
  ];

  return (
    <nav className={cn(
      "fixed left-0 top-0 h-full bg-gradient-card border-r border-border transition-all duration-300 z-50",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-bold text-lg">TreineAI</h1>
                <p className="text-xs text-muted-foreground capitalize">{userPlan} Builder</p>
              </div>
            )}
          </div>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-6 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
          >
            <Settings className="w-3 h-3" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isAvailable = item.available;

              return (
                <button
                  key={item.id}
                  onClick={() => isAvailable && onTabChange(item.id)}
                  disabled={!isAvailable}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative",
                    isActive && isAvailable && "bg-primary/20 text-primary",
                    !isActive && isAvailable && "hover:bg-secondary text-muted-foreground hover:text-foreground",
                    !isAvailable && "opacity-50 cursor-not-allowed",
                    isCollapsed && "justify-center"
                  )}
                >
                  <Icon className={cn(
                    "w-5 h-5 transition-colors",
                    isActive && isAvailable ? "text-primary" : item.color
                  )} />
                  
                  {!isCollapsed && (
                    <span className="font-medium truncate">{item.label}</span>
                  )}

                  {!isAvailable && !isCollapsed && (
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                    </div>
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-card border border-border rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                      {!isAvailable && (
                        <span className="text-destructive ml-2">(Bloqueado)</span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className={cn(
            "text-xs text-center text-muted-foreground",
            isCollapsed && "hidden"
          )}>
            TreineAI v1.0
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;