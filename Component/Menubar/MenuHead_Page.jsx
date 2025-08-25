import * as React from "react";
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Paper, Avatar, Tooltip, createTheme, ThemeProvider, Button, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import BookIcon from "@mui/icons-material/Book";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { styled } from "@mui/system";
import BookList from "./Book_List";
import AddList from "./AddList";
import { useNavigate } from "react-router-dom";
import HomePage from "./Home";
// import { RiTranslate2 } from "react-icons/ri";
// import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 290;

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#7C3AED"
        },
        secondary: {
            main: "#22C55E"
        },
        background: {
            default: "#ecebe5c4",
            paper: "#FFFFFF"
        },
        text: {
            primary: "#1F2937",
            secondary: "#6B7280"
        }
    },
    shape: {
        borderRadius: 16
    },
    typography: {
        fontFamily: [
            "Inter",
            "SF Pro Text",
            "system-ui",
            "-apple-system",
            "Segoe UI",
            "Roboto",
            "Helvetica",
            "Arial",
            "sans-serif"
        ].join(",")
    }
});

const Brand = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(2),
}));

const BrandBadge = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: 6
}));

const Pill = styled("div")(({ theme }) => ({
    width: 12,
    height: 12,
    borderRadius: 9999,
    background: theme.palette.primary.main,
}));

const SubtlePill = styled(Pill)(({ theme }) => ({
    opacity: 0.35
}));


const items = [
    { label: "Home", icon: <HomeRoundedIcon />, active: true },
    { label: "BookList", icon: <BookIcon /> },
    { label: "Add List", icon: <AddCircleOutlineIcon /> }
];

function NavList({ onSelect, selectedPage }) {
    return (
        <List disablePadding>
            {items.map((item) => (
                <ListItem key={item.label} disablePadding>
                    <ListItemButton
                        sx={{
                            mx: 1,
                            my: 0.25,
                            borderRadius: 3,
                            "&.Mui-selected": {
                                bgcolor: (theme) => theme.palette.primary.main + "14",
                                color: "primary.main"
                            },
                            "&:hover": {
                                bgcolor: (theme) => theme.palette.primary.main + "10"
                            }
                        }}
                        selected={selectedPage === item.label}
                        onClick={() => onSelect(item.label)}
                    >
                        <ListItemIcon sx={{
                            minWidth: 40,
                            color: selectedPage === item.label ? "primary.main" : "text.secondary"
                        }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                                fontWeight: selectedPage === item.label ? 700 : 500
                            }}
                        />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
}

function SidebarContent({ onSelect, selectedPage }) {

    return (
        <>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                height: "87%",
            }}>

                <Brand>
                    <BrandBadge>
                              <Pill />
                        <Avatar
                            src="/assets/7f6f5bc3-73f2-428f-a837-e0baf0713a24.png"
                            sx={{
                                border: "1px solid #7C3AED",

                            }}
                        />
                        <SubtlePill />

                        <Typography sx={{ fontWeight: 800, ml: 1 }}>Navira</Typography>
                  
                    </BrandBadge>
                    <IconButton size="small">
                        <MoreVertRoundedIcon />
                    </IconButton>
                </Brand>
                <Divider sx={{ mx: 2 }} />
                <NavList onSelect={onSelect} selectedPage={selectedPage} />
            </Box>

            <Box sx={{ p: 7 }}>
                <Button
                    startIcon={<LogoutIcon />}
                    fullWidth
                    variant="outlined"
                    color="primary"
                    sx={{ borderRadius: 10, }}
                // onClick={() => {

                //     navigate("/login");
                // }}
                >
                    Logout
                </Button>
            </Box>
        </>
    );
}

export default function NavioMUISidebar() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [selectedPage, setSelectedPage] = React.useState("Home");
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [editingBook, setEditingBook] = React.useState(null);
    const [editingIndex, setEditingIndex] = React.useState(null);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handlePageSelect = (page) => {
        setSelectedPage(page);
        if (isMobile) {
            setMobileOpen(false);
        }
    };

    const [books, setBooks] = React.useState([]);
    const navigate = useNavigate();

    const handleAddBook = (book) => {
        setBooks((prev) => [...prev, book]);
        setSelectedPage("BookList");
    };
    const handleEditBook = (index, book) => {
        setEditingBook(book);
        setEditingIndex(index);
        setSelectedPage("Add List");
    };
    const drawer = (
        <Paper elevation={0} sx={{
            height: "100%",
            borderRadius: { xs: 0, md: 1 },
            overflow: "hidden",
        }}>
            <SidebarContent onSelect={handlePageSelect} selectedPage={selectedPage} />
        </Paper>
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
                <AppBar
                    position="fixed"
                    elevation={0}
                    sx={{

                        bgcolor: "transparent",

                        color: "#7C3AED",
                        zIndex: theme.zIndex.drawer + 0
                    }}
                >
                    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, display: { md: "none" } }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap component="div">
                                {selectedPage}
                            </Typography>
                        </Box>
                        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <IconButton color="primary">
                                <RiTranslate2 size={24} />
                            </IconButton> */}
                        {/* <IconButton color="primary">
                                <PersonIcon   size={24} />
                            </IconButton> */}
                        {/* <Button
                                startIcon={<PersonIcon />}
                                variant="contained"
                                color="primary"
                                sx={{
                                    borderRadius: "10px", */}
                        {/* // textTransform: "none",
                                    px: 3 */}
                        {/* }}
                            // onClick={() => navigate("/login")}  */}
                        {/* >
                                Login
                            </Button>
                        </Box> */}
                    </Toolbar>
                </AppBar>


                <Box
                    component="nav"
                    sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                    aria-label="sidebar"
                >

                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: "block", md: "none" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth,
                                border: "none",
                                p: 1
                            }
                        }}
                    >
                        {drawer}
                    </Drawer>


                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: "none", md: "block" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth,
                                border: "none",
                                p: 1,
                                background: "transparent"
                            }
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: { xs: 2, md: 4 },
                        width: { md: `calc(100% - ${drawerWidth}px)` }
                    }}
                >
                    <Toolbar />
                    {selectedPage === "Home" && (
                        <HomePage onExplore={() => setSelectedPage("BookList")} />
                    )}
                    {selectedPage === "BookList" && (
                        <BookList onEditBook={handleEditBook} />
                    )}
                    {selectedPage === "Add List" && (
                        <AddList
                            onAddBook={handleAddBook}
                            editingBook={editingBook}
                            editingIndex={editingIndex}
                            onFinishEdit={() => {
                                setEditingBook(null);
                                setEditingIndex(null);
                                setSelectedPage("BookList");
                            }}
                        />
                    )}
                </Box>
            </Box>
        </ThemeProvider>
    );
}