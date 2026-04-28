import type { Metadata } from 'next'
import { getBlogPost } from '@/content/blog/posts'

interface BlogSlugProps {
  params: {
    slug: string
  }
}

/**
 * Dynamic Blog Post Page
 * 
 * Renders individual blog posts based on slug parameter
 * Demonstrates dynamic routing with SEO optimization
 */
export async function generateMetadata({ params }: BlogSlugProps): Promise<Metadata> {
  const post = getBlogPost(params.slug)

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    }
  }

  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords.join(', '),
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      authors: [post.author.name],
      tags: post.tags,
    },
  }
}

export default function BlogPostPage({ params }: BlogSlugProps) {
  const post = getBlogPost(params.slug)

  if (!post) {
    return (
      <main className="bg-black min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-400 mb-8">
            The blog post you are looking for does not exist.
          </p>
          <a href="/insights" className="text-blue-400 hover:text-blue-300">
            ← Back to All Insights
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-black" role="main">
      {/* Header */}
      <article className="max-w-4xl mx-auto px-4 py-20">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <a href="/insights" className="text-blue-400 hover:text-blue-300">
            Insights
          </a>
          <span className="text-gray-600"> / </span>
          <span className="text-gray-400">{post.category}</span>
        </nav>

        {/* Title & Meta */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {post.title}
        </h1>

        <div className="flex items-center justify-between mb-12 pb-8 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <p className="text-white font-semibold">
                {post.author.name}
              </p>
              <p className="text-gray-400 text-sm">
                {post.author.role}
              </p>
            </div>
          </div>

          <div className="text-right text-gray-400 text-sm">
            <p>
              {post.publishedAt.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p>{post.readingTime} min read</p>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-12 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-900 text-blue-400 px-4 py-2 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none mb-20">
          {/* This is simplified - in production, you'd want to parse markdown or use MDX */}
          <div
            className="text-gray-300 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{
              __html: post.content
                .split('\n\n')
                .filter(text => text.trim())
                .map(para => {
                  if (para.startsWith('# ')) {
                    return `<h2 class="text-3xl font-bold text-white mt-8 mb-4">${para.slice(2)}</h2>`
                  }
                  if (para.startsWith('## ')) {
                    return `<h3 class="text-2xl font-bold text-white mt-6 mb-3">${para.slice(3)}</h3>`
                  }
                  if (para.startsWith('- ')) {
                    return `<ul class="list-disc list-inside space-y-2"><li>${para.slice(2)}</li></ul>`
                  }
                  return `<p>${para}</p>`
                })
                .join(''),
            }}
          />
        </div>

        {/* Related Posts CTA */}
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-700 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Want More Insights?
          </h3>
          <p className="text-gray-400 mb-6">
            Explore more articles on digital transformation and enterprise strategy.
          </p>
          <a
            href="/insights"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            View All Articles
          </a>
        </div>
      </article>

      {/* Navigation */}
      <section className="border-t border-gray-800 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <a href="/insights" className="text-blue-400 hover:text-blue-300">
            ← Back to Insights
          </a>
        </div>
      </section>
    </main>
  )
}
