"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { Drawer } from '@mui/material';

const Navber = () => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <Container maxWidth="xl">
            <AppBar position="static" sx={{ borderRadius: '3px' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters variant="regular" >
                        {/* <Toolbar disableGutters> */}
                        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: "center", }}>
                            <Link href="/" style={{ textDecoration: 'none', color: 'white', marginRight: "20px" }}>
                                <Typography style={{ fontWeight: '700' }}>BLOGGER</Typography>
                            </Link>
                            <Box sx={{ display: { xs: "none", md: "flex", gap: '10px' } }}>
                                <MenuItem sx={{ py: "4px", px: "12px", borderRadius: "5px" }}
                                >
                                    <Link href="/blogs" style={{ textDecoration: 'none', color: 'white' }}>
                                        <Typography>
                                            Blogs
                                        </Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem sx={{ py: "4px", px: "12px", borderRadius: "5px" }}
                                >
                                    <Link href="/create-blog" style={{ textDecoration: 'none', color: 'white' }}>
                                        <Typography>
                                            Create Blog
                                        </Typography>
                                    </Link>
                                </MenuItem>
                            </Box>
                        </Box>

                        <Box sx={{ display: { md: "none" } }}>
                            <Button variant="text" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{ minWidth: "30px", p: "4px" }} >
                                <MenuIcon />
                            </Button>
                            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                                <Box sx={{ minWidth: '40vw' }}>
                                    <MenuItem>
                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            component="a"
                                            href="/blogs"
                                            sx={{ width: "100%" }}
                                        >
                                            Blogs
                                        </Button>
                                    </MenuItem>
                                    <MenuItem>
                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            component="a"
                                            href="/blogs"
                                            sx={{ width: "100%" }}
                                        >
                                            Create Blog
                                        </Button>
                                    </MenuItem>
                                </Box>
                            </Drawer>
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>
        </Container>
    );
};

export default Navber;