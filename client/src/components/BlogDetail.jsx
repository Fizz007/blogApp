import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client, urlFor } from "../../client";
import { PortableText } from "@portabletext/react";
import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrum";
import CommentSection from "./Comment";
import useSEO from "../hooks/useSEO"; 

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const query = `
        {
          "post": *[_type == "post" && slug.current == $slug][0]{
            _id,
            title,
            mainImage,
            "author": author->name,
            publishedAt,
            body,
            metaTitle,
            metaDescription,
            category->{
              _id,
              title,
              slug
            }
          },
          "categories": *[_type == "category"]{
            _id,
            title,
            slug,
            "count": count(*[_type == "post" && references(^._id)])
          } | order(title asc)
        }`;

        const data = await client.fetch(query, { slug });
        setPost(data.post);
        setCategories(data.categories || []);
      } catch (err) {
        console.error("Error fetching post or categories:", err);
      }
    }

    fetchData();
  }, [slug]);

  useSEO({
    title: post?.metaTitle || post?.title,
    description: post?.metaDescription || "Read insightful trading and finance content.",
    slug,
  });

  if (!post) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="my-[150px] mx-[100px]">
      {/* Header */}
      <div className="flex flex-col gap-[10px]">
        <h4 className="text-2xl font-medium text-[#000000]">{post.title}</h4>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />
      </div>

      {/* Hero Image */}
      {post.mainImage && (
        <div className="pt-[72px]">
          <img
            src={urlFor(post.mainImage).width(1240).url()}
            alt={post.title}
            className="w-[1240px] h-[579px] max-w-full lg:w-full object-cover rounded-2xl"
          />
        </div>
      )}

      {/* Main Content */}
      <div className="pt-[72px]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Article Section */}
            <div className="lg:col-span-2">
              <header className="mb-[12px]">
                <h2 className="text-4xl font-medium text-foreground">
                  {post.title}
                </h2>
                <p className="text-gray-500 mt-2">
                  {post.author} •{" "}
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              </header>

              <article className="space-y-3">
                <div className="text-foreground text-base leading-7 font-normal text-[#262626]">
                  <PortableText value={post.body} />
                </div>

                <CommentSection postId={post._id} />
              </article>
            </div>

            {/* Sidebar */}
            <Sidebar
              categories={categories}
              currentCategory={post.category}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
