"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  Users, 
  CheckCircle, 
  XCircle, 
  Download,
  Home,
  UserPlus
} from "lucide-react";
import { Guest, AdminStats } from "@/types";

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Fetch stats
      const statsRes = await fetch('/api/stats');
      const statsData = await statsRes.json();
      setStats(statsData.stats);
      
      // Fetch guests
      const guestsRes = await fetch('/api/guests');
      const guestsData = await guestsRes.json();
      setGuests(guestsData.guests);
      
      // Family groups are now included in stats, no need to store separately
      const familyGuestsGroups = guestsData.guests
        .filter((g: Guest) => g.familyGroupId)
        .reduce((acc: Record<string, Guest[]>, guest: Guest) => {
          if (!acc[guest.familyGroupId!]) {
            acc[guest.familyGroupId!] = [];
          }
          acc[guest.familyGroupId!].push(guest);
          return acc;
        }, {});
      
      // Store for potential future use
      console.log('Family groups:', Object.values(familyGuestsGroups).length);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Nombre', 'Email', 'Teléfono', 'Asistencia', 'Menú', 'Alergias', 'Fecha'];
    const rows = guests.map(guest => [
      guest.name,
      guest.email,
      guest.phone || '',
      guest.isAttending ? 'Sí' : 'No',
      guest.menuPreference,
      guest.allergies || '',
      new Date(guest.createdAt).toLocaleDateString()
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invitados-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-12 h-12 mx-auto mb-4 text-pink-500 animate-pulse" />
          <p className="text-gray-600">Cargando panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-500 flex-shrink-0" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-light text-gray-800">Panel de Administración</h1>
              <p className="text-sm sm:text-base text-gray-600">Ana & Carlos - 15 de Junio, 2025</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <Link href="/" className="flex-1 sm:flex-initial">
              <Button variant="outline" size="sm" className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Ir al sitio
              </Button>
            </Link>
            <Button onClick={exportToCSV} variant="outline" size="sm" className="flex-1 sm:flex-initial">
              <Download className="w-4 h-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">Total Invitados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-bold text-gray-800">{stats?.totalInvited || 0}</div>
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">Confirmados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-bold text-green-600">{stats?.totalConfirmed || 0}</div>
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">No Asisten</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-bold text-red-600">{stats?.totalDeclined || 0}</div>
                <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">Total Personas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600">{stats?.totalGuests || 0}</div>
                <UserPlus className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 flex-shrink-0" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Incluyendo familias</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">Resumen</TabsTrigger>
            <TabsTrigger value="guests" className="text-xs sm:text-sm">Invitados</TabsTrigger>
            <TabsTrigger value="menus" className="text-xs sm:text-sm">Menús</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Menu Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Distribución de Menús</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tradicional</span>
                    <Badge variant="outline">{stats?.menuBreakdown.traditional || 0}</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Vegetariano</span>
                    <Badge variant="outline">{stats?.menuBreakdown.vegetarian || 0}</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Sin Gluten</span>
                    <Badge variant="outline">{stats?.menuBreakdown["gluten-free"] || 0}</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Alérgico (personalizado)</span>
                    <Badge variant="outline">{stats?.menuBreakdown["allergic-custom"] || 0}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Family Groups */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Grupos Familiares</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total de Grupos</span>
                      <div className="text-2xl font-bold text-gray-800">{stats?.familyGroups || 0}</div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Pendientes de Respuesta</span>
                      <div className="text-2xl font-bold text-orange-600">{stats?.pending || 0}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Confirmations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Últimas Confirmaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {guests.slice(0, 5).map((guest) => (
                    <div key={guest.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium text-gray-800">{guest.name}</p>
                        <p className="text-sm text-gray-500">{guest.email}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={guest.isAttending ? "default" : "secondary"}>
                          {guest.isAttending ? "Asiste" : "No asiste"}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(guest.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {guests.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No hay confirmaciones aún</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guests Tab */}
          <TabsContent value="guests">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Lista de Invitados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Teléfono</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Menú</TableHead>
                        <TableHead>Fecha</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {guests.map((guest) => (
                        <TableRow key={guest.id}>
                          <TableCell className="font-medium">{guest.name}</TableCell>
                          <TableCell>{guest.email}</TableCell>
                          <TableCell>{guest.phone || '-'}</TableCell>
                          <TableCell>
                            <Badge variant={guest.isAttending ? "default" : "secondary"}>
                              {guest.isAttending ? "Asiste" : "No asiste"}
                            </Badge>
                          </TableCell>
                          <TableCell className="capitalize">
                            {guest.menuPreference.replace('-', ' ')}
                          </TableCell>
                          <TableCell className="text-sm text-gray-500">
                            {new Date(guest.createdAt).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                      {guests.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                            No hay invitados registrados
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Menus Tab */}
          <TabsContent value="menus">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Preferencias de Menú Detalladas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Traditional */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-800">Menú Tradicional</h3>
                      <Badge className="bg-blue-500">{stats?.menuBreakdown.traditional || 0} personas</Badge>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ 
                          width: `${((stats?.menuBreakdown.traditional || 0) / (stats?.totalGuests || 1)) * 100}%` 
                        }}
                      />
                    </div>
                  </div>

                  {/* Vegetarian */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-800">Vegetariano</h3>
                      <Badge className="bg-green-500">{stats?.menuBreakdown.vegetarian || 0} personas</Badge>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500" 
                        style={{ 
                          width: `${((stats?.menuBreakdown.vegetarian || 0) / (stats?.totalGuests || 1)) * 100}%` 
                        }}
                      />
                    </div>
                  </div>

                  {/* Gluten Free */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-800">Sin Gluten</h3>
                      <Badge className="bg-yellow-500">{stats?.menuBreakdown["gluten-free"] || 0} personas</Badge>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-500" 
                        style={{ 
                          width: `${((stats?.menuBreakdown["gluten-free"] || 0) / (stats?.totalGuests || 1)) * 100}%` 
                        }}
                      />
                    </div>
                  </div>

                  {/* Allergic Custom */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-800">Alérgico (personalizado)</h3>
                      <Badge className="bg-red-500">{stats?.menuBreakdown["allergic-custom"] || 0} personas</Badge>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500" 
                        style={{ 
                          width: `${((stats?.menuBreakdown["allergic-custom"] || 0) / (stats?.totalGuests || 1)) * 100}%` 
                        }}
                      />
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Guests with allergies */}
                  <div>
                    <h3 className="font-medium text-gray-800 mb-4">Invitados con Alergias Específicas</h3>
                    <div className="space-y-3">
                      {guests
                        .filter(g => g.allergies && g.allergies.trim() !== '')
                        .map(guest => (
                          <div key={guest.id} className="p-3 bg-red-50 rounded-lg border border-red-200">
                            <p className="font-medium text-gray-800">{guest.name}</p>
                            <p className="text-sm text-gray-600 mt-1">{guest.allergies}</p>
                          </div>
                        ))}
                      {guests.filter(g => g.allergies && g.allergies.trim() !== '').length === 0 && (
                        <p className="text-center text-gray-500 py-4">No hay invitados con alergias registradas</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
