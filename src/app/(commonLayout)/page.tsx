"use client";
import * as React from 'react';
import { Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
// import Grid from "@mui/material/Unstable_Grid2"; // Grid2 for v7
import Grid from '@mui/material/Grid';
import Link from 'next/link';
// import Grid from "@mui/material/Grid"; 

export interface Blog {
    _id: string;
    title: string;
    content: string;
    image?: string;
}

const HomePage = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch("https://blogger-backend-five.vercel.app/api/blog/all-blog");
                const data = await res.json();
                setBlogs(data?.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <Grid container spacing={3}>
                {blogs?.map((blog) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={blog?._id}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                alt={blog.title}
                                height="140"
                                image={blog.image || ""}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {blog.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    {blog.content.length > 100
                                        ? blog.content.substring(0, 100) + "..."
                                        : blog.content}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link href={`/blogs/${blog?._id}`}>
                                <Button size="small">Read More</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default HomePage;