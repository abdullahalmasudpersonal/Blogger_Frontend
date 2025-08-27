"use client";
import * as React from 'react';
import { Container, Grid, Card, CardActions, CardContent, CardMedia, Button, Typography, Skeleton, Box, Divider } from '@mui/material';
import { useEffect, useState } from "react";
import Link from 'next/link';

export interface Blog {
    _id: string;
    title: string;
    content: string;
    image?: string;
    author: string;
    createdAt: string;
}

const HomePage = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch("https://blogger-backend-five.vercel.app/api/blog/all-blog");
                const data = await res.json();
                setBlogs(data?.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <Grid container spacing={3}>
                {loading
                    ? Array.from(new Array(8)).map((_, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                            <Card sx={{ maxWidth: 345 }}>
                                <Skeleton variant="rectangular" height={160} />
                                <CardContent>
                                    <Skeleton variant="text" height={30} />
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" width="80%" />
                                </CardContent>
                                <CardActions>
                                    <Skeleton variant="rectangular" width={100} height={36} />
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                    : blogs?.map((blog) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={blog._id}>
                            <Card sx={{ maxWidth: 345, fontFamily: 'Times New Roman' }}>
                                <CardMedia
                                    component="img"
                                    alt={blog.title}
                                    height="160"
                                    image={blog.image || ""}
                                />
                                <CardContent sx={{ padding: '20px 15px 5px' }}>
                                    <Typography gutterBottom variant="body1" sx={{ mb: 2, fontWeight: 600, color: '#494949ff' }}>
                                        {blog.title.length > 33 ? (blog.title.slice(1, 33) + '...') : blog.title}
                                    </Typography>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={1} sx={{ color: '#424242ff', }}>
                                        <Typography variant="body2">{blog.author}</Typography>
                                        <Typography variant="body2">{new Date(blog.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", })}</Typography>
                                    </Box>
                                    <Divider sx={{ my: 2 }} />
                                    <Typography variant="body2" sx={{ color: "#3d3d3dff" }}>
                                        {blog.content.length > 120
                                            ? blog.content.substring(0, 120) + "..."
                                            : blog.content}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ padding: '5px 15px 10px' }}>
                                    <Link href={`/blogs/${blog._id}`}>
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
