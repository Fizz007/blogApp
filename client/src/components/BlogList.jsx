// ========== DEBUGGED BLOG LIST COMPONENT ==========
import React, { useEffect, useState } from "react";
import { client, urlFor } from "../../client";
import { Link } from "react-router-dom";

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    client
      .fetch(`*[_type == "post"]`)
      .then((data) => {
        if (data.length > 0) {
          return client.fetch(
            `*[_type == "post"] | order(publishedAt desc) {
              _id,
              title,
              slug,
              publishedAt,
              author->{
                name
              },
              categories[]->{
                title
              },
              mainImage {
                asset->{
                  _id,
                  url
                },
                alt
              }
            }`
          );
        }
        return data;
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch posts");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <div className="text-xl">Loading posts...</div>
        <div className="text-sm text-gray-500 mt-2">
          Connecting to Sanity...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-semibold text-lg">
            Error loading posts
          </h3>
          <p className="text-red-600 mt-2">{error}</p>
          <div className="mt-4 text-sm text-gray-700">
            <p className="font-semibold">Troubleshooting steps:</p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Check if Sanity Studio is running</li>
              <li>Verify you have published posts (not drafts)</li>
              <li>Check CORS settings in Sanity dashboard</li>
              <li>Verify projectId and dataset in client.js</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <h3 className="text-yellow-800 font-semibold text-xl mb-2">
            No posts found
          </h3>
          <p className="text-yellow-700 mb-4">
            Make sure you have created and <strong>published</strong> posts in
            Sanity Studio.
          </p>
          <div className="text-sm text-gray-700 text-left max-w-md mx-auto">
            <p className="font-semibold mb-2">Quick checklist:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Go to Sanity Studio (usually http://localhost:3333)</li>
              <li>Create a new Post document</li>
              <li>Fill in at least the Title field</li>
              <li>
                Click <strong>Publish</strong> (not just Save)
              </li>
              <li>Refresh this page</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog Posts ({posts.length})</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post,i) => (
          <Link to={`/post/${post.slug.current}`} key={i}>
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
              {post.mainImage && post.mainImage.asset ? (
                <img
                  src={urlFor(post.mainImage).width(600).url()}
                  alt={post.mainImage.alt || post.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">
                  {post.title || "Untitled"}
                </h2>
                {(post.author?.name || post.publishedAt) && (
                  <p className="text-sm text-gray-600 mb-3">
                    {post.author?.name && `By ${post.author.name}`}
                    {post.author?.name && post.publishedAt && " • "}
                    {post.publishedAt &&
                      new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                )}
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.categories.map((cat, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                      >
                        {cat.title || cat}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
