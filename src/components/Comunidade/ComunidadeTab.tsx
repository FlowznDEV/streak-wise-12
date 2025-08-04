import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Share2, 
  Trophy, 
  Clock, 
  Send,
  Image,
  Smile,
  MoreHorizontal,
  Flame,
  Target,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    plan: 'basic' | 'average' | 'body';
    streak: number;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  category: 'progresso' | 'motivacao' | 'dica' | 'pergunta';
}

interface ComunidadeTabProps {
  userPlan: 'basic' | 'average' | 'body';
  userName: string;
}

const ComunidadeTab = ({ userPlan, userName }: ComunidadeTabProps) => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: {
        name: 'Ana Silva',
        avatar: '/api/placeholder/40/40',
        plan: 'body',
        streak: 45
      },
      content: 'Completei minha primeira série de 30 dias! 🎉 A transformação foi incrível, tanto física quanto mental. Obrigada pela motivação de vocês!',
      timestamp: '2 horas atrás',
      likes: 24,
      comments: 8,
      isLiked: false,
      category: 'progresso'
    },
    {
      id: '2',
      author: {
        name: 'Carlos Santos',
        avatar: '/api/placeholder/40/40',
        plan: 'average',
        streak: 12
      },
      content: 'Dica para iniciantes: comecem devagar! Eu estava forçando muito no início e acabei me lesionando. Agora foco na consistência.',
      timestamp: '5 horas atrás',
      likes: 18,
      comments: 5,
      isLiked: true,
      category: 'dica'
    },
    {
      id: '3',
      author: {
        name: 'Maria João',
        avatar: '/api/placeholder/40/40',
        plan: 'basic',
        streak: 8
      },
      content: 'Alguém tem dicas para manter a motivação nos dias difíceis? Hoje foi bem complicado sair da cama para treinar...',
      timestamp: '1 dia atrás',
      likes: 32,
      comments: 15,
      isLiked: false,
      category: 'pergunta'
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Post['category']>('motivacao');

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      author: {
        name: userName,
        avatar: '/api/placeholder/40/40',
        plan: userPlan,
        streak: 7 // Mock streak
      },
      content: newPost,
      timestamp: 'agora',
      likes: 0,
      comments: 0,
      isLiked: false,
      category: selectedCategory
    };

    setPosts(prev => [post, ...prev]);
    setNewPost('');
  };

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'basic': return { label: 'Basic', color: 'bg-treino-basic' };
      case 'average': return { label: 'Average', color: 'bg-treino-medium' };
      case 'body': return { label: 'Body', color: 'bg-treino-body' };
      default: return { label: 'Basic', color: 'bg-treino-basic' };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'progresso': return Trophy;
      case 'motivacao': return Flame;
      case 'dica': return Target;
      case 'pergunta': return MessageSquare;
      default: return MessageSquare;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'progresso': return 'text-success';
      case 'motivacao': return 'text-destructive';
      case 'dica': return 'text-warning';
      case 'pergunta': return 'text-info';
      default: return 'text-muted-foreground';
    }
  };

  const categories = [
    { id: 'motivacao', label: 'Motivação', icon: Flame },
    { id: 'progresso', label: 'Progresso', icon: Trophy },
    { id: 'dica', label: 'Dicas', icon: Target },
    { id: 'pergunta', label: 'Perguntas', icon: MessageSquare }
  ];

  if (userPlan === 'basic') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center animate-fade-in">
        <Card className="text-center max-w-md">
          <CardContent className="p-8">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Comunidade Bloqueada</h2>
            <p className="text-muted-foreground mb-6">
              Faça upgrade para o plano Average ou Body Builder para acessar nossa comunidade vibrante!
            </p>
            <Button>Ver Planos</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users className="w-8 h-8 text-info" />
          Comunidade
        </h1>
        <p className="text-muted-foreground">
          Conecte-se, compartilhe e motive outros membros da família TreineAI
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-info mx-auto mb-2" />
            <div className="text-2xl font-bold">2,847</div>
            <div className="text-sm text-muted-foreground">Membros Ativos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <MessageSquare className="w-8 h-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold">156</div>
            <div className="text-sm text-muted-foreground">Posts Hoje</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Flame className="w-8 h-8 text-destructive mx-auto mb-2" />
            <div className="text-2xl font-bold">92%</div>
            <div className="text-sm text-muted-foreground">Meta Diária</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="w-8 h-8 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold">1,432</div>
            <div className="text-sm text-muted-foreground">Metas Concluídas</div>
          </CardContent>
        </Card>
      </div>

      {/* Create Post */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Compartilhar com a Comunidade
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Category Selection */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as Post['category'])}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                    isSelected 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary hover:bg-secondary/80"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              );
            })}
          </div>

          <Textarea
            placeholder="Compartilhe sua experiência, dúvida ou motivação..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            rows={3}
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Image className="w-4 h-4 mr-2" />
                Foto
              </Button>
              <Button variant="outline" size="sm">
                <Smile className="w-4 h-4 mr-2" />
                Emoji
              </Button>
            </div>
            <Button onClick={handleCreatePost} disabled={!newPost.trim()}>
              <Send className="w-4 h-4 mr-2" />
              Publicar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => {
          const planBadge = getPlanBadge(post.author.plan);
          const CategoryIcon = getCategoryIcon(post.category);
          
          return (
            <Card key={post.id} className="hover-lift">
              <CardContent className="p-6">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>
                        {post.author.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{post.author.name}</span>
                        <Badge className={planBadge.color} variant="secondary">
                          {planBadge.label}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Zap className="w-3 h-3" />
                          {post.author.streak} dias
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CategoryIcon className={cn("w-4 h-4", getCategoryColor(post.category))} />
                        <span className="capitalize">{post.category}</span>
                        <span>•</span>
                        <Clock className="w-3 h-3" />
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>

                {/* Post Content */}
                <div className="space-y-4">
                  <p className="text-foreground leading-relaxed">{post.content}</p>

                  {post.image && (
                    <div className="rounded-lg overflow-hidden">
                      <img 
                        src={post.image} 
                        alt="Post image" 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={cn(
                        "flex items-center gap-2 text-sm transition-colors",
                        post.isLiked 
                          ? "text-destructive" 
                          : "text-muted-foreground hover:text-destructive"
                      )}
                    >
                      <Heart className={cn(
                        "w-4 h-4",
                        post.isLiked && "fill-current"
                      )} />
                      <span>{post.likes}</span>
                    </button>
                    
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </button>
                  </div>

                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>Compartilhar</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">
          Carregar mais posts
        </Button>
      </div>
    </div>
  );
};

export default ComunidadeTab;