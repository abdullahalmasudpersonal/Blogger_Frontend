"use client";
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Blog } from '../../page';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

type TParams = {
    params: {
        id: string;
    };
};

const SingleBlog = ({ params }: TParams) => {
    const [singleBlog, setSingleBlog] = useState<Blog | null>(null);
    const targetId = params.id;

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch(`https://blogger-backend-five.vercel.app/api/blog/single-blog/${targetId}`);
                const data = await res.json();
                setSingleBlog(data?.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, [targetId]);

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            {singleBlog ? (
                <Card>
                    <CardMedia
                        component="img"
                        height="300"
                        image={singleBlog.image || "/default.jpg"}
                        alt={singleBlog.title}
                    />
                    <CardContent>
                        <Typography variant="h4">{singleBlog.title}</Typography>
                        <Typography variant="body1">{singleBlog.content}</Typography>
                    </CardContent>
                </Card>
            ) : (
                <Typography>Loading...</Typography>
            )}
        </Container>
    );
};

export default SingleBlog;