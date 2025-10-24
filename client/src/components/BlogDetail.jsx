import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client, urlFor } from "../../client";
import { PortableText } from "@portabletext/react";

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post" && slug.current == $slug][0]{
          title,
          mainImage,
          "author": author->name,
          publishedAt,
          body
        }`,
        { slug }
      )
      .then(setPost);
  }, [slug]);

  if (!post) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="mx-auto p-6">
      {post.mainImage && (
        <img
          src={urlFor(post.mainImage).width(800).url()}
          alt={post.title}
          className="w-full rounded-xl mb-6"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-6">
        {post.author} • {new Date(post.publishedAt).toLocaleDateString()}
      </p>
      <div className="prose prose-lg max-w-none">
        <PortableText value={post.body} />
      </div>
    </div>
  );
}
