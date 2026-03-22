import { supabase, TABLES } from '../supabase/config'

// Helper function to show toast notification
const showToast = (message, type = 'info') => {
    window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { message, type }
    }))
}

// ==================== POSTS ====================

// Get all posts
export const getPosts = async () => {
    try {
        const { data, error } = await supabase
            .from(TABLES.POSTS)
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error('Error getting posts:', error)
        if (error.code !== 'PGRST205') {
            showToast('Failed to load posts from database', 'error')
        }
        return { data: null, error }
    }
}

// Get single post by ID
export const getPost = async (id) => {
    try {
        const { data, error } = await supabase
            .from(TABLES.POSTS)
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error('Error getting post:', error)
        return { data: null, error }
    }
}

// Create new post
export const createPost = async (post) => {
    try {
        const { data, error } = await supabase
            .from(TABLES.POSTS)
            .insert([{
                ...post,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }])
            .select()

        if (error) throw error
        showToast('Post created successfully!', 'success')
        return { data: data[0], error: null }
    } catch (error) {
        console.error('Error creating post:', error)
        if (error.code !== 'PGRST205') {
            showToast('Failed to create post', 'error')
        }
        return { data: null, error }
    }
}

// Update post
export const updatePost = async (id, updates) => {
    try {
        const { data, error } = await supabase
            .from(TABLES.POSTS)
            .update({
                ...updates,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()

        if (error) throw error
        showToast('Post updated successfully!', 'success')
        return { data: data[0], error: null }
    } catch (error) {
        console.error('Error updating post:', error)
        if (error.code !== 'PGRST205') {
            showToast('Failed to update post', 'error')
        }
        return { data: null, error }
    }
}

// Delete post
export const deletePost = async (id) => {
    try {
        const { error } = await supabase
            .from(TABLES.POSTS)
            .delete()
            .eq('id', id)

        if (error) throw error
        showToast('Post deleted successfully!', 'success')
        return { error: null }
    } catch (error) {
        console.error('Error deleting post:', error)
        if (error.code !== 'PGRST205') {
            showToast('Failed to delete post', 'error')
        }
        return { error }
    }
}

// Search posts
export const searchPosts = async (query) => {
    try {
        const { data, error } = await supabase
            .from(TABLES.POSTS)
            .select('*')
            .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,category.ilike.%${query}%`)
            .order('created_at', { ascending: false })

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error('Error searching posts:', error)
        return { data: null, error }
    }
}

// Get posts by category
export const getPostsByCategory = async (category) => {
    try {
        const { data, error } = await supabase
            .from(TABLES.POSTS)
            .select('*')
            .eq('category', category)
            .order('created_at', { ascending: false })

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error('Error getting posts by category:', error)
        return { data: null, error }
    }
}

// ==================== SUBSCRIBERS ====================

// Add subscriber
export const addSubscriber = async (email) => {
    try {
        // Check if already subscribed
        const { data: existing } = await supabase
            .from(TABLES.SUBSCRIBERS)
            .select('email')
            .eq('email', email)
            .single()

        if (existing) {
            showToast('You are already subscribed!', 'info')
            return { data: existing, error: null, message: 'Already subscribed' }
        }

        const { data, error } = await supabase
            .from(TABLES.SUBSCRIBERS)
            .insert([{
                email,
                created_at: new Date().toISOString()
            }])
            .select()

        if (error) throw error
        showToast('Successfully subscribed to newsletter!', 'success')
        return { data: data[0], error: null }
    } catch (error) {
        console.error('Error adding subscriber:', error)
        if (error.code !== 'PGRST205') {
            showToast('Failed to subscribe', 'error')
        }
        return { data: null, error }
    }
}

// Get all subscribers
export const getSubscribers = async () => {
    try {
        const { data, error } = await supabase
            .from(TABLES.SUBSCRIBERS)
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error('Error getting subscribers:', error)
        return { data: null, error }
    }
}

// Remove subscriber
export const removeSubscriber = async (email) => {
    try {
        const { error } = await supabase
            .from(TABLES.SUBSCRIBERS)
            .delete()
            .eq('email', email)

        if (error) throw error
        showToast('Successfully unsubscribed', 'success')
        return { error: null }
    } catch (error) {
        console.error('Error removing subscriber:', error)
        showToast('Failed to unsubscribe', 'error')
        return { error }
    }
}

// ==================== USERS ====================

// Get user by username
export const getUser = async (username) => {
    try {
        const { data, error } = await supabase
            .from(TABLES.USERS)
            .select('*')
            .eq('username', username)
            .single()

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error('Error getting user:', error)
        return { data: null, error }
    }
}

// Create user
export const createUser = async (userData) => {
    try {
        const { data, error } = await supabase
            .from(TABLES.USERS)
            .insert([{
                ...userData,
                created_at: new Date().toISOString()
            }])
            .select()

        if (error) throw error
        return { data: data[0], error: null }
    } catch (error) {
        console.error('Error creating user:', error)
        return { data: null, error }
    }
}

// ==================== REAL-TIME SUBSCRIPTIONS ====================

// Subscribe to posts changes
export const subscribeToPosts = (callback) => {
    return supabase
        .channel('posts-channel')
        .on('postgres_changes',
            { event: '*', schema: 'public', table: TABLES.POSTS },
            (payload) => {
                console.log('Posts change received:', payload)
                callback(payload)
            }
        )
        .subscribe()
}

// Subscribe to subscribers changes
export const subscribeToSubscribers = (callback) => {
    return supabase
        .channel('subscribers-channel')
        .on('postgres_changes',
            { event: '*', schema: 'public', table: TABLES.SUBSCRIBERS },
            (payload) => {
                console.log('Subscribers change received:', payload)
                callback(payload)
            }
        )
        .subscribe()
}

// Unsubscribe from channel
export const unsubscribe = (channel) => {
    supabase.removeChannel(channel)
}