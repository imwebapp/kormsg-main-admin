import { create } from 'zustand';
import { BlogInterface } from '../../entities/blog.entity';

interface BlogStateInterface {
    tab?: number
    setTab: (tab: BlogStateInterface['tab']) => void;
    blog?: BlogInterface
    setBlog: (blog: BlogStateInterface['blog']) => void;
}

export const useBlogState = create<BlogStateInterface>()(
    (set) => ({
        tab: 1,
        setTab: (tab) => set({ tab }),
        blog: undefined,
        setBlog: (blog) => set({ blog }),
    })
);
