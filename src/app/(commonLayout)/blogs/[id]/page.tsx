"use client";
import { Container,CardContent, CardMedia, Typography, Box, Divider } from "@mui/material";
import React, { use, useEffect, useState } from "react";
import { Blog } from "../../page";

const SingleBlog = ({ params }: { params: Promise<{ id: string }> }) => {
  const [singleBlog, setSingleBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const { id:blogId } = use(params);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `https://blogger-backend-five.vercel.app/api/blog/single-blog/${blogId}`
        );
        const data = await res.json();
        setSingleBlog(data?.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [blogId]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          Loading blog...
        </Typography>
      </Container>
    );
  }

  if (!singleBlog) {
    return (
      <Container maxWidth="md" sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Blog not found!
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
        <Typography variant="h3"sx={{fontWeight:600, color:'#464646ff', textAlign:'center',mb:4}}>Blog Details</Typography>
      <>
        <CardMedia
          component="img"
          height="400"
          image={singleBlog.image || "/default.jpg"}
          alt={singleBlog.title}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h4"  mt={4} >
            {singleBlog.title}
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2} mt={1}>
            <Typography variant="body2" color="text.secondary">
              ✍️ {singleBlog.author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(singleBlog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: "text.primary" }}>
            {singleBlog.content}
          </Typography>
        </CardContent>
      </>
    </Container>
  );
};

export default SingleBlog;
