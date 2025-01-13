import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


const NAVIGATION = [
    { type: 'title', title: 'Home', roles: ['Administrador', 'Inspector', 'Farmaceutico'] },
    {
      segment: 'dashboard',
      title: 'Inicio',
      icon: <DashboardIcon />,
      roles: ['Administrador', 'Inspector', 'Farmaceutico'],
    },
    { type: 'divider', roles: ['Administrador', 'Inspector', 'Farmaceutico'] },
    { type: 'title', title: 'Gestión', roles: ['Administrador', 'Inspector', 'Farmaceutico'] },
    {
      segment: 'solicitudes',
      title: 'Solicitudes',
      icon: <ShoppingCartIcon />,
      roles: ['Administrador', 'Farmaceutico'],
      children: [
        {
          segment: 'revisar-solicitudes',
          title: 'Revisar solicitudes',
          icon: <ReceiptIcon />,
          roles: ['Administrador'],
        },
        {
          segment: 'crear-solicitudes',
          title: 'Crear solicitudes',
          icon: <ReceiptIcon />,
          roles: ['Farmaceutico'],
        },
        {
          segment: 'consultar-estado',
          title: 'Consultar estado',
          icon: <ReceiptIcon />,
          roles: ['Farmaceutico'],
        },
      ],
    },
    {
        segment: 'inspecciones',
        title: 'Inspecciones',
        icon: <BarChartIcon />,
        roles: ['Administrador', 'Inspector'],
        children: [
          { segment: 'ver-asignadas', title: 'Ver asignadas', icon: <TrendingUpIcon />, roles: ['Inspector']},
          { segment: 'programar-inspecciones', title: 'Programar inspecciones', icon: <TrendingUpIcon />, roles: ['Administrador'], },
          { segment: 'completar-inspecciones', title: 'Completar inspecciones', icon: <TrendingUpIcon />, roles: ['Inspector'],  },
        ],
      },
    {
      segment: 'usuarios',
      title: 'Usuarios',
      icon: <PersonIcon />,
      roles: ['Administrador'],
      children: [
        {
          segment: 'ver-usuarios',
          title: 'Ver usuarios',
          icon: <SettingsIcon />,
          roles: ['Administrador'],
          
        },
        {
          segment: 'crear-usuario',
          title: 'Crear usuario',
          icon: <PersonAddIcon />,
          roles: ['Administrador'],
        },
      ],
    },
  ];
  
  export default NAVIGATION;
