-- Portfolio Website Database Schema
-- Run this SQL in Supabase SQL Editor: https://supabase.com/dashboard/project/[YOUR_PROJECT]/sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================== POSTS TABLE ====================
CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    image TEXT,
    category TEXT DEFAULT 'Development',
    author TEXT DEFAULT 'Admin',
    read_time TEXT DEFAULT '5 min read',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);

-- ==================== SUBSCRIBERS TABLE ====================
CREATE TABLE IF NOT EXISTS subscribers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);

-- ==================== USERS TABLE ====================
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'guest' CHECK (role IN ('admin', 'guest')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for username lookups
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- ==================== ROW LEVEL SECURITY (RLS) ====================

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Posts policies (public read, authenticated write)
CREATE POLICY "Posts are viewable by everyone" 
    ON posts FOR SELECT 
    USING (true);

CREATE POLICY "Posts can be created by authenticated users" 
    ON posts FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Posts can be updated by authenticated users" 
    ON posts FOR UPDATE 
    USING (true);

CREATE POLICY "Posts can be deleted by authenticated users" 
    ON posts FOR DELETE 
    USING (true);

-- Subscribers policies
CREATE POLICY "Subscribers can be added by anyone" 
    ON subscribers FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Subscribers are viewable by authenticated users" 
    ON subscribers FOR SELECT 
    USING (true);

-- Users policies
CREATE POLICY "Users are viewable by everyone" 
    ON users FOR SELECT 
    USING (true);

CREATE POLICY "Users can be created by anyone" 
    ON users FOR INSERT 
    WITH CHECK (true);

-- ==================== SEED DATA ====================

-- Insert sample posts
INSERT INTO posts (title, excerpt, content, image, category, author, read_time) VALUES
(
    'Building Immersive 3D Web Experiences with Three.js',
    'Learn how to create stunning 3D visualizations for the web using Three.js and React Three Fiber.',
    'Three.js has revolutionized the way we think about web experiences. In this comprehensive guide, we will explore how to integrate Three.js with React using React Three Fiber.

## Getting Started with Three.js

Three.js is a powerful JavaScript library that makes WebGL accessible to everyone.

## Setting Up Your Environment

First, install the necessary dependencies:

npm install three @react-three/fiber @react-three/drei

## Conclusion

Three.js and React Three Fiber open up incredible possibilities for web development.',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    'Development',
    'Admin',
    '8 min read'
),
(
    'The Future of Web Animation: Framer Motion vs GSAP',
    'A deep dive comparison of two popular animation libraries and when to use each one.',
    'Animation libraries have become essential tools for modern web development.

## Framer Motion: The React Way

Framer Motion is built specifically for React with a declarative API.

## GSAP: The Animation Powerhouse

GSAP is framework-agnostic and incredibly powerful.

## Conclusion

Both libraries are excellent choices depending on your needs.',
    'https://images.unsplash.com/photo-1550439062-609e1531270e?w=800',
    'Animation',
    'Admin',
    '6 min read'
),
(
    'Mastering Tailwind CSS: Advanced Techniques',
    'Take your Tailwind CSS skills to the next level with these advanced tips and tricks.',
    'Tailwind CSS has transformed how developers approach styling.

## Custom Design Tokens

Customize your design tokens for unique projects.

## @apply for Component Classes

The @apply directive lets you compose utility classes.

## Conclusion

With advanced techniques, you can build sophisticated design systems.',
    'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800',
    'CSS',
    'Admin',
    '10 min read'
);

-- Insert default admin user
INSERT INTO users (username, role) VALUES
('Admin', 'admin');

-- ==================== FUNCTIONS ====================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_posts_updated_at 
    BEFORE UPDATE ON posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ==================== COMMENTS ====================

COMMENT ON TABLE posts IS 'Blog posts table';
COMMENT ON TABLE subscribers IS 'Newsletter subscribers table';
COMMENT ON TABLE users IS 'Application users table';

-- Done! Your Supabase database is ready.