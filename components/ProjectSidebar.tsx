'use client';

import React from 'react';
import { ShoppingCart, FileText, BarChart3, Gem, CreditCard, Users, Calculator, Scale, Sparkles, History, User } from 'lucide-react';
import Card from './Card';

export interface Feature {
  icon: React.ReactNode;
  label: string;
  description: string;
}

interface ProjectSidebarProps {
  className?: string;
  onFeatureClick: (feature: Feature | null) => void;
  selectedFeature: Feature | null;
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({ 
  className = '',
  onFeatureClick,
  selectedFeature
}) => {
  const features: Feature[] = [
    { 
      icon: <ShoppingCart size={20} />, 
      label: 'Punto de Venta', 
      description: 'Sistema completo de punto de venta que permite realizar ventas rápidas y eficientes. Incluye escaneo de productos, cálculo automático de totales, múltiples métodos de pago y generación de tickets de venta.' 
    },
    { 
      icon: <FileText size={20} />, 
      label: 'Pedidos', 
      description: 'Gestión completa de pedidos con seguimiento en tiempo real. Permite crear, editar y cancelar pedidos, así como asignar estados y fechas de entrega. Incluye notificaciones automáticas para cambios de estado.' 
    },
    { 
      icon: <BarChart3 size={20} />, 
      label: 'Gestión de Pedidos', 
      description: 'Panel de control avanzado para administrar todos los pedidos del sistema. Visualiza estadísticas, filtra por estado, fecha o cliente, y genera reportes detallados de ventas y pedidos pendientes.' 
    },
    { 
      icon: <Gem size={20} />, 
      label: 'Productos/Joyería', 
      description: 'Catálogo completo de productos especializado para joyerías. Incluye gestión de inventario, categorización por tipo de joya, metales y piedras preciosas. Permite agregar imágenes, especificaciones técnicas y precios diferenciados.' 
    },
    { 
      icon: <CreditCard size={20} />, 
      label: 'Gestión de apartados', 
      description: 'Sistema de apartados que permite a los clientes reservar productos con un pago inicial. Incluye seguimiento de pagos parciales, fechas límite, notificaciones de vencimiento y opciones de renovación o cancelación.' 
    },
    { 
      icon: <Users size={20} />, 
      label: 'Clientes', 
      description: 'Base de datos completa de clientes con historial de compras, preferencias y datos de contacto. Permite segmentación de clientes, programas de fidelización y comunicación directa a través del sistema.' 
    },
    { 
      icon: <Calculator size={20} />, 
      label: 'Corte de Caja', 
      description: 'Herramienta de corte de caja diario que calcula automáticamente los ingresos, egresos y diferencias. Genera reportes detallados por método de pago, turno y cajero. Incluye validación de efectivo y conciliación bancaria.' 
    },
    { 
      icon: <Scale size={20} />, 
      label: 'Tasas de Metal', 
      description: 'Sistema de gestión de tasas de metales preciosos actualizado en tiempo real. Permite configurar diferentes tasas para oro, plata, platino y otros metales. Calcula automáticamente el valor de productos basado en peso y pureza del metal.' 
    },
    { 
      icon: <Sparkles size={20} />, 
      label: 'Tasas Metal Pedidos', 
      description: 'Aplicación automática de tasas de metal a pedidos específicos. Permite calcular el valor de productos de joyería considerando el precio del metal al momento de la venta, garantizando precios justos y actualizados.' 
    },
    { 
      icon: <History size={20} />, 
      label: 'Historial', 
      description: 'Registro completo de todas las transacciones, movimientos de inventario y actividades del sistema. Permite consultar historial por fecha, cliente, producto o tipo de operación. Incluye exportación de datos para análisis externos.' 
    },
    { 
      icon: <User size={20} />, 
      label: 'Usuarios', 
      description: 'Gestión de usuarios del sistema con diferentes niveles de acceso y permisos. Permite crear roles personalizados, asignar permisos específicos por módulo y mantener un registro de actividades de cada usuario.' 
    },
  ];

  const handleFeatureClick = (feature: Feature) => {
    // Toggle: si ya está seleccionada, deseleccionar; si no, seleccionar
    if (selectedFeature?.label === feature.label) {
      onFeatureClick(null);
    } else {
      onFeatureClick(feature);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Project Title */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-3">
          Sistema de Punto de Venta (POS)
        </h2>
        <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
          Sistema Completo
        </div>
      </div>

      {/* Project Description */}
      <Card>
        <h3 className="text-xl font-bold text-dark mb-3">Descripción del Proyecto</h3>
        <p className="text-gray-600 leading-relaxed">
          Sistema integral de punto de venta diseñado específicamente para joyerías, 
          con gestión completa de productos, pedidos, apartados y control de inventario. 
          Incluye funcionalidades avanzadas como cálculo de tasas de metal, corte de caja 
          y gestión de clientes.
        </p>
      </Card>

      {/* Features List */}
      <Card>
        <h3 className="text-xl font-bold text-dark mb-4">Características Principales</h3>
        <div className="space-y-2">
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={() => handleFeatureClick(feature)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left cursor-pointer ${
                selectedFeature?.label === feature.label
                  ? 'bg-primary text-white'
                  : 'hover:bg-light text-gray-700'
              }`}
            >
              <div className={`flex-shrink-0 ${
                selectedFeature?.label === feature.label ? 'text-white' : 'text-primary'
              }`}>
                {feature.icon}
              </div>
              <span className={`font-medium flex-1 ${
                selectedFeature?.label === feature.label ? 'text-white' : 'text-gray-700'
              }`}>
                {feature.label}
              </span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProjectSidebar;
