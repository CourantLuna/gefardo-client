import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
  Typography,
  useTheme,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const drawerWidth = 300;
const collapsedWidth = 85;


function CustomDrawer({ isOpen, onPageChange, selectedPage, userRoles, navigationConfig  }) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState({});
  

  const handleToggle = (segment) => {
    setExpanded((prev) => ({
      ...prev,
      [segment]: !prev[segment],
    }));
  };

  // Asegúrate de que userRoles sea un array
  const validUserRoles = Array.isArray(userRoles) ? userRoles : [];
  // Filtrar elementos según los roles del usuario
  const filteredNavigation = navigationConfig.filter((item) => {
    if (!item.roles) return true;
    return item.roles.some((role) => validUserRoles.includes(role));
  });

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isOpen ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: isOpen ? drawerWidth : collapsedWidth,
          boxSizing: 'border-box',
          marginTop: { xs: '56px', sm: '64px' },
          overflowX: 'hidden',
          overflowY: 'auto',
          transition: 'width 0.3s',
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        },
      }}
    >
      <Box>
        <List>
          {filteredNavigation.map((item, index) => {
            if (item.type === 'title') {
              return (
                <Typography
                  key={index}
                  variant="subtitle2"
                  sx={{
                    px: isOpen ? 2 : 0,
                    py: 1,
                    color: theme.palette.text.secondary,
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {isOpen ? item.title : null}
                </Typography>
              );
            }

            if (item.type === 'divider') {
              return <Divider key={index} />;
            }

            const isSelected = selectedPage?.segment === item.segment;

            if (!item.children) {
              return (
                <ListItem
                  button
                  key={index}
                  onClick={() => onPageChange({ segment: item.segment, title: item.title })}
                  sx={{
                    backgroundColor: isSelected ? theme.palette.action.selected : 'transparent',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isSelected ? theme.palette.primary.main : theme.palette.text.disabled,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {isOpen && (
                    <ListItemText
                      primary={item.title}
                      sx={{
                        color: isSelected
                          ? theme.palette.primary.main
                          : theme.palette.text.primary,
                      }}
                    />
                  )}
                </ListItem>
              );
            }

            return (
              <React.Fragment key={index}>
                <ListItem
                  button
                  onClick={() => handleToggle(item.segment)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isOpen ? 'space-between' : 'flex-start',
                    backgroundColor: expanded[item.segment]
                      ? theme.palette.action.hover
                      : 'transparent',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: expanded[item.segment]
                        ? theme.palette.primary.main
                        : theme.palette.text.disabled,
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {item.icon}
                    {!isOpen && (
                      <Box
                        component="span"
                        sx={{
                          position: 'absolute',
                          right: -5,
                          color: theme.palette.text.secondary,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {expanded[item.segment] ? (
                          <ExpandLessIcon fontSize="small" />
                        ) : (
                          <ExpandMoreIcon fontSize="small" />
                        )}
                      </Box>
                    )}
                  </ListItemIcon>

                  {isOpen && (
                    <ListItemText
                      primary={item.title}
                      sx={{
                        color: theme.palette.text.primary,
                      }}
                    />
                  )}

                  {isOpen && (
                    expanded[item.segment] ? (
                      <ExpandLessIcon sx={{ color: theme.palette.text.primary }} />
                    ) : (
                      <ExpandMoreIcon sx={{ color: theme.palette.text.disabled }} />
                    )
                  )}
                </ListItem>

                <Collapse in={expanded[item.segment]} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {item.children
                      .filter((child) => child.roles.some((role) => userRoles.includes(role)))
                      .map((child, childIndex) => {
                        const isChildSelected = selectedPage?.segment === child.segment;

                        return (
                          <ListItem
                            button
                            key={childIndex}
                            onClick={() =>
                              onPageChange({ segment: child.segment, title: child.title })
                            }
                            sx={{
                              pl: 4,
                              backgroundColor: isChildSelected
                                ? theme.palette.action.selected
                                : 'transparent',
                              '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                              },
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                color: isChildSelected
                                  ? theme.palette.primary.main
                                  : theme.palette.text.disabled,
                              }}
                            >
                              {child.icon}
                            </ListItemIcon>
                            {isOpen && (
                              <ListItemText
                                primary={child.title}
                                sx={{
                                  color: isChildSelected
                                    ? theme.palette.primary.main
                                    : theme.palette.text.primary,
                                }}
                              />
                            )}
                          </ListItem>
                        );
                      })}
                  </List>
                </Collapse>
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}

export default CustomDrawer;
