"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Container, Button, Box, Typography, TextField } from "@mui/material";
import { toast } from "sonner";

interface BlogForm {
    title: string;
    content: string;
    image?: string;
    author: string;
}

const CreateBlog = () => {
    const [formData, setFormData] = useState<BlogForm>({
        title: "",
        content: "",
        image: "",
        author: "",
    });

    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    // handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // handle file input
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
        }
    };

    // generate preview URL
    useEffect(() => {
        if (!file) {
            setPreviewUrl("");
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        // clean up memory when component unmounts or file changes
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    // handle submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const form = new FormData();
            form.append("data", JSON.stringify(formData));
            if (file) form.append("file", file);

            const res = await fetch("https://blogger-backend-five.vercel.app/api/blog/create-blog", {
                method: "POST",
                body: form,
            });

            const data = await res.json();
            if (res.ok) {
                toast.success("✅ Blog created successfully!");
                setFormData({ title: "", content: "", image: "", author: "" });
                setFile(null);
                setPreviewUrl("");
            } else {
                toast.error(data?.message || "❌ Failed to create blog");
            }
        } catch (error) {
            console.error("Error creating blog:", error);
            toast.error("❌ Something went wrong");
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h5" gutterBottom style={{ marginBottom: "15px" }}>
                Create Blog
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    fullWidth
                    required
                />

                <TextField
                    label="Author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    fullWidth
                    required
                />

                <TextField
                    label="Content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    multiline
                    rows={5}
                    fullWidth
                    required
                />

                <Button variant="outlined" component="label">
                    Upload Image
                    <input type="file" hidden onChange={handleFileChange} />
                </Button>

                {previewUrl && (
                    <Image
                        src={previewUrl}
                        alt="Selected"
                        width={400}       // required
                        height={300}      // required
                        style={{ borderRadius: "8px", marginTop: "5px" }}
                    />
                )}

                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </Box>
        </Container>
    );
};

export default CreateBlog;
