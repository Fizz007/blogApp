import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client, urlFor } from "../../client";
import { PortableText } from "@portabletext/react";
import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrum";
import { GoThumbsdown, GoThumbsup } from "react-icons/go";

const ArticleSection = ({ title, children }) => (
  <section className="pt-[32px]">
    <h2 className="font-semibold text-foreground text-base leading-7 pb-[12px] text-[#151515]">
      {title}
    </h2>
    <p className="text-foreground text-base leading-7 font-normal text-[#262626]">
      {children}
    </p>
  </section>
);

const CommentSection = ({ value, onChange }) => (
  <section className="pt-[32px] pb-[16px]">
    <h4 className="font-medium text-[#151515]">
      Did you find this useful? Leave a comment
    </h4>
    <h4 className="font-semibold text-[#737373] pb-[12px]">Comment</h4>

    <textarea
      id="myTextarea"
      value={value}
      onChange={onChange}
      rows="5"
      cols="110"
      placeholder="Please share your comments here..."
      className="border-1 border-[#D9D9D9] placeholder:pl-2"
    />
    <h4 className="font-semibold text-[#737373]">Help us improve</h4>
    <div className="flex gap-[16px] pt-[12px]">
      <GoThumbsup size={24} />
      <GoThumbsdown size={24} />
    </div>
  </section>
);

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [textareaValue, setTextareaValue] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const query = `{
      "post": *[_type == "post" && slug.current == $slug][0]{
        title,
        mainImage,
        "author": author->name,
        publishedAt,
        body,
        "category": category->title
      },
      
      "categories": *[_type == "category"]{
        title,
        "count": count(*[_type == "post" && references(^._id)])
      } | order(title asc)
    }`;

      const data = await client.fetch(query, { slug });
      setPost(data.post);
      setCategories(data.categories);
    }

    fetchData();
  }, [slug]);

  const handleChange = (e) => setTextareaValue(e.target.value);

  if (!post) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="my-[150px] mx-[100px]">
      {/* Header */}
      <div className="flex flex-col gap-[10px]">
        <h4 className="font-medium text-[#00000]">{post.title}</h4>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/" },
            { label: post.title },
          ]}
        />
      </div>

      {/* Hero Image */}
      <div className="pt-[72px]">
        {post.mainImage && (
          <img
            src={urlFor(post.mainImage).width(1240).url()}
            alt={post.title}
            className="w-[1240px] h-[579px] max-w-full lg:w-full object-cover"
          />
        )}
      </div>

      {/* Main Content */}
      <div className="pt-[72px]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Article */}
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
                {/* <div className="prose prose-lg max-w-none text-foreground text-base leading-7 font-normal text-[#262626]">
                {/* </div> */}

                <div className="text-foreground text-base leading-7 font-normal text-[#262626]">
                  <PortableText value={post.body} />
                </div>

                <CommentSection value={textareaValue} onChange={handleChange} />
              </article>
            </div>

            {/* Sidebar */}
            <Sidebar categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
}
