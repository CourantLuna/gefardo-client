import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StoreIcon from '@mui/icons-material/Store';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import GavelIcon from '@mui/icons-material/Gavel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EventIcon from '@mui/icons-material/Event';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderIcon from '@mui/icons-material/Folder';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import HttpsIcon from '@mui/icons-material/Https';

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
          segment: 'crear-servicios',
          title: 'Crear servicios',
          icon: <MedicalServicesIcon />,
          roles: ['Administrador'],
        },
        {
          segment: 'nuevas-solicitudes',
          title: 'Nueva solicitud',
          icon: <AssignmentIcon />,
          roles: ['Farmaceutico'],
        },
        {
          segment: 'consultar-estado',
          title: 'Consultar estado',
          icon: <AssignmentIcon />,
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
          { segment: 'ver-asignadas', title: 'Ver asignadas', icon: <CheckCircleIcon />, roles: ['Inspector'] },
          { segment: 'ver-inspecciones', title: 'Ver inspecciones', icon: <CheckCircleIcon />, roles: ['Administrador'] },
          { segment: 'programar-inspecciones', title: 'Programar inspecciones', icon: <EventIcon />, roles: ['Administrador'] },
          { segment: 'completar-inspecciones', title: 'Completar inspecciones', icon: <CheckCircleIcon />, roles: ['Inspector'] },
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
      { segment: 'crear-farmacias', title: 'Crear farmacias', icon: <AddBusinessIcon />, roles: ['Administrador'] },
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
        { segment: 'crear-usuario', title: 'Crear usuario', icon: <PersonAddIcon />, roles: ['Administrador'] },
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
