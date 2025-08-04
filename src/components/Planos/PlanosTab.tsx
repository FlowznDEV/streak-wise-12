import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, 
  Check, 
  X, 
  CreditCard, 
  Star, 
  Zap, 
  Target,
  Users,
  Trophy,
  Bot,
  BookOpen,
  Dumbbell,
  UtensilsCrossed
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  restrictions: string[];
  popular: boolean;
  color: string;
  bgColor: string;
  icon: any;
}

interface PlanosTabProps {
  currentPlan: 'basic' | 'average' | 'body';
  onUpgrade: (planId: string) => void;
}

const PlanosTab = ({ currentPlan, onUpgrade }: PlanosTabProps) => {
  const paymentLinks = {
    basic: 'https://pay.cakto.com.br/hxgigeg_511033',
    average: 'https://pay.cakto.com.br/oeozva2_511036',
    body: 'https://pay.cakto.com.br/3d9kuts_511040'
  };

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic Builder',
      price: 29.90,
      period: '/mês',
      description: 'Perfeito para quem está começando a jornada fitness',
      features: [
        'Acesso completo a Treinos',
        'Biblioteca de Receitas e Dietas',
        'Sistema de Metas pessoais',
        'Dashboard de progresso',
        'Suporte por email'
      ],
      restrictions: [
        'Comunidade (bloqueada)',
        'Desafios (bloqueados)',
        'Assistente IA (bloqueado)',
        'Aprenda (bloqueado)'
      ],
      popular: false,
      color: 'text-treino-basic',
      bgColor: 'bg-treino-basic/10',
      icon: Target
    },
    {
      id: 'average',
      name: 'Average Builder',
      price: 49.90,
      period: '/mês',
      description: 'Para quem quer ir além e se conectar com a comunidade',
      features: [
        'Tudo do Basic Builder',
        'Acesso à Comunidade',
        'Desafios e Competições',
        'Estatísticas avançadas',
        'Suporte prioritário',
        'Planos de treino personalizados'
      ],
      restrictions: [
        'Assistente IA (bloqueado)',
        'Aprenda (bloqueado)'
      ],
      popular: true,
      color: 'text-treino-medium',
      bgColor: 'bg-treino-medium/10',
      icon: Zap
    },
    {
      id: 'body',
      name: 'Body Builder',
      price: 69.90,
      period: '/mês',
      description: 'A experiência completa para transformação total',
      features: [
        'Tudo do Average Builder',
        'Assistente IA personalizado',
        'Acesso ao Aprenda',
        'Consultoria nutricional',
        'Análise corporal avançada',
        'Suporte VIP 24/7',
        'Acesso antecipado a novidades'
      ],
      restrictions: [],
      popular: false,
      color: 'text-treino-body',
      bgColor: 'bg-treino-body/10',
      icon: Crown
    }
  ];

  const getCurrentPlanData = () => {
    return plans.find(plan => plan.id === currentPlan);
  };

  const featureIcons: { [key: string]: any } = {
    'Treinos': Dumbbell,
    'Receitas': UtensilsCrossed,
    'Metas': Target,
    'Dashboard': Star,
    'Comunidade': Users,
    'Desafios': Trophy,
    'Assistente IA': Bot,
    'Aprenda': BookOpen,
    'Suporte': Star
  };

  const getFeatureIcon = (feature: string) => {
    for (const [key, icon] of Object.entries(featureIcons)) {
      if (feature.toLowerCase().includes(key.toLowerCase())) {
        return icon;
      }
    }
    return Check;
  };

  const handlePayment = (planId: string) => {
    const paymentUrl = paymentLinks[planId as keyof typeof paymentLinks];
    window.open(paymentUrl, '_blank');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <CreditCard className="w-8 h-8 text-success" />
          Planos TreineAI
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Escolha o plano ideal para sua jornada de transformação. 
          Pagamento seguro via Cakto.
        </p>
      </div>

      {/* Current Plan Status */}
      <Card className="bg-gradient-primary text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Plano Atual: {getCurrentPlanData()?.name}</h3>
                <p className="text-white/80">
                  Renovação automática em 24 dias
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                R$ {getCurrentPlanData()?.price.toFixed(2)}
              </div>
              <div className="text-white/80">{getCurrentPlanData()?.period}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrentPlan = currentPlan === plan.id;
          const isUpgrade = plans.findIndex(p => p.id === currentPlan) < plans.findIndex(p => p.id === plan.id);
          const isDowngrade = plans.findIndex(p => p.id === currentPlan) > plans.findIndex(p => p.id === plan.id);

          return (
            <Card 
              key={plan.id} 
              className={cn(
                "relative overflow-hidden transition-all duration-200",
                plan.popular && "ring-2 ring-primary scale-105",
                isCurrentPlan && "bg-primary/5 border-primary",
                "hover-lift"
              )}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-b-md">
                  Mais Popular
                </div>
              )}

              <CardHeader className="text-center space-y-4 pt-8">
                <div className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mx-auto",
                  plan.bgColor
                )}>
                  <Icon className={cn("w-8 h-8", plan.color)} />
                </div>
                
                <div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>

                 <div className="space-y-1">
                   <div className="text-3xl font-bold flex items-baseline justify-center gap-1">
                     <span className="text-lg">R$</span>
                     {plan.price.toFixed(2).replace('.', ',')}
                     <span className="text-sm text-muted-foreground">{plan.period}</span>
                   </div>
                 </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Incluído:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => {
                      const FeatureIcon = getFeatureIcon(feature);
                      return (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <FeatureIcon className="w-4 h-4 text-success" />
                          <span>{feature}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Restrictions */}
                {plan.restrictions.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Não incluído:</h4>
                    <ul className="space-y-2">
                      {plan.restrictions.map((restriction, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <X className="w-4 h-4 text-destructive" />
                          <span>{restriction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                 {/* Action Button */}
                 <div className="pt-4">
                   {isCurrentPlan ? (
                     <Button className="w-full" disabled>
                       <Check className="w-4 h-4 mr-2" />
                       Plano Atual
                     </Button>
                   ) : (
                     <Button
                       className={cn(
                         "w-full",
                         isUpgrade && "bg-gradient-primary hover:opacity-90",
                         isDowngrade && "variant-outline"
                       )}
                       onClick={() => handlePayment(plan.id)}
                     >
                       {isUpgrade && <Star className="w-4 h-4 mr-2" />}
                       <CreditCard className="w-4 h-4 mr-2" />
                       Assinar por R$ {plan.price.toFixed(2)}
                     </Button>
                   )}
                 </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Features Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Comparação de Recursos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Recurso</th>
                  <th className="text-center py-3 px-4">Basic</th>
                  <th className="text-center py-3 px-4">Average</th>
                  <th className="text-center py-3 px-4">Body</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Treinos e Exercícios', basic: true, average: true, body: true },
                  { name: 'Receitas e Dietas', basic: true, average: true, body: true },
                  { name: 'Sistema de Metas', basic: true, average: true, body: true },
                  { name: 'Dashboard de Progresso', basic: true, average: true, body: true },
                  { name: 'Comunidade', basic: false, average: true, body: true },
                  { name: 'Desafios', basic: false, average: true, body: true },
                  { name: 'Assistente IA', basic: false, average: false, body: true },
                  { name: 'Conteúdo Aprenda', basic: false, average: false, body: true },
                  { name: 'Suporte VIP', basic: false, average: false, body: true }
                ].map((feature, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="py-3 px-4 font-medium">{feature.name}</td>
                    <td className="text-center py-3 px-4">
                      {feature.basic ? (
                        <Check className="w-5 h-5 text-success mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                    <td className="text-center py-3 px-4">
                      {feature.average ? (
                        <Check className="w-5 h-5 text-success mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                    <td className="text-center py-3 px-4">
                      {feature.body ? (
                        <Check className="w-5 h-5 text-success mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Perguntas Frequentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Posso mudar de plano a qualquer momento?</h4>
            <p className="text-sm text-muted-foreground">
              Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. 
              As mudanças entram em vigor imediatamente.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Como funciona o pagamento anual?</h4>
            <p className="text-sm text-muted-foreground">
              No plano anual, você paga 10 meses e ganha 2 meses grátis. 
              O valor é cobrado uma vez por ano.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Posso cancelar a qualquer momento?</h4>
            <p className="text-sm text-muted-foreground">
              Sim, você pode cancelar sua assinatura a qualquer momento. 
              Você continuará tendo acesso até o final do período já pago.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanosTab;