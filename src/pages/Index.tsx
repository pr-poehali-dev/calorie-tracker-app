import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  time: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

const Index = () => {
  const [waterGlasses, setWaterGlasses] = useState(5);
  const [meals, setMeals] = useState<Meal[]>([
    {
      id: '1',
      name: 'Овсянка с ягодами',
      calories: 320,
      protein: 12,
      carbs: 54,
      fats: 8,
      time: '08:30',
      type: 'breakfast'
    },
    {
      id: '2',
      name: 'Куриная грудка с рисом',
      calories: 520,
      protein: 45,
      carbs: 60,
      fats: 12,
      time: '13:00',
      type: 'lunch'
    },
    {
      id: '3',
      name: 'Греческий йогурт',
      calories: 150,
      protein: 15,
      carbs: 12,
      fats: 4,
      time: '16:00',
      type: 'snack'
    }
  ]);

  const dailyGoal = 2000;
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const caloriesPercent = Math.min((totalCalories / dailyGoal) * 100, 100);
  
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFats = meals.reduce((sum, meal) => sum + meal.fats, 0);

  const proteinGoal = 150;
  const carbsGoal = 250;
  const fatsGoal = 67;

  const waterGoal = 8;
  const waterPercent = (waterGlasses / waterGoal) * 100;

  const [newMeal, setNewMeal] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    type: 'breakfast' as Meal['type']
  });

  const addMeal = () => {
    if (!newMeal.name || !newMeal.calories) return;
    
    const meal: Meal = {
      id: Date.now().toString(),
      name: newMeal.name,
      calories: Number(newMeal.calories),
      protein: Number(newMeal.protein) || 0,
      carbs: Number(newMeal.carbs) || 0,
      fats: Number(newMeal.fats) || 0,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      type: newMeal.type
    };
    
    setMeals([...meals, meal]);
    setNewMeal({ name: '', calories: '', protein: '', carbs: '', fats: '', type: 'breakfast' });
  };

  const getMealIcon = (type: Meal['type']) => {
    switch(type) {
      case 'breakfast': return 'Coffee';
      case 'lunch': return 'UtensilsCrossed';
      case 'dinner': return 'Pizza';
      case 'snack': return 'Apple';
    }
  };

  const getMealLabel = (type: Meal['type']) => {
    switch(type) {
      case 'breakfast': return 'Завтрак';
      case 'lunch': return 'Обед';
      case 'dinner': return 'Ужин';
      case 'snack': return 'Перекус';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: 'url(https://cdn.poehali.dev/files/9442ec9b-68f3-4c3f-bd5e-a5f6fb61673b.jpg)' }}
      />
      <div className="container max-w-6xl mx-auto px-4 py-8 relative z-10">
        <header className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-2">
            Я УмниЦа
          </h1>
          <p className="text-muted-foreground text-lg">Твой путь к здоровому питанию</p>
        </header>

        <Tabs defaultValue="home" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-14 bg-white/80 backdrop-blur-sm shadow-lg">
            <TabsTrigger value="home" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <Icon name="Home" className="mr-2" size={18} />
              Главная
            </TabsTrigger>
            <TabsTrigger value="diary" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <Icon name="BookOpen" className="mr-2" size={18} />
              Дневник
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <Icon name="BarChart3" className="mr-2" size={18} />
              Статистика
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <Icon name="User" className="mr-2" size={18} />
              Профиль
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl border-0">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Калории сегодня</h2>
                  <p className="text-purple-100">Осталось {dailyGoal - totalCalories} ккал</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">{totalCalories}</div>
                  <div className="text-purple-100">из {dailyGoal} ккал</div>
                </div>
              </div>
              <Progress value={caloriesPercent} className="h-3 bg-white/20" />
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Icon name="Droplet" className="text-blue-500" size={24} />
                    Водный баланс
                  </h3>
                  <span className="text-2xl font-bold text-blue-500">{waterGlasses}/{waterGoal}</span>
                </div>
                <Progress value={waterPercent} className="h-3 mb-4" />
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setWaterGlasses(Math.max(0, waterGlasses - 1))}
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                  >
                    <Icon name="Minus" size={16} />
                  </Button>
                  <Button 
                    onClick={() => setWaterGlasses(Math.min(waterGoal, waterGlasses + 1))}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                    size="sm"
                  >
                    <Icon name="Plus" size={16} className="mr-1" />
                    Стакан воды
                  </Button>
                </div>
              </Card>

              <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Target" className="text-orange-500" size={24} />
                  БЖУ сегодня
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                        Белки
                      </span>
                      <span className="font-semibold">{totalProtein}г / {proteinGoal}г</span>
                    </div>
                    <Progress value={(totalProtein / proteinGoal) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500"></div>
                        Углеводы
                      </span>
                      <span className="font-semibold">{totalCarbs}г / {carbsGoal}г</span>
                    </div>
                    <Progress value={(totalCarbs / carbsGoal) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                        Жиры
                      </span>
                      <span className="font-semibold">{totalFats}г / {fatsGoal}г</span>
                    </div>
                    <Progress value={(totalFats / fatsGoal) * 100} className="h-2" />
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Последние приёмы пищи</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      <Icon name="Plus" size={18} className="mr-2" />
                      Добавить
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Добавить приём пищи</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Название</Label>
                        <Input 
                          id="name" 
                          placeholder="Например: Греческий салат"
                          value={newMeal.name}
                          onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="calories">Калории</Label>
                          <Input 
                            id="calories" 
                            type="number" 
                            placeholder="320"
                            value={newMeal.calories}
                            onChange={(e) => setNewMeal({...newMeal, calories: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="type">Тип</Label>
                          <select 
                            id="type"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={newMeal.type}
                            onChange={(e) => setNewMeal({...newMeal, type: e.target.value as Meal['type']})}
                          >
                            <option value="breakfast">Завтрак</option>
                            <option value="lunch">Обед</option>
                            <option value="dinner">Ужин</option>
                            <option value="snack">Перекус</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="protein">Белки (г)</Label>
                          <Input 
                            id="protein" 
                            type="number" 
                            placeholder="12"
                            value={newMeal.protein}
                            onChange={(e) => setNewMeal({...newMeal, protein: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="carbs">Углев. (г)</Label>
                          <Input 
                            id="carbs" 
                            type="number" 
                            placeholder="54"
                            value={newMeal.carbs}
                            onChange={(e) => setNewMeal({...newMeal, carbs: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="fats">Жиры (г)</Label>
                          <Input 
                            id="fats" 
                            type="number" 
                            placeholder="8"
                            value={newMeal.fats}
                            onChange={(e) => setNewMeal({...newMeal, fats: e.target.value})}
                          />
                        </div>
                      </div>
                      <Button 
                        onClick={addMeal} 
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        Добавить
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="space-y-3">
                {meals.slice(-3).reverse().map((meal) => (
                  <Card key={meal.id} className="p-4 bg-gradient-to-r from-white to-purple-50 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                          <Icon name={getMealIcon(meal.type)} size={24} />
                        </div>
                        <div>
                          <div className="font-semibold text-lg">{meal.name}</div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="secondary" className="text-xs">{getMealLabel(meal.type)}</Badge>
                            <span>{meal.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {meal.calories}
                        </div>
                        <div className="text-xs text-muted-foreground">ккал</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="diary" className="animate-fade-in">
            <Card className="p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Дневник питания</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      <Icon name="Plus" size={18} className="mr-2" />
                      Добавить приём пищи
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Добавить приём пищи</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name2">Название</Label>
                        <Input 
                          id="name2" 
                          placeholder="Например: Греческий салат"
                          value={newMeal.name}
                          onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="calories2">Калории</Label>
                          <Input 
                            id="calories2" 
                            type="number" 
                            placeholder="320"
                            value={newMeal.calories}
                            onChange={(e) => setNewMeal({...newMeal, calories: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="type2">Тип</Label>
                          <select 
                            id="type2"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={newMeal.type}
                            onChange={(e) => setNewMeal({...newMeal, type: e.target.value as Meal['type']})}
                          >
                            <option value="breakfast">Завтрак</option>
                            <option value="lunch">Обед</option>
                            <option value="dinner">Ужин</option>
                            <option value="snack">Перекус</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="protein2">Белки (г)</Label>
                          <Input 
                            id="protein2" 
                            type="number" 
                            placeholder="12"
                            value={newMeal.protein}
                            onChange={(e) => setNewMeal({...newMeal, protein: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="carbs2">Углев. (г)</Label>
                          <Input 
                            id="carbs2" 
                            type="number" 
                            placeholder="54"
                            value={newMeal.carbs}
                            onChange={(e) => setNewMeal({...newMeal, carbs: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="fats2">Жиры (г)</Label>
                          <Input 
                            id="fats2" 
                            type="number" 
                            placeholder="8"
                            value={newMeal.fats}
                            onChange={(e) => setNewMeal({...newMeal, fats: e.target.value})}
                          />
                        </div>
                      </div>
                      <Button 
                        onClick={addMeal} 
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        Добавить
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="space-y-4">
                {['breakfast', 'lunch', 'dinner', 'snack'].map((type) => {
                  const typedMeals = meals.filter(m => m.type === type);
                  if (typedMeals.length === 0) return null;
                  
                  return (
                    <div key={type} className="space-y-3">
                      <h4 className="font-bold text-lg flex items-center gap-2">
                        <Icon name={getMealIcon(type as Meal['type'])} size={20} />
                        {getMealLabel(type as Meal['type'])}
                      </h4>
                      {typedMeals.map((meal) => (
                        <Card key={meal.id} className="p-4 bg-gradient-to-r from-white to-purple-50 hover:shadow-md transition-all">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-lg">{meal.name}</div>
                              <div className="text-sm text-muted-foreground mt-1">
                                Б: {meal.protein}г • У: {meal.carbs}г • Ж: {meal.fats}г • {meal.time}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                {meal.calories}
                              </div>
                              <div className="text-xs text-muted-foreground">ккал</div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Icon name="Flame" size={32} className="text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{totalCalories}</div>
                    <div className="text-sm text-muted-foreground">Калории сегодня</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Icon name="Droplets" size={32} className="text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{waterGlasses}</div>
                    <div className="text-sm text-muted-foreground">Стаканов воды</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                    <Icon name="UtensilsCrossed" size={32} className="text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{meals.length}</div>
                    <div className="text-sm text-muted-foreground">Приёмов пищи</div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Распределение БЖУ</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Белки</span>
                    <span className="text-2xl font-bold text-purple-600">{totalProtein}г</span>
                  </div>
                  <div className="relative">
                    <Progress value={(totalProtein / proteinGoal) * 100} className="h-4" />
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                      {Math.round((totalProtein / proteinGoal) * 100)}%
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Цель: {proteinGoal}г</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Углеводы</span>
                    <span className="text-2xl font-bold text-orange-600">{totalCarbs}г</span>
                  </div>
                  <div className="relative">
                    <Progress value={(totalCarbs / carbsGoal) * 100} className="h-4" />
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                      {Math.round((totalCarbs / carbsGoal) * 100)}%
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Цель: {carbsGoal}г</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Жиры</span>
                    <span className="text-2xl font-bold text-blue-600">{totalFats}г</span>
                  </div>
                  <div className="relative">
                    <Progress value={(totalFats / fatsGoal) * 100} className="h-4" />
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                      {Math.round((totalFats / fatsGoal) * 100)}%
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Цель: {fatsGoal}г</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Калорийность по приёмам пищи</h3>
              <div className="space-y-4">
                {['breakfast', 'lunch', 'dinner', 'snack'].map((type) => {
                  const typedMeals = meals.filter(m => m.type === type);
                  const typeCalories = typedMeals.reduce((sum, m) => sum + m.calories, 0);
                  const percent = totalCalories > 0 ? (typeCalories / totalCalories) * 100 : 0;
                  
                  return (
                    <div key={type}>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold flex items-center gap-2">
                          <Icon name={getMealIcon(type as Meal['type'])} size={18} />
                          {getMealLabel(type as Meal['type'])}
                        </span>
                        <span className="font-bold">{typeCalories} ккал</span>
                      </div>
                      <div className="relative">
                        <Progress value={percent} className="h-3" />
                        <div className="absolute inset-0 flex items-center pl-2 text-xs font-semibold text-white">
                          {Math.round(percent)}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6 animate-fade-in">
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold">
                  А
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Александра</h2>
                  <p className="text-muted-foreground">Активный пользователь</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Цели</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">Калории в день</span>
                      <span className="font-bold">{dailyGoal} ккал</span>
                    </div>
                    <div className="flex justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">Белки</span>
                      <span className="font-bold">{proteinGoal}г</span>
                    </div>
                    <div className="flex justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">Углеводы</span>
                      <span className="font-bold">{carbsGoal}г</span>
                    </div>
                    <div className="flex justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">Жиры</span>
                      <span className="font-bold">{fatsGoal}г</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Достижения</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Card className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white text-center">
                      <Icon name="Trophy" size={32} className="mx-auto mb-2" />
                      <div className="text-2xl font-bold">7</div>
                      <div className="text-xs">дней подряд</div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-br from-orange-500 to-yellow-500 text-white text-center">
                      <Icon name="Target" size={32} className="mx-auto mb-2" />
                      <div className="text-2xl font-bold">15</div>
                      <div className="text-xs">целей достигнуто</div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-center">
                      <Icon name="Zap" size={32} className="mx-auto mb-2" />
                      <div className="text-2xl font-bold">42</div>
                      <div className="text-xs">дня активности</div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 text-white text-center">
                      <Icon name="Award" size={32} className="mx-auto mb-2" />
                      <div className="text-2xl font-bold">5</div>
                      <div className="text-xs">значков получено</div>
                    </Card>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;