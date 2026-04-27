import blogs from '../../../src/data/blogs.json';
import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';

export function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

const BlogInternal = ({ params }) => {
  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) notFound();

  return <BlogPostClient blog={blog} />;
};

export default BlogInternal;
