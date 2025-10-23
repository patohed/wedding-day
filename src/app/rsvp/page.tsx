"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, ArrowLeft, Plus, Minus } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  isAttending: z.boolean(),
  menuPreference: z.enum(["traditional", "vegetarian", "gluten-free", "allergic-custom"]),
  allergies: z.string().optional(),
  hasFamily: z.boolean(),
  spouse: z.object({
    name: z.string().optional(),
    menuPreference: z.enum(["traditional", "vegetarian", "gluten-free", "allergic-custom"]).optional(),
    allergies: z.string().optional(),
  }).optional(),
  children: z.array(z.object({
    name: z.string(),
    age: z.number().min(0).max(18),
    menuPreference: z.enum(["traditional", "vegetarian", "gluten-free", "allergic-custom"]),
    allergies: z.string().optional(),
  })),
});

type FormData = z.infer<typeof formSchema>;

const menuOptions = [
  { value: "traditional", label: "Menú Tradicional" },
  { value: "vegetarian", label: "Vegetariano" },
  { value: "gluten-free", label: "Sin Gluten" },
  { value: "allergic-custom", label: "Alérgico (personalizado)" },
];

export default function RSVPPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      isAttending: true,
      menuPreference: "traditional",
      allergies: "",
      hasFamily: false,
      spouse: undefined,
      children: [],
    },
  });

  const { watch, setValue, getValues } = form;
  const watchHasFamily = watch("hasFamily");
  const watchIsAttending = watch("isAttending");
  const watchChildren = watch("children");

  const addChild = () => {
    const currentChildren = getValues("children");
    setValue("children", [...currentChildren, {
      name: "",
      age: 0,
      menuPreference: "traditional",
      allergies: "",
    }]);
  };

  const removeChild = (index: number) => {
    const currentChildren = getValues("children");
    setValue("children", currentChildren.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al enviar confirmación');
      }
      
      const result = await response.json();
      console.log('RSVP enviado exitosamente:', result);
      
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert('Hubo un error al enviar tu confirmación. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <Heart className="w-16 h-16 mx-auto mb-6 text-pink-500" />
            <h1 className="text-2xl font-light mb-4 text-gray-800">
              ¡Gracias por confirmar!
            </h1>
            <p className="text-gray-600 mb-6">
              Hemos recibido tu confirmación. Te esperamos en nuestro día especial.
            </p>
            <Link href="/">
              <Button className="bg-rose-500 hover:bg-rose-600 text-white">
                Volver al inicio
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Link>
            <Heart className="w-12 h-12 mx-auto mb-4 text-pink-500" />
            <h1 className="text-4xl font-light mb-2 text-gray-800">
              Confirma tu Asistencia
            </h1>
            <p className="text-gray-600">
              Ana & Carlos - 15 de Junio, 2025
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-light">Información del Invitado</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input
                      id="name"
                      {...form.register("name")}
                      placeholder="Tu nombre completo"
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      placeholder="tu@email.com"
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono (opcional)</Label>
                  <Input
                    id="phone"
                    {...form.register("phone")}
                    placeholder="+54 11 1234-5678"
                  />
                </div>

                {/* Attendance */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">¿Asistirás a la boda?</Label>
                  <div className="flex space-x-4">
                    <Label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        {...form.register("isAttending")}
                        value="true"
                        className="w-4 h-4 text-rose-500"
                      />
                      <span>Sí, asistiré</span>
                    </Label>
                    <Label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        {...form.register("isAttending")}
                        value="false"
                        className="w-4 h-4 text-rose-500"
                      />
                      <span>No podré asistir</span>
                    </Label>
                  </div>
                </div>

                {watchIsAttending && (
                  <>
                    {/* Menu Preference */}
                    <div className="space-y-2">
                      <Label>Preferencia de menú *</Label>
                      <Select
                        value={watch("menuPreference")}
                        onValueChange={(value) => setValue("menuPreference", value as "traditional" | "vegetarian" | "gluten-free" | "allergic-custom")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu menú" />
                        </SelectTrigger>
                        <SelectContent>
                          {menuOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Allergies */}
                    <div className="space-y-2">
                      <Label htmlFor="allergies">Alergias o restricciones alimentarias</Label>
                      <Textarea
                        id="allergies"
                        {...form.register("allergies")}
                        placeholder="Describe cualquier alergia o restricción alimentaria..."
                        rows={3}
                      />
                    </div>

                    {/* Family Group */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hasFamily"
                          checked={watchHasFamily}
                          onCheckedChange={(checked) => setValue("hasFamily", !!checked)}
                        />
                        <Label htmlFor="hasFamily" className="text-base font-medium">
                          Vengo con familia (cónyuge e hijos)
                        </Label>
                      </div>

                      {watchHasFamily && (
                        <div className="pl-6 space-y-6 border-l-2 border-rose-200">
                          {/* Spouse */}
                          <div className="space-y-4">
                            <h3 className="font-medium text-gray-800">Cónyuge</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Nombre del cónyuge</Label>
                                <Input
                                  {...form.register("spouse.name")}
                                  placeholder="Nombre del cónyuge"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Menú del cónyuge</Label>
                                <Select
                                  value={watch("spouse.menuPreference")}
                                  onValueChange={(value) => setValue("spouse.menuPreference", value as "traditional" | "vegetarian" | "gluten-free" | "allergic-custom")}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar menú" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {menuOptions.map((option) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Alergias del cónyuge</Label>
                              <Textarea
                                {...form.register("spouse.allergies")}
                                placeholder="Alergias o restricciones..."
                                rows={2}
                              />
                            </div>
                          </div>

                          {/* Children */}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-gray-800">Hijos</h3>
                              <Button
                                type="button"
                                onClick={addChild}
                                variant="outline"
                                size="sm"
                                className="text-rose-500 border-rose-500 hover:bg-rose-50"
                              >
                                <Plus className="w-4 h-4 mr-1" />
                                Agregar hijo
                              </Button>
                            </div>

                            {watchChildren.map((_, index) => (
                              <div key={index} className="p-4 border rounded-lg bg-gray-50 space-y-4">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-gray-700">Hijo {index + 1}</h4>
                                  <Button
                                    type="button"
                                    onClick={() => removeChild(index)}
                                    variant="outline"
                                    size="sm"
                                    className="text-red-500 border-red-500 hover:bg-red-50"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                  <div className="space-y-2">
                                    <Label>Nombre</Label>
                                    <Input
                                      {...form.register(`children.${index}.name`)}
                                      placeholder="Nombre del hijo"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Edad</Label>
                                    <Input
                                      type="number"
                                      {...form.register(`children.${index}.age`, { valueAsNumber: true })}
                                      placeholder="Edad"
                                      min="0"
                                      max="18"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Menú</Label>
                                    <Select
                                      value={watch(`children.${index}.menuPreference`)}
                                      onValueChange={(value) => setValue(`children.${index}.menuPreference`, value as "traditional" | "vegetarian" | "gluten-free" | "allergic-custom")}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Menú" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {menuOptions.map((option) => (
                                          <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label>Alergias</Label>
                                  <Textarea
                                    {...form.register(`children.${index}.allergies`)}
                                    placeholder="Alergias o restricciones..."
                                    rows={2}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white py-6 text-lg"
                  >
                    {isSubmitting ? "Enviando..." : "Confirmar Asistencia"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
