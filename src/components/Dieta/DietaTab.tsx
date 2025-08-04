import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  UtensilsCrossed, 
  Clock, 
  Users, 
  Flame, 
  Heart, 
  Leaf,
  ChefHat,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Recipe {
  id: string;
  name: string;
  category: 'light' | 'moderate' | 'heavy';
  prepTime: string;
  servings: number;
  calories: number;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: string[];
  instructions: string[];
  nutritionalInfo: {
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
  };
  tags: string[];
}

const DietaTab = () => {
  const [selectedCategory, setSelectedCategory] = useState<'light' | 'moderate' | 'heavy'>('light');
  const [favoriteRecipes, setFavoriteRecipes] = useState<string[]>([]);

  // Mock data - será substituído pelos dados do JSON
  const recipes: Recipe[] = [
    {
      id: '1',
      name: 'Salada Verde com Frango Grelhado',
      category: 'light',
      prepTime: '15 min',
      servings: 1,
      calories: 250,
      difficulty: 'easy',
      ingredients: [
        '150g peito de frango',
        'Mix de folhas verdes',
        '1 tomate',
        '1/2 pepino',
        'Azeite extra virgem',
        'Limão',
        'Sal e pimenta'
      ],
      instructions: [
        'Tempere o frango com sal, pimenta e limão',
        'Grelhe o frango por 6-8 minutos de cada lado',
        'Corte os vegetais em pedaços pequenos',
        'Monte a salada e finalize com azeite'
      ],
      nutritionalInfo: {
        protein: 35,
        carbs: 8,
        fats: 12,
        fiber: 4
      },
      tags: ['Proteína', 'Low Carb', 'Fitness']
    },
    {
      id: '2',
      name: 'Salmão com Batata Doce',
      category: 'moderate',
      prepTime: '30 min',
      servings: 2,
      calories: 420,
      difficulty: 'medium',
      ingredients: [
        '200g filé de salmão',
        '1 batata doce média',
        'Brócolis',
        'Azeite',
        'Alho',
        'Ervas finas',
        'Sal e pimenta'
      ],
      instructions: [
        'Pré-aqueça o forno a 200°C',
        'Corte a batata doce em cubos e tempere',
        'Asse a batata por 20 minutos',
        'Tempere o salmão e grelhe por 4 minutos cada lado',
        'Refogue o brócolis com alho',
        'Sirva tudo junto'
      ],
      nutritionalInfo: {
        protein: 28,
        carbs: 35,
        fats: 18,
        fiber: 6
      },
      tags: ['Ômega 3', 'Carboidrato Complexo', 'Balanceada']
    },
    {
      id: '3',
      name: 'Bowl de Quinoa com Proteínas',
      category: 'heavy',
      prepTime: '40 min',
      servings: 1,
      calories: 650,
      difficulty: 'hard',
      ingredients: [
        '100g quinoa',
        '150g frango desfiado',
        '1 ovo',
        'Abacate',
        'Castanhas',
        'Tomate cereja',
        'Rúcula',
        'Molho tahine'
      ],
      instructions: [
        'Cozinhe a quinoa conforme embalagem',
        'Desfie o frango e tempere',
        'Cozinhe o ovo (pode ser pochê)',
        'Corte o abacate e tomates',
        'Monte o bowl em camadas',
        'Finalize com castanhas e molho'
      ],
      nutritionalInfo: {
        protein: 45,
        carbs: 55,
        fats: 25,
        fiber: 12
      },
      tags: ['Alto Valor Proteico', 'Superfoods', 'Energia']
    }
  ];

  const categories = [
    {
      id: 'light' as const,
      name: 'Dieta Leve',
      description: 'Baixas calorias, foco em vegetais',
      color: 'text-diet-light',
      bgColor: 'bg-diet-light/10',
      icon: Leaf,
      maxCalories: 300
    },
    {
      id: 'moderate' as const,
      name: 'Dieta Moderada',
      description: 'Balanceada em macros',
      color: 'text-diet-moderate',
      bgColor: 'bg-diet-moderate/10',
      icon: Heart,
      maxCalories: 500
    },
    {
      id: 'heavy' as const,
      name: 'Dieta Pesada',
      description: 'Alta em calorias e proteínas',
      color: 'text-diet-heavy',
      bgColor: 'bg-diet-heavy/10',
      icon: Flame,
      maxCalories: 800
    }
  ];

  const filteredRecipes = recipes.filter(recipe => recipe.category === selectedCategory);

  const handleToggleFavorite = (recipeId: string) => {
    setFavoriteRecipes(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-success';
      case 'medium': return 'text-warning';
      case 'hard': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <UtensilsCrossed className="w-8 h-8 text-diet-light" />
          Dieta & Receitas
        </h1>
        <p className="text-muted-foreground">
          Receitas saudáveis para todos os objetivos
        </p>
      </div>

      {/* Category Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <Card
              key={category.id}
              className={cn(
                "cursor-pointer transition-all duration-200 hover-lift",
                isSelected && "ring-2 ring-primary"
              )}
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardContent className="p-6 text-center">
                <div className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
                  category.bgColor
                )}>
                  <Icon className={cn("w-8 h-8", category.color)} />
                </div>
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                <Badge variant="outline" className="text-xs">
                  Até {category.maxCalories} cal
                </Badge>
                {isSelected && (
                  <Badge className="mt-2 block">Selecionado</Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recipes List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          Receitas - {categories.find(c => c.id === selectedCategory)?.name}
        </h2>
        
        {filteredRecipes.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <ChefHat className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Nenhuma receita encontrada para esta categoria
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredRecipes.map((recipe) => {
              const isFavorite = favoriteRecipes.includes(recipe.id);
              
              return (
                <Card key={recipe.id} className="hover-lift">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <CardTitle className="flex items-center gap-2">
                          {recipe.name}
                          <button
                            onClick={() => handleToggleFavorite(recipe.id)}
                            className={cn(
                              "transition-colors",
                              isFavorite ? "text-warning" : "text-muted-foreground hover:text-warning"
                            )}
                          >
                            <Star className={cn("w-4 h-4", isFavorite && "fill-current")} />
                          </button>
                        </CardTitle>
                        <div className="flex flex-wrap gap-2">
                          {recipe.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {recipe.prepTime}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {recipe.servings} porção{recipe.servings > 1 ? 'ões' : ''}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Flame className="w-4 h-4" />
                          {recipe.calories} cal
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Nutritional Info */}
                    <div className="grid grid-cols-4 gap-2 p-3 bg-secondary/50 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm font-medium text-diet-light">{recipe.nutritionalInfo.protein}g</div>
                        <div className="text-xs text-muted-foreground">Proteína</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-diet-moderate">{recipe.nutritionalInfo.carbs}g</div>
                        <div className="text-xs text-muted-foreground">Carbos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-diet-heavy">{recipe.nutritionalInfo.fats}g</div>
                        <div className="text-xs text-muted-foreground">Gorduras</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-success">{recipe.nutritionalInfo.fiber}g</div>
                        <div className="text-xs text-muted-foreground">Fibras</div>
                      </div>
                    </div>

                    {/* Ingredients */}
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <ChefHat className="w-4 h-4" />
                        Ingredientes:
                      </h4>
                      <div className="grid grid-cols-1 gap-1">
                        {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
                          <div key={index} className="text-sm text-muted-foreground">
                            • {ingredient}
                          </div>
                        ))}
                        {recipe.ingredients.length > 4 && (
                          <div className="text-sm text-primary">
                            +{recipe.ingredients.length - 4} ingredientes...
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Difficulty and Action */}
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="outline" 
                        className={getDifficultyColor(recipe.difficulty)}
                      >
                        {recipe.difficulty === 'easy' && 'Fácil'}
                        {recipe.difficulty === 'medium' && 'Médio'}
                        {recipe.difficulty === 'hard' && 'Difícil'}
                      </Badge>
                      <Button size="sm">
                        Ver Receita Completa
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Nutrition Tips */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            Dicas Nutricionais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">• Beba pelo menos 2L de água por dia</p>
          <p className="text-sm">• Inclua proteínas em todas as refeições</p>
          <p className="text-sm">• Prefira carboidratos complexos</p>
          <p className="text-sm">• Consuma frutas e vegetais variados</p>
          <p className="text-sm">• Evite alimentos ultraprocessados</p>
          <p className="text-sm">• Faça refeições regulares de 3 em 3 horas</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DietaTab;