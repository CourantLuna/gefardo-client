import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StoreIcon from '@mui/icons-material/Store';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EventIcon from '@mui/icons-material/Event';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderIcon from '@mui/icons-material/Folder';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import HttpsIcon from '@mui/icons-material/Https';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import SettingsIcon from '@mui/icons-material/Settings';

const NAVIGATION = [
    { type: 'title', title: 'Home', roles: ['Administrador', 'Inspector', 'Farmaceutico'] },
    {
      segment: 'dashboard',
      title: 'Inicio',
      icon: <HomeIcon />,
      roles: ['Administrador', 'Inspector', 'Farmaceutico'],
    },
    { type: 'divider', roles: ['Administrador', 'Inspector', 'Farmaceutico'] },
    { type: 'title', title: 'Gestión', roles: ['Administrador', 'Inspector', 'Farmaceutico'] },
    {
      segment: 'servicios',
      title: 'Servicios',
      icon: <WorkIcon />,
      roles: ['Administrador', 'Farmaceutico'],
      children: [
        {
          segment: 'revisar-solicitudes',
          title: 'Revisar solicitudes',
          icon: <AssignmentIcon />,
          roles: ['Administrador'],
        },
        {
          segment: 'gestionar-servicios',
          title: 'Gestionar servicios',
          icon: <SettingsIcon />,
          roles: ['Administrador'],
        },
        
        {
          segment: 'nuevas-solicitudes',
          title: 'Nueva solicitud',
          icon: <MedicalServicesIcon />,
          roles: ['Farmaceutico'],
        },
        {
          segment: 'mis-solicitudes',
          title: 'Mis solicitudes',
          icon: <WorkHistoryIcon />,
          roles: ['Farmaceutico'],
        },
      ],
    },
    {
        segment: 'inspecciones',
        title: 'Inspecciones',
        icon: <AssignmentTurnedInIcon />,
        roles: ['Administrador', 'Inspector'],
        children: [
          { segment: 'ver-asignadas', title: 'Ver asignadas', icon: <AssignmentTurnedInIcon />, roles: ['Inspector'] },
          { segment: 'ver-inspecciones', title: 'Ver inspecciones', icon: <AssignmentTurnedInIcon />, roles: ['Administrador'] },
          { segment: 'programar-inspecciones', title: 'Programar inspecciones', icon: <EventIcon />, roles: ['Administrador'] },
          { segment: 'completar-inspecciones', title: 'Completar inspecciones', icon: <EventAvailableIcon />, roles: ['Inspector'] },
        ],
     },
     {
      segment: 'formularios',
      title: 'Formularios',
      icon: <DynamicFormIcon />,
      roles: ['Administrador'],
      children: [
        { segment: 'ver-formularios', title: 'Ver formularios', icon: <AssignmentIcon />, roles: ['Administrador'] },
        { segment: 'crear-formularios', title: 'Crear formularios', icon: <NoteAddIcon />, roles: ['Administrador'] },
      ],
   },
   { type: 'divider', roles: ['Administrador'] },
   { type: 'title', title: 'Entidades', roles: ['Administrador'] },
   {
    segment: 'farmacias',
    title: 'Farmacias',
    icon: <StoreIcon />,
    roles: ['Administrador'],
    children: [
      { segment: 'ver-farmacias', title: 'Ver farmacias', icon: <StoreIcon />, roles: ['Administrador'] },
      { segment: 'ver-licencias', title: 'Ver licencias', icon: <FolderIcon />, roles: ['Administrador'] },
      { segment: 'crear-licencia', title: 'Crear licencia', icon: <CreateNewFolderIcon />, roles: ['Administrador'] },
      { segment: 'ver-sanciones', title: 'Ver sanciones', icon: <HttpsIcon />, roles: ['Administrador'] },
      { segment: 'aplicar-sanciones', title: 'Aplicar sanciones', icon: <EnhancedEncryptionIcon />, roles: ['Administrador'] },
    ],
 },
    {
      segment: 'usuarios',
      title: 'Usuarios',
      icon: <PeopleIcon />,
      roles: ['Administrador'],
      children: [
        { segment: 'ver-usuarios', title: 'Ver usuarios', icon: <PersonSearchIcon />, roles: ['Administrador'] },
      ],
    },
    { type: 'divider', roles: ['Administrador', 'Inspector', 'Farmaceutico'] },
    { type: 'title', title: 'Reportes', roles: ['Administrador'] },
    {
      segment: 'reportes',
      title: 'Reportes',
      icon: <BarChartIcon />,
      roles: ['Administrador'],
    },
];

export default NAVIGATION;
